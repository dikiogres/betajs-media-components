Scoped.define("module:VideoPlayer.Dynamics.Controlbar", [
    "dynamics:Dynamic",
    "base:TimeFormat",
    "base:Comparators",
    "base:Objs",
    "browser:Dom",
    "module:Assets",
    "browser:Info",
    "media:Player.Support",
    "base:Async"
], [
    "dynamics:Partials.StylesPartial",
    "dynamics:Partials.ShowPartial",
    "dynamics:Partials.IfPartial",
    "dynamics:Partials.ClickPartial",
    "dynamics:Partials.RepeatElementPartial"
], function(Class, TimeFormat, Comparators, Objs, Dom, Assets, Info, PlayerSupport, Async, scoped) {
    return Class.extend({
            scoped: scoped
        }, function(inherited) {
            return {

                template: "<%= template(dirname + '/video_player_controlbar.html') %>",

                attrs: {
                    "css": "ba-videoplayer",
                    "csscommon": "ba-commoncss",
                    "cssplayer": "ba-player",
                    "duration": 0,
                    "position": 0,
                    "cached": 0,
                    "volume": 1.0,
                    "expandedprogress": true,
                    "playing": false,
                    "rerecordable": false,
                    "submittable": false,
                    "streams": [],
                    "currentstream": null,
                    "fullscreen": true,
                    "fullscreened": false,
                    "activitydelta": 0,
                    "hidebarafter": 5000,
                    "preventinteraction": false,
                    "title": "",
                    "settingsmenubutton": false,
                    "hoveredblock": false, // Set true when mouse hovered
                    "allowtexttrackupload": false,
                    'thumbisvisible': false,
                    "tracktextvisible": false // Are subtitles visible?
                },

                computed: {
                    "currentstream_label:currentstream": function() {
                        var cs = this.get("currentstream");
                        return cs ? (cs.label ? cs.label : PlayerSupport.resolutionToLabel(cs.width, cs.height)) : "";
                    }
                },

                functions: {

                    formatTime: function(time) {
                        time = Math.max(time || 0, 1);
                        return TimeFormat.format(TimeFormat.ELAPSED_MINUTES_SECONDS, time * 1000);
                    },

                    startUpdatePosition: function(event) {
                        if (this.get("disableseeking")) return;
                        event[0].preventDefault();
                        if (!this.__parent.get("playing") && this.__parent.player) this.__parent.player.play();
                        this.set("_updatePosition", true);
                        this.call("progressUpdatePosition", event);
                    },

                    progressUpdatePosition: function(event) {
                        var ev = event[0];
                        ev.preventDefault();
                        var _dyn = this.__parent;

                        // Mouse or Touch Event
                        var clientX = ev.clientX || ev.targetTouches[0].clientX;
                        var target = ev.currentTarget;
                        var offset = Dom.elementOffset(target);
                        var dimensions = Dom.elementDimensions(target);
                        var percentageFromStart = (clientX - offset.left) / (dimensions.width || 1);
                        var onDuration = this.get("duration") * percentageFromStart;

                        if (!this.get("_updatePosition") && !_dyn.__trackTags.hasThumbs)
                            return;

                        var player = _dyn.player;

                        if (this.__parent.__trackTags.hasThumbs) {
                            var _index;
                            var _trackTags = _dyn.__trackTags;
                            var _cuesCount = _dyn.get("thumbcuelist").length;
                            if (onDuration > 0) {
                                _index = Math.floor(_cuesCount * percentageFromStart);
                                for (var i = _index - 2; i < _cuesCount; i++) {
                                    if (_dyn.get("thumbcuelist")[i]) {
                                        var _cue = _dyn.get("thumbcuelist")[i];
                                        if (_cue.startTime < onDuration && _cue.endTime > onDuration) {
                                            _trackTags.showDurationThumb(i, clientX, onDuration);
                                            break;
                                        }
                                    }
                                }
                            } else {
                                _index = Math.floor(_cuesCount * percentageFromStart);
                                _trackTags.showDurationThumb(_index, clientX);
                            }

                            this.set("thumbisvisible", true);
                            this.activeElement().appendChild(_trackTags.thumbContainer);
                        }

                        if (this.get("_updatePosition")) {
                            this.set("position", onDuration);

                            if (player._broadcastingState.googleCastConnected) {
                                player.trigger('google-cast-seeking', this.get("position"));
                                return;
                            }
                            this.trigger("position", this.get("position"));
                        }
                    },

                    stopUpdatePosition: function(event) {
                        var ev = event[0];
                        ev.preventDefault();
                        this.set("_updatePosition", false);
                        if (this.__parent.__trackTags.hasThumbs && this.get("thumbisvisible")) {
                            this.set("thumbisvisible", false);
                            this.__parent.__trackTags.hideDurationThumb();
                        }
                    },

                    startUpdateVolume: function(event) {
                        event[0].preventDefault();
                        this.set("_updateVolume", true);
                        this.call("progressUpdateVolume", event);
                    },

                    progressUpdateVolume: function(event) {
                        var ev = event[0];
                        ev.preventDefault();
                        if (!this.get("_updateVolume"))
                            return;
                        var clientX = ev.clientX || ev.targetTouches[0].clientX;
                        var target = ev.currentTarget;
                        var offset = Dom.elementOffset(target);
                        var dimensions = Dom.elementDimensions(target);
                        var _position = (clientX - offset.left) / (dimensions.width || 1);
                        var _test = Dom.getRelativeCoordinates(target, event[0]);
                        // Will fix bug (is outside the range [0, 1]) which cause mobile bug also
                        _position = _position > 1.00 ? 1.00 : (_position < 0.00 ? 0.00 : _position);
                        this.set("volume", _position);
                        this.trigger("volume", this.get("volume"));
                    },

                    stopUpdateVolume: function(event) {
                        event[0].preventDefault();
                        this.set("_updateVolume", false);
                    },

                    startVerticallyUpdateVolume: function(event) {
                        event[0].preventDefault();
                        this.set("_updateVolume", true);
                        this.call("progressVerticallyUpdateVolume", event);
                    },

                    progressVerticallyUpdateVolume: function(event) {
                        var ev = event[0];
                        ev.preventDefault();
                        if (!this.get("_updateVolume"))
                            return;
                        var clientY = ev.clientY || ev.targetTouches[0].clientY;
                        var target = ev.currentTarget;
                        var offset = Dom.elementOffset(target);
                        var dimensions = Dom.elementDimensions(target);
                        var _position = 1 - (clientY - offset.top) / (dimensions.height || 1);
                        // Will fix bug (is outside the range [0, 1]) which cause mobile bug also
                        _position = _position > 1.00 ? 1.00 : (_position < 0.00 ? 0.00 : _position);
                        this.set("volume", _position);
                        this.trigger("volume", this.get("volume"));
                    },

                    stopVerticallyUpdateVolume: function(event) {
                        event[0].preventDefault();
                        this.set("_updateVolume", false);
                    },

                    play: function() {
                        this.trigger("play");
                    },

                    pause: function() {
                        this.trigger("pause");
                    },

                    toggle_player: function() {
                        this.trigger("toggle_player");
                    },

                    toggle_volume: function() {
                        if (this.get("volume") > 0) {
                            this.__oldVolume = this.get("volume");
                            this.set("volume", 0);
                        } else {
                            this.set("volume", this.__oldVolume || 1);
                        }

                        this.trigger("volume", this.get("volume"));
                    },

                    toggle_fullscreen: function() {
                        this.trigger("fullscreen");
                    },

                    toggle_settings_menu: function() {
                        this.trigger("settings_menu");
                    },

                    rerecord: function() {
                        this.trigger("rerecord");
                    },

                    seek: function(position) {
                        this.trigger("seek", position);
                    },

                    set_volume: function(volume) {
                        this.trigger("set_volume", volume);
                    },

                    submit: function() {
                        this.set("submittable", false);
                        this.set("rerecordable", false);
                        this.trigger("submit");
                    },

                    toggle_stream: function() {
                        var streams = this.get("streams");
                        var current = streams.length - 1;
                        streams.forEach(function(stream, i) {
                            if (Comparators.deepEqual(stream, this.get("currentstream")))
                                current = i;
                        }, this);
                        this.set("currentstream", streams[(current + 1) % streams.length]);
                    },

                    show_airplay_devices: function() {
                        var dynamic = this.__parent;
                        if (dynamic.player._broadcastingState.airplayConnected) {
                            dynamic._broadcasting.lookForAirplayDevices(dynamic.player._element);
                        }
                    },

                    // Start ro stop showing CC content
                    toggle_tracks: function() {
                        return this.parent().toggleTrackTags(!this.get('tracktextvisible'));
                    },

                    // Hover on CC button in controller
                    hover_cc: function(hover) {
                        // Not show CC on hover during settings block is open
                        // Reason why use parent not local settingsmenuvisible,
                        // is that settings model also has to be aware it's state. So we need as a global variable
                        if (this.parent().get("settingsmenuvisible")) return;
                        Async.eventually(function() {
                            this.parent().set("tracksshowselection", hover);
                        }, this, 300);
                    },

                    // Move between elements which has tabIndex attribute
                    tab_index_move: function(ev, nextSelector, focusingSelector) {
                        this.trigger("tab_index_move", ev[0], nextSelector, focusingSelector);
                    },

                    // Hover on block
                    hover_block: function(hover) {
                        Async.eventually(function() {
                            this.parent().set("hoveredblock", hover);
                        }, this, 300);
                    },

                    toggle_settings: function() {
                        this.parent().set("settingsmenuvisible", !this.parent().get("settingsmenuvisible"));
                        this.trigger("toggle_settings");
                    }
                },

                create: function() {
                    var dynamic = this.__parent;
                    this.set("ismobile", Info.isMobile());
                    if (dynamic.get("showsettings")) {
                        this.set("isflash", dynamic.get('forceflash') && !dynamic.get('noflash'));
                        Objs.iter(dynamic.get('settingsmenu'), function(setting) {
                            if (this.get())
                                if (this.get("isflash")) {
                                    if (setting.flashSupport)
                                        this.set("settings", true);
                                } else if (this.get("ismobile")) {
                                if (setting.mobileSupport)
                                    this.set("settings", true);
                            } else
                                this.set("settings", true);
                        }, this);
                    }
                }
            };
        })
        .register("ba-videoplayer-controlbar")
        .registerFunctions({
            /*<%= template_function_cache(dirname + '/video_player_controlbar.html') %>*/
        })
        .attachStringTable(Assets.strings)
        .addStrings({
            "video-progress": "Progress",
            "rerecord-video": "Redo?",
            "submit-video": "Confirm",
            "play-video": "Play",
            "pause-video": "Pause",
            "pause-video-disabled": "Pause not supported",
            "elapsed-time": "Elasped time",
            "total-time": "Total length of",
            "fullscreen-video": "Enter fullscreen",
            "volume-button": "Set volume",
            "volume-mute": "Mute sound",
            "volume-unmute": "Unmute sound",
            "change-resolution": "Change resolution",
            "exit-fullscreen-video": "Exit fullscreen",
            "close-tracks": "Close CC",
            "show-tracks": "Show CC",
            "player-speed": "Player speed",
            "settings": "Settings",
            "airplay": "Airplay",
            "airplay-icon": "Airplay icon."
        });
});