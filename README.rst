Django Easy Messages
===================

Requires Backbone.js, underscore.js, and jQuery

Installation:
-------------

1. Add ``easy_messages`` to ``INSTALLED_APPS`` in settings.py.
2. Add ``easy_messages.middleware.AjaxMessaging`` to ``MIDDLEWARE_CLASSES`` in settings.py.
3. Add the following lines to your base template in the desired locations::

    {% include "messages/list.html" %}
    <script type="text/javascript" src="{{ STATIC_URL }}js/messages.js"></script>
    <link type="text/css" rel="stylesheet" href="{{ STATIC_URL }}css/messages.css" />

Note also that there's also a messages.less file included if you'd prefer to use .less instead of css.
