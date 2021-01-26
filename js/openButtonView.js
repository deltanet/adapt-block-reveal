define([
  'core/js/adapt'
], function (Adapt) {

  var OpenButtonView = Backbone.View.extend({

    className: 'blockreveal',

    events: {
      'click .js-blockreveal-reveal-btn': 'openPopup'
    },

    initialize: function () {
      this.listenTo(Adapt, 'remove', this.remove);
      this.listenTo(Adapt, 'pageView:ready', this.render);
      this.listenTo(this.model, 'change:_isComplete', this.updateIcon);
    },

    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates['openButton'];

      // Collect data and set up block id's
      this.hideBlockNum = this.model.get('_blockReveal')._blockToHide._number;
      this.revealBlockNum = this.model.get('_blockReveal')._blockToReveal._number;

      // Get children and create array
      this.children = this.model.getChildren(true);
      this.childrenId = [];
      for (var i = 0, l = this.children.length; i < l; i++) {
        this.childrenId[i] = this.children.models[i].get('_id');
      }

      // Backward compatible
      // If length of number is greater than 5 it will be treated as a string ID
      // Set id for block to hide
      if (this.hideBlockNum.length > 5) {
        this.blockToHide = this.hideBlockNum;
      } else {
        this.blockToHide = this.childrenId[this.hideBlockNum-1];
      }
      // Set id for block to reveal
      if (this.revealBlockNum.length > 5) {
        this.blockToReveal = this.revealBlockNum;
      } else {
        this.blockToReveal = this.childrenId[this.revealBlockNum-1];
      }

      $(this.el).html(template(data)).appendTo('.'+this.blockToHide+'>.block__inner');

      $(this.el).addClass(this.model.get('_blockReveal')._blockToHide._buttonLocation + ' ' +this.model.get('_blockReveal')._blockToHide._classes);

      var $blockToHideInner = $('.' + this.blockToHide);
      var $blockToRevealInner = $('.' + this.blockToReveal);

      $blockToRevealInner.addClass('is-blockreveal-hidden');
      $blockToHideInner.css('opacity', 1);
      $blockToRevealInner.css('opacity', 0);

      if (this.model.get('_blockReveal')._trackCompletion){
        if (!this.model.get('_isComplete')){
          this.$('.blockreveal__btn').hide();
        }
      }

      // Resize title to match button
      if (this.model.get('_blockReveal')._blockToHide._buttonLocation == 'bottom') return;

      var $titleElement = $('.'+this.blockToHide).find('.block__title');
      var $titleInnerElement = $('.'+this.blockToHide).find('.block__title-inner');

      if ($titleElement.length) {
        var titlePadding = $titleElement.height() - $titleElement.height();
        $titleElement.css('min-height', this.$('button').outerHeight() - titlePadding);
        $titleInnerElement.css('vertical-align', 'middle');
      }
    },

    openPopup: function (event) {
      if (event) event.preventDefault();

      Adapt.trigger('audio:pauseAudio', 0);

      var $blockToHideInner = $('.' + this.blockToHide);
      var $blockToRevealInner = $('.' + this.blockToReveal);

      this.$('.blockreveal-graphic-btn').addClass('visited');

      $blockToHideInner.addClass('is-blockreveal-hidden');
      $blockToRevealInner.removeClass('is-blockreveal-hidden');

      $blockToHideInner.velocity({
        opacity: 0
      });

      $blockToRevealInner.velocity({
        opacity: 1
      });

      Adapt.navigateToElement('.' + this.blockToReveal, { duration:400 });
      $(window).resize();
    },

    updateIcon: function () {
      if (this.model.get('_isComplete')){
        this.$('.blockreveal__btn').show();
      }
    }

  });

  return OpenButtonView;

});
