/*
* adapt-block-reveal
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Robert Peek <robert@delta-net.co.uk>
*/

define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var BlockRevealView = require('extensions/adapt-block-reveal/js/adapt-block-reveal-View');

    // Listen to when the data is all loaded
    Adapt.on('app:dataReady', function() {
        //console.log('Plugin has loaded and data is ready');
    });

});