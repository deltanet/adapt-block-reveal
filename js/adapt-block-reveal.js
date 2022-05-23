import Adapt from 'core/js/adapt';
import OpenButtonView from './openButtonView';
import CloseButtonView from './closeButtonView';

class BlockReveal extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'articleView:postRender', this.onArticleReady);
  }

  onArticleReady(view) {
    if (view.model.get('_blockReveal') && view.model.get('_blockReveal')._isEnabled) {
      new OpenButtonView({model:view.model});
      new CloseButtonView({model:view.model});
    }
  }
}

export default new BlockReveal();
