define([
  'core/js/adapt'
], function (Adapt) {

  var CloseButtonView = Backbone.View.extend({

    className: 'blockreveal',

    events: {
      'click .js-blockreveal-close-btn': 'closeContent'
    },

    initialize: function () {
      this.listenTo(Adapt, 'remove', this.remove);
      this.listenTo(Adapt, 'pageView:ready', this.render);
    },

    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates['closeButton'];

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

      $(this.el).html(template(data)).appendTo('.' + this.blockToReveal + ' > .block__inner');

      $(this.el).addClass(this.model.get('_blockReveal')._blockToReveal._buttonLocation + ' ' +this.model.get('_blockReveal')._blockToReveal._classes);

      // Resize title to match button
      if (this.model.get('_blockReveal')._blockToReveal._buttonLocation == 'bottom') return;

      var $titleElement = $('.'+this.blockToReveal).find('.block__title');
      var $titleInnerElement = $('.'+this.blockToReveal).find('.block__title-inner');

      if ($titleElement.length) {
        var titlePadding = $titleElement.height() - $titleElement.height();
        $titleElement.css('min-height', this.$('button').outerHeight() - titlePadding);
        $titleInnerElement.css('vertical-align', 'middle');
      }
    },

    closeContent: function (event) {
      if (event) event.preventDefault();

      Adapt.trigger('audio:pauseAudio', 0);

      var $blockToHideInner = $('.' + this.blockToReveal);
      var $blockToRevealInner = $('.' + this.blockToHide);

      $blockToHideInner.addClass('u-display-none');
      $blockToRevealInner.removeClass('u-display-none');

      Adapt.trigger('device:changed');

      $blockToHideInner.velocity({
        opacity: 0
      });

      $blockToRevealInner.velocity({
        opacity: 1
      });

      Adapt.navigateToElement('.' + this.blockToHide, { duration:400 });
    }

  });

  return CloseButtonView;

});
