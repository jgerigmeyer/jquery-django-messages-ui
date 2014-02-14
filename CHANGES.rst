CHANGES
=======

1.1.0 (2014.02.14)
-------------------

* Add option for template name.
* Make agnostic regarding templating engine, as long as template is
  precompiled and callable fn.

1.0.3 (2013.10.29)
-------------------

* Add option for Handlebars templates global namespace.

1.0.2 (2013.10.27)
-------------------

* Add missing __init__.py.

1.0.1 (2013.10.27)
-------------------

* Fix manifest.in to include package json file.

1.0.0 (2013.10.27)
-------------------

* Publish as a standalone jQuery plugin. Add JS unit tests.
* BACKWARDS INCOMPATIBLE: js filename changed from jquery.messages-ui.js to
  django-messages-ui.js

0.2.7 (2013.09.25)
-------------------

* Remove transient messages on scroll (also mousedown, keydown, mouseover).

0.2.6 (2013.06.05)
-------------------

* Fix AjaxMessagesMiddleware encoding issue with Python 3 and JSON response.
* Precompile Handlebars template with 1.0.0.

0.2.5 (2013.05.23)
------------------

* Precompile Handlebars template with 1.0.0-rc.4.
* Make AjaxMessagesMiddleware Py3-compatible.

0.2.4 (2013.01.28)
------------------

* Add option for function called after closeLink is clicked.

0.2.3 (2013.01.24)
------------------

* Add option for function called on transient messages after transientDelay.

0.2.2 (2013.01.21)
------------------

* Add response.no_messages option for disabling middleware.

0.2.1 (2013.01.14)
------------------

* Rewrite using method plugin architecture; simpler 'add' method to add msg.
* Add option to display unescaped HTML in message content.

0.2.0 (2013.01.11)
------------------

* Add option to use Handlebars.js (new default) instead of ICanHaz.js.

0.1.8 (2013.01.03)
------------------

* Make close-link selector specific to within a message; use preventDefault.

0.1.7 (2012.11.06)
------------------

* JS stop transient-message fade on close-link click.

0.1.6 (2012.10.05)
------------------

* JS don't parse non-json.

0.1.5 (2012.07.23)
------------------

* Don't touch non-200 responses.

0.1.4 (2011.07.14)
------------------

* JS cleanup; added JSLint options.

0.1.3 (2011.06.28)
------------------

* Added ``closeLink: false`` plugin option.
* Subsequent plugin calls on the same element default to previous options
  unless explicitly overridden.

0.1.2 (2011.06.27)
------------------

* Added ``AjaxMessagesMiddleware`` and ``handleAjax`` plugin option.


0.1.1 (2011.06.27)
------------------

* Updated HTML template (removed ``<aside>`` and moved ``#messages`` to
  ``<ul>``).


0.1.0 (2011.06.25)
------------------

* Initial release.
