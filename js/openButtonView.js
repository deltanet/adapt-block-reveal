import Adapt from 'core/js/adapt';

export default class OpenButtonView extends Backbone.View {

  className() {
    return 'blockreveal';
  }

  events() {
    return {
      'click .js-blockreveal-reveal-btn': 'openPopup'
    };
  }

  initialize() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.listenToOnce(Adapt, 'componentView:postRender', this.render);
  }

  render() {
    const data = this.model.toJSON();
    const template = Handlebars.templates['openButton'];

    // Collect data and set up block id's
    this.hideBlockNum = this.model.get('_blockReveal')._blockToHide._number;
    this.revealBlockNum = this.model.get('_blockReveal')._blockToReveal._number;

    // Get children and create array
    this.children = this.model.getChildren().models.filter(model => model.isTypeGroup('block'));
    this.childrenId = [];
    for (let i = 0, l = this.children.length; i < l; i++) {
      this.childrenId[i] = this.children[i].get('_id');
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

    const $blockToHideInner = $('.' + this.blockToHide);
    const $blockToRevealInner = $('.' + this.blockToReveal);

    $blockToRevealInner.addClass('u-display-none');
    $blockToHideInner.css('opacity', 1);
    $blockToRevealInner.css('opacity', 0);

    if (this.model.get('_blockReveal')._trackCompletion) {
      this.blockModel = this.children[0];
      this.listenTo(this.blockModel, 'change:_isComplete', this.updateIcon);

      if (!this.blockModel.get('_isComplete')) {
        this.$('.blockreveal__btn').hide();
      }
    }

    // Resize title to match button
    if (this.model.get('_blockReveal')._blockToHide._buttonLocation == 'bottom') return;

    const $titleElement = $('.'+this.blockToHide).find('.block__title');
    const $titleInnerElement = $('.'+this.blockToHide).find('.block__title-inner');

    if ($titleElement.length) {
      const titlePadding = $titleElement.height() - $titleElement.height();
      $titleElement.css('min-height', this.$('button').outerHeight() - titlePadding);
      $titleInnerElement.css('vertical-align', 'middle');
    }
  }

  openPopup(event) {
    if (event) event.preventDefault();

    Adapt.trigger('audio:pauseAudio', 0);

    const $blockToHideInner = $('.' + this.blockToHide);
    const $blockToRevealInner = $('.' + this.blockToReveal);

    this.$('.blockreveal-graphic-btn').addClass('visited');

    $blockToHideInner.addClass('u-display-none');
    $blockToRevealInner.removeClass('u-display-none');

    Adapt.trigger('device:changed');

    $blockToHideInner.velocity({
      opacity: 0
    });

    $blockToRevealInner.velocity({
      opacity: 1
    });

    Adapt.navigateToElement('.' + this.blockToReveal, { duration:400 });
  }

  updateIcon() {
    if (this.blockModel.get('_isComplete')) {
      this.$('.blockreveal__btn').show();
    }
  }
}
