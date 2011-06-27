jQuery messages-UI plugin package for Django
===============================================

django-messages-ui adds JS and HTML to support the Django contrib.messages app. It should be called on the message list object, and accepts options for message selectors, transient messages, and close-links. Messages are added via ICanHaz.js.

Dependencies
------------

- jQuery library (http://jquery.com/)
- jQuery doTimeout (http://benalman.com/projects/jquery-dotimeout-plugin/)
- iCanHaz (http://icanhazjs.com/)
- django-icanhaz 0.2.0+ (https://github.com/carljm/django-icanhaz)

Installation
------------

In your Django project settings, add "messages_ui" to your INSTALLED_APPS.

Usage
-----

Linking the JS::

    <script src="{{ STATIC_URL }}messages_ui/jquery.messages-ui.js"></script>

Including the default HTML Template::

    {% include "messages_ui/_messages.html" %}

Calling the plugin::

    $('#messages').messages();

Adding a message in JS::

    $(ich.message({message: "Sample Message", tags: "info"}).appendTo($('#messages'));

To override the default JS template, add a message.html file to a directory listed in your ICANHAZ_DIRS setting.