/*
 * django-messages-ui
 * https://github.com/jgerigmeyer/jquery-django-messages-ui
 *
 * Copyright (c) 2013 Jonny Gerig Meyer
 * Licensed under the MIT license.
 */

(function ($) {

  'use strict';

  var count = 0;

  var methods = {
    init: function (opts) {
      var messageList = $(this);
      var options = $.extend(
        {},
        $.fn.messages.defaults,
        messageList.data('messages-ui-opts'),
        opts
      );
      messageList.data('messages-ui-opts', options);
      if (options.closeLink) {
        messageList.on(
          'click',
          options.message + ' ' + options.closeLink,
          function (e) {
            e.preventDefault();
            $(this).blur();
            var thisMessage = $(this).closest(options.message);
            methods.remove(thisMessage, opts, messageList);
          }
        );
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
                  methods.add(this, opts, messageList);
                });
              }
            }
            return data;
          }
        });
      }
      methods.bindHandlers(
        messageList.find(options.message),
        options,
        messageList
      );
      return messageList;
    },

    add: function (msg_data, opts, messageList) {
      var msgList = messageList || $(this);
      var options = $.extend(
        {},
        $.fn.messages.defaults,
        msgList.data('messages-ui-opts'),
        opts
      );
      var data = msg_data || {};
      var tpl = options.template || Handlebars.templates.message;
      var msg;
      data.escapeHTML = options.escapeHTML;
      if (tpl && typeof tpl === 'function') {
        msg = $(tpl(data));
      } else {
        throw new Error('Template not found');
      }
      msg.appendTo(msgList);
      methods.bindHandlers(msg, options, msgList);
      return msg;
    },

    remove: function (msg, opts, messageList) {
      var msgList = messageList || $(this);
      var options = $.extend(
        {},
        $.fn.messages.defaults,
        msgList.data('messages-ui-opts'),
        opts
      );
      if (msg.data('count')) { $.doTimeout('msg-' + msg.data('count')); }
      if (options.closeCallback) { options.closeCallback(msg); }
    },

    bindHandlers: function (messages, opts, messageList) {
      var msgList = messageList || $(this);
      var options = $.extend(
        {},
        $.fn.messages.defaults,
        msgList.data('messages-ui-opts'),
        opts
      );
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
          count = count + 1;
          msg.data('count', count);
          $(document).one(
            'mousedown.msg-' + count +
              ' keydown.msg-' + count +
              ' scroll.msg-' + count,
            function () { addTimer(msg); }
          );
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
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.messages');
    }
  };

  /* Setup plugin defaults */
  $.fn.messages.defaults = {
    message: '.message',                  // Selector for individual messages
    transientMessage: '.success',         // Selector for messages that will
                                          // ...disappear on mousedown, keydown
    closeLink: '.close',                  // Selector for link that closes
                                          // ...message (set to ``false`` to
                                          // ...disable close-link handlers)
    closeCallback: function (el) {        // Fn called when closeLink is clicked
      el.stop().fadeOut('fast', function () {
        el.remove();
      });
    },
    transientDelay: 500,                  // Delay before mousedown, keydown,
                                          // ...hover events trigger transient
                                          // ...message callback (ms)
    transientCallback: function (el) {    // Fn called for transient msgs
      el.fadeOut(2000, function () { el.remove(); });
    },
    handleAjax: false,                    // Enable automatic handling of msgs
                                          // ...in "messages" key of xhr resp.
    template: false,
                                          // Callable precompiled template fn.
    escapeHTML: true                      // Set to ``false`` to not HTML-escape
                                          // ...message content (allowing for
                                          // ...in-line HTML in message)
  };
}(jQuery));
