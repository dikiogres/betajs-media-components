/*!
betajs-media-components - v0.0.61 - 2017-06-18
Copyright (c) Ziggeo,Oliver Friedmann
Apache-2.0 Software License.
*/
(function () {

var Scoped = this.subScope();

Scoped.binding("browser", "global:BetaJS.Browser");
Scoped.binding("module", "global:BetaJS.MediaComponents");

Scoped.extend("module:Assets.playerthemes", [
    "browser:Info"
], function(Info) {
    var ie8 = Info.isInternetExplorer() && Info.internetExplorerVersion() <= 8;
    return {
        "minimalist": {
            css: "ba-videoplayer-minimalist-theme",
            csstheme: "ba-videoplayer-minimalist-theme",
            tmplcontrolbar: "<div class=\"{{css}}-dashboard {{activitydelta > 5000 && hideoninactivity ? (css + '-dashboard-hidden') : ''}}\">\n\n    <div class='{{css}}-controlbar-header'>\n        <div class=\"{{css}}-controlbar-header-icons-block\">\n\n            <div class=\"{{css}}-right-block\">\n\n                <div data-selector=\"button-icon-resize-full\" class=\"{{css}}-button-container\"\n                     ba-if=\"{{fullscreen}}\" ba-click=\"toggle_fullscreen()\" title=\"{{ fullscreened ? string('exit-fullscreen-video') : string('fullscreen-video') }}\">\n                    <div class=\"{{css}}-button-inner {{css}}-full-screen-btn-inner\">\n                        <i class=\"{{css}}-icon-resize-{{fullscreened ? 'small' : 'full'}}\"></i>\n                    </div>\n                </div>\n\n                <div data-selector=\"button-icon-volume\" class=\"{{css}}-button-container\" ba-click=\"toggle_volume()\" title=\"{{string(volume > 0 ? 'volume-mute' : 'volume-unmute')}}\">\n                    <div class=\"{{css}}-button-inner\">\n                        <i class=\"{{css + '-icon-volume-' + (volume >= 0.5 ? 'up' : (volume > 0 ? 'down' : 'off')) }}\"></i>\n                    </div>\n                </div>\n\n                <div class=\"{{css}}-volumebar\">\n                    <div data-selector=\"button-volume-bar\" class=\"{{css}}-volumebar-inner\"\n                         onmousedown=\"{{startUpdateVolume(domEvent)}}\"\n                         onmouseup=\"{{stopUpdateVolume(domEvent)}}\"\n                         onmouseleave=\"{{stopUpdateVolume(domEvent)}}\"\n                         onmousemove=\"{{progressUpdateVolume(domEvent)}}\">\n                        <div class=\"{{css}}-volumebar-position\" ba-styles=\"{{{width: Math.ceil(1+Math.min(99, Math.round(volume * 100))) + '%'}}}\" title=\"{{string('volume-button')}}\"></div>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n\n        <div class=\"{{css}}-controlbar-header-title-block\" ba-if=\"{{title}}\">\n            <div class=\"{{css}}-title\"><p>{{title}}</p></div>\n        </div>\n    </div>\n\n    <div class=\"{{css}}-controlbar-footer\">\n\n        <div class=\"{{css}}-controlbar-top-block\">\n\n            <div data-selector=\"submit-video-button\" class=\"{{css}}-button-container\" ba-if=\"{{submittable}}\"  ba-click=\"submit()\">\n                <div class=\"{{css}}-button-inner\">\n                    {{string('submit-video')}}\n                </div>\n            </div>\n\n            <div data-selector=\"button-icon-play\" class=\"{{css}}-button-container\" ba-if=\"{{!playing}}\" ba-click=\"play()\" title=\"{{string('play-video')}}\">\n                <div class=\"{{css}}-button-inner\">\n                    <i class=\"{{css}}-icon-play\"></i>\n                </div>\n            </div>\n\n            <div data-selector=\"button-icon-pause\" class=\"{{css}}-button-container {{disablepause ? css + '-disabled' : ''}}\"\n                 ba-if=\"{{playing}}\" ba-click=\"pause()\" title=\"{{disablepause ? string('pause-video-disabled') : string('pause-video')}}\">\n                <div class=\"{{css}}-button-inner\">\n                    <i class=\"{{css}}-icon-pause\"></i>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"{{css}}-controlbar-middle-block\">\n\n            <div class=\"{{css}}-progressbar {{disableseeking ? css + '-disabled' : ''}}\">\n                <div data-selector=\"progress-bar-inner\" class=\"{{css}}-progressbar-inner\"\n                     onmousedown=\"{{startUpdatePosition(domEvent)}}\"\n                     onmouseup=\"{{stopUpdatePosition(domEvent)}}\"\n                     onmouseleave=\"{{stopUpdatePosition(domEvent)}}\"\n                     onmousemove=\"{{progressUpdatePosition(domEvent)}}\">\n\n                    <div class=\"{{css}}-progressbar-cache\" ba-styles=\"{{{width: Math.round(duration ? cached / duration * 100 : 0) + '%'}}}\"></div>\n                    <div class=\"{{css}}-progressbar-position\" ba-styles=\"{{{width: Math.round(duration ? position / duration * 100 : 0) + '%'}}}\" title=\"{{string('video-progress')}}\">\n                        <div class=\"{{css}}-progressbar-button\"></div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"{{css}}-controlbar-bottom-block\">\n\n            <div data-selector=\"button-icon-ccw\" class=\"{{css}}-button-container {{css}}-player-rerecord\" ba-if=\"{{rerecordable}}\" ba-click=\"rerecord()\" title=\"{{string('rerecord-video')}}\">\n                <div class=\"{{css}}-button-inner\">\n                    <i class=\"{{css}}-icon-ccw\"></i>\n                </div>\n            </div>\n\n            <div class=\"{{css}}-button-container {{css}}-time-container\">\n                <div class=\"{{css}}-time-value\" title=\"{{string('elapsed-time')}}\">{{formatTime(position)}}</div>\n                <p> / </p>\n                <div class=\"{{css}}-time-value\" title=\"{{string('total-time')}}\">{{formatTime(duration || position)}}</div>\n            </div>\n\n            <div data-selector=\"button-stream-label\" class=\"{{css}}-button-container\" ba-if=\"{{streams.length > 1 && currentstream}}\" ba-click=\"toggle_stream()\" title=\"{{string('change-resolution')}}\">\n                <div class=\"{{css}}-button-inner {{css}}-stream-label-container\">\n                    <span class=\"{{css}}-button-text {{css}}-stream-label\">{{currentstream_label}}</span>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n",
            cssloader: ie8 ? "ba-videoplayer" : "",
            cssmessage: "ba-videoplayer",
            cssplaybutton: ie8 ? "ba-videoplayer" : ""
        }
    };
});
Scoped.extend("module:Assets.recorderthemes", [], function() {
    return {
        "minimalist": {
            css: "ba-videorecorder-theme-minimalist",
            cssmessage: "ba-videorecorder",
            cssloader: "ba-videorecorder",
            tmpltopmessage: "<div data-selector=\"recorder-topmessage-block\" class=\"{{css}}-topmessage-container\">\n    <div class='{{css}}-topmessage-message'>\n        {{topmessage}}\n    </div>\n</div>",
            tmplcontrolbar: "<div class=\"{{css}}-dashboard\">\n\n\t<!-- Sidebar Settings -->\n\t<div class=\"{{css}}-settings-left-sidebar\">\n\n\t\t<div class=\"{{css}}-controlbar-left-section\" ba-show=\"{{settingsvisible}}\">\n\n\t\t\t<!-- Popup Settings Selections, initially hidden, appear when click button for settings -->\n\t\t\t<div data-selector=\"recorder-settings\" class=\"{{css}}-settings {{css}}-settings-button-container\">\n\n\t\t\t\t<div data-selector=\"settings-list-front\" class=\"{{css}}-circle-button\" ba-show=\"{{settingsvisible}}\">\n\n\t\t\t\t\t<div class=\"{{css}}-bubble-info\" ba-show=\"{{settingsopen}}\" >\n\t\t\t\t\t\t<ul data-selector=\"camera-settings\" ba-repeat=\"{{camera :: cameras}}\">\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<input type='radio' name='camera' value=\"{{selectedcamera == camera.id}}\" onclick=\"{{selectCamera(camera.id)}}\" />\n\t\t\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t\t\t<label onclick=\"{{selectCamera(camera.id)}}\">\n\t\t\t\t\t\t\t\t\t{{camera.label}}\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div data-selector=\"record-button-icon-cog\" class=\"{{css}}-button-inner {{css}}-button-circle-{{settingsopen ? 'selected' : 'unselected' }}\"\n\t\t\t\t\t\t onclick=\"{{settingsopen=!settingsopen}}\"\n\t\t\t\t\t\t onmouseenter=\"{{hover(string('settings'))}}\"\n\t\t\t\t\t\t onmouseleave=\"{{unhover()}}\" >\n\t\t\t\t\t\t<i class=\"{{css}}-icon-cog\"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\n                <div class=\"{{css}}-circle-button\" ba-show=\"{{!noaudio}}\">\n\n                    <div class=\"{{css}}-bubble-info\" ba-show=\"{{settingsvisible && settingsopen && audio }}\">\n                        <ul data-selector=\"microphone-settings\" ba-repeat=\"{{microphone :: microphones}}\" ba-show=\"{{audio}}\">\n                            <li onclick=\"{{selectMicrophone(microphone.id)}}\">\n                                <input type='radio' name='microphone' value=\"{{selectedmicrophone == microphone.id}}\" />\n                                <span></span>\n                                <label>\n                                    {{microphone.label}}\n                                </label>\n                            </li>\n                        </ul>\n                    </div>\n\n                    <div data-selector=\"record-button-icon-mic\" class=\"{{css}}-button-inner\"\n                         onmouseenter=\"{{hover(string(microphonehealthy ? 'microphonehealthy' : 'microphoneunhealthy'))}}\"\n                         onmouseleave=\"{{unhover()}}\">\n                        <i class=\"{{css}}-icon-mic {{css}}-icon-state-{{microphonehealthy ? 'good' : 'bad' }}\"></i>\n                    </div>\n                </div>\n\n                <div class=\"{{css}}-circle-button\" ba-show=\"{{!novideo}}\">\n                    <div data-selector=\"record-button-icon-videocam\" class=\"{{css}}-button-inner\"\n                         onmouseenter=\"{{hover(string(camerahealthy ? 'camerahealthy' : 'cameraunhealthy'))}}\"\n                         onmouseleave=\"{{unhover()}}\">\n                        <i class=\"{{css}}-icon-videocam {{css}}-icon-state-{{ camerahealthy ? 'good' : 'bad' }}\"></i>\n                    </div>\n                </div>\n\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\n\t<div class=\"{{css}}-controlbar-middle-section\">\n\n\t\t<div class=\"{{css}}-timer-container\" ba-show=\"{{stopvisible}}\">\n\t\t\t<div class=\"{{css}}-label-container\" ba-show=\"{{controlbarlabel}}\">\n\t\t\t\t<div data-selector=\"record-label-block\" class=\"{{css}}-label {{css}}-button-primary\">\n\t\t\t\t\t{{controlbarlabel}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\n\t<!-- Control bar, footer part which holds all buttons -->\n\t<div data-selector=\"controlbar\" class=\"{{css}}-controlbar\">\n\n\t\t<div class=\"{{css}}-controlbar-center-section\">\n\n\t\t\t<div class=\"{{css}}-button-container\" ba-show=\"{{rerecordvisible}}\">\n\t\t\t\t<div data-selector=\"rerecord-primary-button\" class=\"{{css}}-button-primary\"\n\t\t\t\t\t onclick=\"{{rerecord()}}\"\n\t\t\t\t\t onmouseenter=\"{{hover(string('rerecord-tooltip'))}}\"\n\t\t\t\t\t onmouseleave=\"{{unhover()}}\">\n\t\t\t\t\t{{string('rerecord')}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"{{css}}-primary-button-container\" ba-show=\"{{recordvisible}}\">\n\t\t\t\t<div data-selector=\"record-primary-button\" class=\"{{css}}-button-primary\"\n\t\t\t\t\t onclick=\"{{record()}}\"\n\t\t\t\t\t onmouseenter=\"{{hover(string('record-tooltip'))}}\"\n\t\t\t\t\t onmouseleave=\"{{unhover()}}\">\n\t\t\t\t\t{{string('record')}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\n\t\t<div class=\"{{css}}-stop-container\" ba-show=\"{{stopvisible}}\">\n\n\t\t\t<div class=\"{{css}}-stop-button-container\">\n\t\t\t\t<div data-selector=\"stop-primary-button\" class=\"{{css}}-button-primary\"\n\t\t\t\t\t onclick=\"{{stop()}}\"\n\t\t\t\t\t onmouseenter=\"{{hover(string('stop-tooltip'))}}\"\n\t\t\t\t\t onmouseleave=\"{{unhover()}}\">\n\t\t\t\t\t{{string('stop')}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n        <div class=\"{{css}}-centerbutton-container\" ba-show=\"{{skipvisible}}\">\n            <div data-selector=\"skip-primary-button\" class=\"{{css}}-button-primary\"\n                 onclick=\"{{skip()}}\"\n                 onmouseenter=\"{{hover(string('skip-tooltip'))}}\"\n                 onmouseleave=\"{{unhover()}}\">\n                {{string('skip')}}\n            </div>\n        </div>\n\n\n        <div class=\"{{css}}-rightbutton-container\" ba-if=\"{{uploadcovershotvisible}}\">\n            <div data-selector=\"covershot-primary-button\" class=\"{{css}}-button-primary\"\n                 onmouseenter=\"{{hover(string('upload-covershot-tooltip'))}}\"\n                 onmouseleave=\"{{unhover()}}\">\n                <input type=\"file\"\n                       class=\"{{css}}-chooser-file\"\n                       style=\"height:100px\"\n                       onchange=\"{{uploadCovershot(domEvent)}}\"\n                       accept=\"{{covershot_accept_string}}\" />\n                <span>\n                    {{string('upload-covershot')}}\n                </span>\n            </div>\n        </div>\n\n\t</div>\n\n</div>\n",
            tmplimagegallery: "<div data-selector=\"image-gallery\" class=\"{{css}}-image-gallery-container\">\n\n\t<div data-selector=\"slider-left-button\" class=\"{{css}}-imagegallery-leftbutton\">\n\t\t<div data-selector=\"slider-left-inner-button\" class=\"{{css}}-imagegallery-button-inner\" onclick=\"{{left()}}\">\n\t\t\t<i class=\"{{css}}-icon-left-open\"></i>\n\t\t</div>\n\t</div>\n\n\t<div data-selector=\"images-imagegallery-container\" ba-repeat=\"{{image::images}}\" class=\"{{css}}-imagegallery-container\" data-gallery-container>\n\t\t<div class=\"{{css}}-imagegallery-image\"\n\t\t\t ba-styles=\"{{{left: image.left + 'px', top: image.top + 'px', width: image.width + 'px', height: image.height + 'px'}}}\"\n\t\t\t onclick=\"{{select(image)}}\">\n\t\t</div>\n\t</div>\n\n\t<div data-selector=\"slider-right-button\" class=\"{{css}}-imagegallery-rightbutton\">\n\t\t<div data-selector=\"slider-right-inner-button\" class=\"{{css}}-imagegallery-button-inner\" onclick=\"{{right()}}\">\n\t\t\t<i class=\"{{css}}-icon-right-open\"></i>\n\t\t</div>\n\t</div>\n\n</div>\n",
            tmplchooser: "\n<div class=\"{{css}}-chooser-container\">\n\n\t<div class=\"{{css}}-chooser-button-container\">\n\t\t<div>\n\t\t\t<div data-selector=\"chooser-primary-button\" class=\"{{css}}-chooser-primary-button\"\n\t\t\t     ba-click=\"primary()\"\n\t\t\t     ba-if=\"{{has_primary}}\">\n\t\t\t\t<input data-selector=\"file-input-opt1\" ba-if=\"{{enable_primary_select && primary_select_capture}}\"\n\t\t\t\t       type=\"file\"\n\t\t\t\t       class=\"{{css}}-chooser-file\"\n\t\t\t\t       style=\"height:100\"\n\t\t\t\t       onchange=\"{{primary_select(domEvent)}}\"\n\t\t\t\t       accept=\"{{primary_accept_string}}\"\n\t\t\t\t       capture />\n\t\t\t\t<input data-selector=\"file-input-opt2\" ba-if=\"{{enable_primary_select && !primary_select_capture}}\"\n\t\t\t\t       type=\"file\"\n\t\t\t\t       class=\"{{css}}-chooser-file\"\n\t\t\t\t       style=\"height:100\"\n\t\t\t\t       onchange=\"{{primary_select(domEvent)}}\"\n\t\t\t\t       accept=\"{{primary_accept_string}}\" />\n\t\t\t\t<span>\n\t\t\t\t\t{{primary_label}}\n\t\t\t\t</span>\n\t\t\t\t<i class=\"{{css}}-icon-{{primaryrecord ? 'record' : 'chooser-upload'}}\"></i><i class=\"{{css}}-shape-{{primaryrecord ? 'record' : 'upload'}}\"></i>\n\t\t\t</div>\n\t\t</div>\n\t\t<div>\n\t\t\t<div data-selector=\"chooser-secondary-button\" class=\"{{css}}-chooser-secondary-button\"\n\t\t\t     ba-click=\"secondary()\"\n\t\t\t     ba-if=\"{{has_secondary}}\">\n\t\t\t\t<input data-selector=\"file-input-secondary-opt1\" ba-if=\"{{enable_secondary_select && secondary_select_capture}}\"\n\t\t\t\t       type=\"file\"\n\t\t\t\t       class=\"{{css}}-chooser-file\"\n\t\t\t\t       style=\"height:100\"\n\t\t\t\t       onchange=\"{{secondary_select(domEvent)}}\"\n\t\t\t\t       accept=\"{{secondary_accept_string}}\" />\n\t\t\t\t<input data-selector=\"file-input-secondary-opt2\" ba-if=\"{{enable_secondary_select && !secondary_select_capture}}\"\n\t\t\t\t       type=\"file\"\n\t\t\t\t       class=\"{{css}}-chooser-file\"\n\t\t\t\t       style=\"height:100\"\n\t\t\t\t       onchange=\"{{secondary_select(domEvent)}}\"\n\t\t\t\t       accept=\"{{secondary_accept_string}}\" />\n\t\t\t\t<span>\n\t\t\t\t\t{{secondary_label}}\n\t\t\t\t</span>\n\t\t\t\t<i class=\"{{css}}-icon-chooser-upload\"></i>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n",
            tmplmessage: "<div data-selector=\"recorder-message-container\" class=\"{{css}}-message-container\" ba-click=\"click()\">\n    <div class=\"{{css}}-top-inner-message-container\">\n        <div class=\"{{css}}-first-inner-message-container\">\n            <div class=\"{{css}}-second-inner-message-container\">\n                <div class=\"{{css}}-third-inner-message-container\">\n                    <div class=\"{{css}}-fourth-inner-message-container\">\n                        <div data-selector=\"recorder-message-block\" class='{{css}}-message-message'>\n                            {{message || \"\"}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"
        }
    };
});
}).call(Scoped);