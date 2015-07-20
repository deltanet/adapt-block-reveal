/*
* adapt-block-reveal
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Robert Peek <robert@delta-net.co.uk>
*/
define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var BlockRevealView = Backbone.View.extend({

        className: "block-reveal",

        initialize: function () {
            // Listen to Adapt 'remove' event which is called when navigating through the router
            // This cleans up zombie views and prevents memory leaks
            this.listenTo(Adapt, 'remove', this.remove);
            // On initialize start the render process
            this.preRender();
            this.render();
        },

        events: {
            "click .block-reveal-graphic-button":"openPopup",
            "click .block-reveal-open-button":"openPopup",
            "click .content-reveal-icon-close":"closeContent",
        },

        preRender: function() {
        },

        render: function () {
            // Convert model data into JSON
            var data = this.model.toJSON();
            // Get handlebars template
            var template = Handlebars.templates["block-reveal"];
            // Set variable to determine which block to hide
            var blockToHide = this.model.get('_blockReveal')._blockToHide;
            // Push data into template and append template
            $(this.el).html(template(data)).prependTo('.' + this.model.get("_id") + " > .block-inner ");

            var $blockInner = $("." + blockToHide);
            $blockInner.addClass('block-overlay');
            $blockInner.removeClass('trickle-hidden');
            $blockInner.addClass('block-hidden');
            return this;
        },
        
        openPopup: function(event) {

            if (event) event.preventDefault();

            var blockToHide = this.model.get('_blockReveal')._blockToHide;
            var $blockInner = $("." + blockToHide);

            this.$('.block-reveal-graphic-button').addClass("visited");
            
            // trigger popupManager - this sets all tabindex elements to -1
            Adapt.trigger('popup:opened');
            // set close button to 0 - this prevents the user from tabbing outside of the popup whilst open
            this.$('.content-reveal-icon-close').attr('tabindex', 0);
            
            this.$(".content-reveal-done").css({
                display:"block"
            });

            $blockInner.removeClass('block-hidden');

            $blockInner.velocity({
                opacity: 1
            });

            this.$(".block-reveal-shadow").velocity({
                opacity: 1
            },{
                display: "block"
            });
        },

        closeContent: function(event) {
            if (event) event.preventDefault();

            var blockToHide = this.model.get('_blockReveal')._blockToHide;
            var $blockInner = $("." + blockToHide);

            this.$(".content-reveal-done").css({
                display:"none"
            });

            $blockInner.addClass('block-hidden');

            $blockInner.velocity({
                opacity: 0
            });

            // trigger popup closed to reset the tab index back to 0
            Adapt.trigger('popup:closed');

            this.$(".block-reveal-shadow").velocity({
                opacity: 0
            },{
                display: "none"
            });
        }

    });
    
    Adapt.on('blockView:postRender', function(view) {
        if (view.model.get("_blockReveal")) {
          new BlockRevealView({model:view.model});
        }
    });
});