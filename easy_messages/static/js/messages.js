/*global Backbone, $ */
//// Messaging JS ////

$(function () {
    'use strict';
    var MessageListView, MessageModel, MessageView, MessageCollection,
        messageCollection, messageListView;

    // <ul>
    MessageListView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'add');
            this.collection.bind('add', this.add);
        },

        add: function (msg) {
            var msg_view = new MessageView({ model: msg });
            $(msg_view.render().el).hide().appendTo($(this.el)).show('blind', 'fast');
        }
    });

    // <li>
    MessageModel = Backbone.Model.extend({
        defaults: {
            msg: null,
            tags: []
        }
    });

    MessageView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'render');
            this.template = $('#message-template').html();
        },

        tagName: 'li',

        events: {
            'click .hide': 'hide'
        },

        render: function () {
            var view, tags, li_el;
            view = this;
            // add classes
            $(view.el).addClass('message');
            tags = this.model.get('tags').toString().replace(',', ' ');
            $(view.el).addClass(tags); // I haven't verified that this works for multiple tags.
            li_el= _.template(this.template, {
                msg: view.model.get('msg')
            });

            $(view.el).html(li_el);
            return view;
        },

        hide: function () {
            $(this.el).hide('blind', 'fast');
        }
    });

    MessageCollection = Backbone.Collection.extend({
        model: MessageModel
    });

    // create collection
    messageCollection = new MessageCollection();

    // populate the collection from DOM
    $('.message').each(function (index, msg_li) {
        var classList, idx, msgModel, msgView;
        classList = Array.prototype.slice.call(msg_li.classList);
        idx = classList.indexOf('message');
        if (idx !== -1) {
            classList.splice(idx, 1);
        }

        msgModel = new MessageModel({
            msg: msg_li.innerText,
            tags: classList
        });

        msgView = new MessageView({
            model: msgModel,
            el: msg_li
        });

        messageCollection.add(msgModel, { silent: true });
    });
 
    // create view, add collection, and attack to DOM
    messageListView = new MessageListView({
        el: $(".messages"),
        collection: messageCollection
    });
 
    // set up ajax success handler
    $('body').ajaxSuccess(function (e, xhr, settings) {
        var json, messages;
        json = $.parseJSON(xhr.responseText);
        if (!!json) {
            messages = json.messages;
            if (!!messages) {
                messageListView.collection.add(messages);
            }
        }
    });

    // set up ajax error messages
    $('body').ajaxError(function (e, xhr, settings, error) {
        var message, messages, json;
        // Check for included messages
        try {
            json = $.parseJSON(xhr.responseText);
        } catch (err) {
            json = null;
        }
        if (!!json) {
            messages = json.messages;
        } else {
            // Build a default message
            message = {
                msg: xhr.status + ' ' + xhr.statusText,
                tags: ['error']
            };
            messages = [message];
        }
        if (!!messages) {
            messageListView.collection.add(messages);
        }
    });
});
