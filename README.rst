jQuery Django Messages UI
=========================

JS client-side messages plugin, with support for Django contrib.messages app


Getting Started
---------------

django-messages-ui can be used as a standalone jQuery plugin for adding and
removing client-side messages, or as a Django add-on to additionally support
the Django contrib.messages app. It should be called on the message list
element, and accepts options for message selectors, transient messages (that
disappear on click or key-press), and close-links. The messages themselves
should be styled with CSS.

Messages can be dynamically added via `Handlebars.js`_, `ICanHaz.js`_, or any
other templating engine which creates precompiled callable template fns. If
used as a Django plugin there's a Python middleware to automatically add
messages from the request into Ajax JSON responses.

.. _`Handlebars.js`: http://handlebarsjs.com/


Dependencies
------------

- `jQuery`_ library
- `jQuery doTimeout`_ plugin
- (optionally) `handlebars.runtime.js`_ 1.0.0
- (optionally) `ICanHaz.js`_
- (optionally) `django-icanhaz`_ 0.2.0+

.. _`jQuery`: http://jquery.com/
.. _`jQuery doTimeout`: http://benalman.com/projects/jquery-dotimeout-plugin/
.. _`handlebars.runtime.js`: http://handlebarsjs.com/
.. _`ICanHaz.js`: http://icanhazjs.com/
.. _`django-icanhaz`: https://github.com/carljm/django-icanhaz


Installation as a Standalone jQuery Plugin
------------------------------------------

If using as a standalone jQuery plugin, download the `production version`_ or
the `development version`_, along with either the
`Handlebars.js precompiled template`_ or the `ICanHaz.js template`_.

.. _`production version`: https://raw.github.com/jgerigmeyer/jquery-django-messages-ui/master/dist/django-messages-ui.min.js
.. _`development version`: https://raw.github.com/jgerigmeyer/jquery-django-messages-ui/master/dist/django-messages-ui.js
.. _`Handlebars.js precompiled template`: https://raw.github.com/jgerigmeyer/jquery-django-messages-ui/master/messages_ui/static/messages_ui/message.js
.. _`ICanHaz.js template`: https://raw.github.com/jgerigmeyer/jquery-django-messages-ui/master/messages_ui/jstemplates/message.html

Linking the JS::

  <script src="dist/django-messages-ui.min.js"></script>

If desired, also include the `precompiled JS template`_::

  <script src="messages_ui/static/messages_ui/message.js"></script>

.. _`precompiled JS template`: https://raw.github.com/jgerigmeyer/jquery-django-messages-ui/master/messages_ui/static/messages_ui/message.js

To override the default JS template, link to your own precompiled JS file with
a ``message`` template.

If using `ICanHaz.js`_, wrap the `ICanHaz.js template`_ (or your own custom
template, if you don't want to use the default template) in a ``<script
id="message" type="text/html">`` tag and include it in your HTML, or import it
in JS using ``ich.addTemplate('message', YOUR_TEMPLATE_STRING)``.


Installation with Django
------------------------

If using with Django, just ``pip install django-messages-ui`` to install (or
download the tarball from `PyPI`_, unpack it, and run ``python setup.py
install``). In your Django project settings, add ``"messages_ui"`` to your
``INSTALLED_APPS`` setting.

.. _`PyPI`: https://pypi.python.org/pypi/django-messages-ui

Linking the JS::

  <script src="{% static 'messages_ui/django-messages-ui.js' %}"></script>

If desired, also include the precompiled JS template::

  <script src="{% static 'messages_ui/message.js' %}"></script>

Including the default HTML template::

  {% include "messages_ui/_messages.html" %}

If using `ICanHaz.js`_ to insert messages on the client side, use this template
instead::

  {% include "messages_ui/_messages_ich.html" %}

To override the default JS template, link to your own precompiled JS file with
a ``message`` template.

To override the default JS template using `ICanHaz.js`_ and `django-icanhaz`_,
add a ``message.html`` file to a directory listed in your ``ICANHAZ_DIRS``
setting.


Ajax
~~~~

To enable automatic handling of messages from Ajax requests, add
``"messages_ui.middleware.AjaxMessagesMiddleware"`` to your
``MIDDLEWARE_CLASSES`` setting (directly after
``django.contrib.messages.middleware.MessageMiddleware``), and pass
``handleAjax: true`` to the plugin initialization.

.. warning::

  ``AjaxMessagesMiddleware`` converts all HTML AJAX responses into JSON
  responses with a ``messages`` key, and the HTML embedded in an ``html``
  key. If your site uses HTML AJAX responses, this will likely require
  updates to other Ajax-handling code in your site. To avoid this for a
  particular response, set the attribute ``no_messages`` on that response to
  ``True`` before it passes through ``AjaxMessagesMiddleware``.

  Similarly, ``handleAjax: true`` globally sets the default expected
  dataType for AJAX requests to ``"json"``.


Usage
-----

Calling the plugin::

  $('#messages').messages();

Calling the plugin with a variety of options explicitly configured to their
default values::

  $('#messages').messages({
    message: '.message',          // Selector for individual messages
    closeLink: '.close',          // Selector for link to close message
                                  //  ...set to ``false`` to disable
    closeCallback:                // Fn called when closeLink is clicked
      function (el) {
        el.stop().fadeOut('fast', function () {
          el.remove();
        });
      },
    transientMessage: '.success', // Selector for transient messages
    transientDelay: 500,          // Transient message callback delay (ms)
    transientCallback:            // Fn called after transientDelay
      function (el) {
        el.fadeOut(2000, function () { el.remove(); });
      },
    handleAjax: false,            // Enable automatic AJAX handling
    tplNamespace: 'Handlebars.templates',
                                  // Global namespace where precompiled
                                  // ...callable template is stored
    tplName: 'message',           // Template name (must be precompiled
                                  // ...and callable as a fn, accepting
                                  // ...data as first argument)
    escapeHTML: true              // Set ``false`` to display unescaped
                                  //  ...HTML in message content
  });

.. note::

 After the plugin is called once, subsequent calls on the same element will
 default to the options passed the first time, unless new options are
 explicitly provided.

Adding a message in JS::

  $('#messages').messages('add', {message: "Sample Message", tags: "info"});

Adding a message with unescaped HTML in JS::

  $('#messages').messages(
    'add',
    { message: "<a href='/'>Sample Message</a>", tags: "info" },
    { escapeHTML: false }
  );
