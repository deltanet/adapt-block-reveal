define([
    'core/js/adapt'
], function(Adapt) {

    var OpenButtonView = Backbone.View.extend({

        className: "block-reveal",

        events: {
            "click .block-reveal-graphic-button": "openPopup",
            "click .reveal-button": "openPopup"
        },

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(this.model, 'change:_isComplete', this.updateIcon);
            this.render();
        },

        render: function () {
            var data = this.model.toJSON();
            var template = Handlebars.templates["openButton"];

            // Collect data and set up block id's
            this.hideBlockNum = this.model.get('_blockReveal')._blockToHide._number;
            this.revealBlockNum = this.model.get('_blockReveal')._blockToReveal._number;

            // Get children and create array
            this.children = this.model.getChildren(true);
            this.childrenId = new Array();
            for (var i = 0, l = this.children.length; i < l; i++) {
              this.childrenId[i] = this.children.models[i].get('_id');
            }

            // Backward compatible
            // If length of number is greater than 5 it will be treated as a string ID
            // Set id for block to hide
            if(this.hideBlockNum.length > 5) {
              this.blockToHide = this.hideBlockNum;
            } else {
              this.blockToHide = this.childrenId[this.hideBlockNum-1];
            }
            // Set id for block to reveal
            if(this.revealBlockNum.length > 5) {
              this.blockToReveal = this.revealBlockNum;
            } else {
              this.blockToReveal = this.childrenId[this.revealBlockNum-1];
            }

            $(this.el).html(template(data)).appendTo('.' + this.blockToHide + " > .block-inner");

            var $blockToHideInner = $("." + this.blockToHide);
            var $blockToRevealInner = $("." + this.blockToReveal);

            $blockToRevealInner.addClass('block-reveal block-reveal-hidden');
            $blockToHideInner.css('opacity', 1);
            $blockToRevealInner.css('opacity', 0);

            if (this.model.get('_blockReveal')._trackCompletion){
                if (!this.model.get('_isComplete')){
                    this.$('.block-reveal-button').hide();
                }
            }

            // Resize title to match button
            if (this.model.get('_blockReveal')._blockToHide._buttonLocation == "bottom") return;

            var $titleElement = $('.'+this.blockToHide).find('.block-title');
            var $titleInnerElement = $('.'+this.blockToHide).find('.block-title-inner');

            if ($titleElement.length) {
              var titlePadding = $titleElement.outerHeight() - $titleElement.height();
              $titleElement.css('min-height', this.$('button').outerHeight() - titlePadding);
              $titleInnerElement.css('vertical-align', 'middle');
            }
        },

        openPopup: function(event) {
            if (event) event.preventDefault();

            Adapt.trigger('audio:pauseAudio', 0);

            var $blockToHideInner = $("." + this.blockToHide);
            var $blockToRevealInner = $("." + this.blockToReveal);

            this.$('.block-reveal-graphic-button').addClass("visited");

            $blockToHideInner.addClass('block-reveal-hidden');
            $blockToRevealInner.removeClass('block-reveal-hidden');

            $blockToHideInner.velocity({
                opacity: 0
            });

            $blockToRevealInner.velocity({
                opacity: 1
            });

            Adapt.scrollTo("." + this.blockToReveal, { duration:400 });
            $(window).resize();
        },

        updateIcon: function () {
            if(this.model.get('_isComplete')){
                this.$('.block-reveal-button').show();
            }
        }

    });

    return OpenButtonView;

});
