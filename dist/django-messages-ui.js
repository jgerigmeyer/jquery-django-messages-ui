/*! Django Messages UI - v1.0.3 - 2013-10-29
* https://github.com/jgerigmeyer/jquery-django-messages-ui
* Copyright (c) 2013 Jonny Gerig Meyer; Licensed MIT */
(function ($) {

    'use strict';

    var count = 0;

    var methods = {
        init: function (opts) {
            var messageList = $(this);
            var options = $.extend({}, $.fn.messages.defaults, messageList.data('messages-ui-opts'), opts);
            messageList.data('messages-ui-opts', options);
            if (options.closeLink) {
                messageList.on('click', options.message + ' ' + options.closeLink, function (e) {
                    e.preventDefault();
                    $(this).blur();
                    var thisMessage = $(this).closest(options.message);
                    methods['remove'](thisMessage, opts, messageList);
                });
            }
            if (options.handleAjax) {
                $.ajaxSetup({
                    dataType: 'json',
                    dataFilter: function (data, type) {
                        if (data && type === 'json') {
                            var json;
                            try {
                                json = $.parseJSON(data);
                            } catch (e) {
                                json = false;
                            }
                            if (json && json.messages) {
                                var messages = $(json.messages);
                                messages.each(function () {
                                    methods['add'](this, opts, messageList);
                                });
                            }
                        }
                        return data;
                    }
                });
            }
            methods.bindHandlers(messageList.find(options.message), options, messageList);
            return messageList;
        },

        add: function (msg_data, opts, messageList) {
            var msgList = messageList || $(this);
            var options = $.extend({}, $.fn.messages.defaults, msgList.data('messages-ui-opts'), opts);
            var data = msg_data || {};
            var namespace = window[options.tplNamespace] || Handlebars;
            var msg;
            data.escapeHTML = options.escapeHTML;
            if (options.templating === 'handlebars' && namespace && namespace.templates && namespace.templates['message']) {
                msg = $(namespace.templates['message'](data));
            } else if (options.templating === 'ich' && ich && ich.message) {
                msg = $(ich.message(data));
            }
            if (msg) {
                msg.appendTo(msgList);
                methods.bindHandlers(msg, options, msgList);
            }
            return msg;
        },

        remove: function (msg, opts, messageList) {
            var msgList = messageList || $(this);
            var options = $.extend({}, $.fn.messages.defaults, msgList.data('messages-ui-opts'), opts);
            if (msg.data('count')) { $.doTimeout('msg-' + msg.data('count')); }
            if (options.closeCallback) { options.closeCallback(msg); }
        },

        bindHandlers: function (messages, opts, messageList) {
            var msgList = messageList || $(this);
            var options = $.extend({}, $.fn.messages.defaults, msgList.data('messages-ui-opts'), opts);
            var transientMessages = messages.filter(options.transientMessage);
            if (transientMessages.length) {
                var addTimer = function (el) {
                    var thisCount = el.data('count');
                    $(document).off('.msg-' + thisCount);
                    el.off('.msg-' + thisCount);
                    $.doTimeout('msg-' + thisCount, options.transientDelay, function () {
                        if (options.transientCallback) { options.transientCallback(el); }
                    });
                };
                transientMessages.each(function () {
                    var msg = $(this);
                    msg.data('count', ++count);
                    $(document).one('mousedown.msg-' + count + ' keydown.msg-' + count + ' scroll.msg-' + count, function () {
                        addTimer(msg);
                    });
                    msg.one('mouseover.msg-' + count, function () {
                        addTimer(msg);
                    });
                });
            }
        },

        // Expose internal methods to allow stubbing in tests
        exposeMethods: function () {
            return methods;
        }
    };

    $.fn.messages = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.messages');
        }
    };

    /* Setup plugin defaults */
    $.fn.messages.defaults = {
        message: '.message',                // Selector for individual messages
        transientMessage: '.success',       // Selector for messages that will disappear on mousedown, keydown
        closeLink: '.close',                // Selector for link that closes message (set to ``false`` to disable close-link handlers)
        closeCallback: function (el) {      // Function called when closeLink is clicked
            el.stop().fadeOut('fast', function () {
                el.remove();
            });
        },
        transientDelay: 500,                // Delay before mousedown, keydown, hover events trigger transient message callback (ms)
        transientCallback: function (el) {  // Function called after transientDelay for transientMessages
            el.fadeOut(2000, function () { el.remove(); });
        },
        handleAjax: false,                  // Enable automatic handling of messages in "messages" key of JSON AJAX response
        templating: 'handlebars',           // Set to ``ich`` to use ICanHaz.js instead of Handlebars.js for templating
        tplNamespace: 'Handlebars',         // Global namespace where precompiled Handlebars template is stored
        escapeHTML: true                    // Set to ``false`` to not HTML-escape message content (allowing for in-line HTML in message)
    };
}(jQuery));
