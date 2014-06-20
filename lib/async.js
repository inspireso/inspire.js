/*!
 * async.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

define(function(require, exports, module) {

    var $ = window.jQuery;

    function init(tagName) {
        var els = document.getElementsByTagName(tagName);
        if (els.length > 0) {
            var requires = [];
            for (var i = 0; i < els.length; i++) {
                var src = els[i].getAttribute('src');
                //如果是生产环境，会默认压缩成.min.js|.min.css文件，所以在这边统一替换
                if (!insp.debug) {
                    src = src.replace('.js', '.min.js').replace('.css', '.min.css');
                }
                requires[i] = src;

            }
            require.async(requires);
        }
    };

    function applyAll() {
        init('require');
        $doc.bind('ajaxSuccess', function(e) {
            init('require');
        });
    };

    applyAll();

    module.exports = {
        init: init,
        applyAll: applyAll
    };

});
