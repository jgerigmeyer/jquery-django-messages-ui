/**
 * jQuery Messages UI 0.1.4
 *
 * Copyright (c) 2011, Jonny Gerig Meyer
 * All rights reserved.
 *
 * Licensed under the New BSD License
 * See: http://www.opensource.org/licenses/bsd-license.php
 */

/*jslint    browser:    true,
            indent:     4,
            confusion:  true */
/*global    jQuery, ich */

(function ($) {

    'use strict';

    $.fn.messages = function (opts) {
        var messageList = $(this),
            options = $.extend({}, $.fn.messages.defaults, messageList.data('messages-ui-opts'), opts),
            messages = messageList.find(options.message),
            transientMessages = messages.filter(options.transientMessage);
        messageList.data('messages-ui-opts', options);
        if (options.closeLink) {
            messageList.find(options.closeLink).click(function () {
                var thisMessage = $(this).closest(options.message);
                thisMessage.fadeOut('fast', function () {
                    thisMessage.detach();
                });
                return false;
            });
        }
        if (transientMessages.length) {
            $(document).bind('mousedown keydown', function (event) {
                $.doTimeout(options.transientDelay, function () {
                    transientMessages.fadeOut(options.transientFadeSpeed, function () {
                        transientMessages.detach();
                    });
                    $(this).unbind(event);
                });
            });
        }
        if (options.handleAjax) {
            $.ajaxSetup({
                dataType: "json",
                dataFilter: function (data, type) {
                    if (type === "json") {
                        var parsed = $.parseJSON(data),
                            messages = $(parsed.messages);
                        messages.each(function () {
                            $(ich.message(this)).appendTo(messageList);
                        });
                        messageList.messages();
                    }
                    return data;
                }
            });
        }
    };

    /* Setup plugin defaults */
    $.fn.messages.defaults = {
        message: '.message',            // Selector for individual messages
        transientMessage: '.success',   // Selector for messages that will disappear on mousedown, keydown
        closeLink: '.close',            // Selector for link that closes message (set to ``false`` to disable close-link handlers)
        transientDelay: 500,            // Delay before mousedown or keydown events trigger transient message fade (ms)
        transientFadeSpeed: 3000,       // Fade speed for transient messages (ms)
        handleAjax: false               // Enable automatic handling of messages in "messages" key of JSON AJAX response
    };
}(jQuery));
