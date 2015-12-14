define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var BlockRevealView = Backbone.View.extend({

        className: "block-reveal",

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        events: {
            "click .block-reveal-graphic-button":"openPopup",
            "click .block-reveal-open-button":"openPopup",
            "click .content-reveal-icon-close":"closeContent",
        },

        render: function () {
            var data = this.model.toJSON();
            var template = Handlebars.templates["block-reveal"];
            var blockToHide = this.model.get('_blockReveal')._blockToHide;
            $(this.el).html(template(data)).appendTo('.' + this.model.get("_id") + " > .block-inner ");

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
        if (view.model.get("_blockReveal") && view.model.get("_blockReveal")._isEnabled) {
          new BlockRevealView({model:view.model});
        }
    });
});