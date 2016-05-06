define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var BlockRevealButtonView = Backbone.View.extend({

        className: "block-reveal",

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(this.model, 'change:_isComplete', this.updateIcon);
            this.render();
        },

        events: {
            "click .block-reveal-graphic-button":"openPopup",
            "click .block-reveal-open-button":"openPopup"
        },

        render: function () {
            var data = this.model.toJSON();
            var template = Handlebars.templates["block-reveal-button"];

            var blockToHide = this.model.get('_blockReveal')._blockToHide;
            var blockToReveal = this.model.get('_blockReveal')._blockToReveal;

            $(this.el).html(template(data)).appendTo('.' + this.model.get("_blockReveal")._blockToHide + " > .block-inner");

            var $blockToHideInner = $("." + blockToHide);
            var $blockToRevealInner = $("." + blockToReveal);

            $blockToRevealInner.addClass('block-reveal-hidden');
            $blockToHideInner.css('opacity', 1);
            $blockToRevealInner.css('opacity', 0);

            if(this.model.get('_blockReveal')._trackCompletion){
                if(!this.model.get('_isComplete')){
                    this.$('.block-reveal-button').hide();
                }
            }

            return this;
        },
        
        openPopup: function(event) {
            if (event) event.preventDefault();

            var blockToHide = this.model.get('_blockReveal')._blockToHide;
            var $blockToHideInner = $("." + blockToHide);

            var blockToReveal = this.model.get('_blockReveal')._blockToReveal;
            var $blockToRevealInner = $("." + blockToReveal);

            this.$('.block-reveal-graphic-button').addClass("visited");
            
            $blockToHideInner.addClass('block-reveal-hidden');
            $blockToRevealInner.removeClass('block-reveal-hidden');

            $blockToHideInner.velocity({
                opacity: 0
            });

            $blockToRevealInner.velocity({
                opacity: 1
            });

            Adapt.scrollTo("." + blockToReveal, { duration:400 });
            $(window).scrollTop(0);
        },

        updateIcon: function () {
            console.log(this.model.get('_isComplete'));
            if(this.model.get('_isComplete')){
                this.$('.block-reveal-button').show();
            }
        }

    });

    var BlockRevealCloseView = Backbone.View.extend({

        className: "block-reveal-close",

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        events: {
            "click .block-reveal-icon-close":"closeContent"
        },

        render: function () {
            var data = this.model.toJSON();
            var template = Handlebars.templates["block-reveal-close"];
            $(this.el).html(template(data)).appendTo('.' + this.model.get("_blockReveal")._blockToReveal + " > .block-inner");
            return this;
        },

        closeContent: function(event) {
            if (event) event.preventDefault();

            var blockToHide = this.model.get('_blockReveal')._blockToReveal;
            var $blockToHideInner = $("." + blockToHide);

            var blockToReveal = this.model.get('_blockReveal')._blockToHide;
            var $blockToRevealInner = $("." + blockToReveal);

            $blockToHideInner.addClass('block-reveal-hidden');
            $blockToRevealInner.removeClass('block-reveal-hidden');

            $blockToHideInner.velocity({
                opacity: 0
            });

            $blockToRevealInner.velocity({
                opacity: 1
            });

            Adapt.scrollTo("." + blockToReveal, { duration:400 });
            $(window).scrollTop(0);
        }

    });

    Adapt.on('articleView:postRender', function(view) {
        if (view.model.get("_blockReveal") && view.model.get("_blockReveal")._isEnabled) {
          new BlockRevealButtonView({model:view.model});
          new BlockRevealCloseView({model:view.model});
        }
    });

});