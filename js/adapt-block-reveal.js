define([
  'core/js/adapt',
  './openButtonView',
  './closeButtonView'
], function (Adapt, OpenButtonView, CloseButtonView) {

  Adapt.on('articleView:postRender', function (view) {
    if (view.model.get('_blockReveal') && view.model.get('_blockReveal')._isEnabled) {
      new OpenButtonView({model:view.model});
      new CloseButtonView({model:view.model});
    }
  });

});
