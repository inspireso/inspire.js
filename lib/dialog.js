/*!
 * dialog.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */
define(function(require, exports, module) {
    var $ = window.jQuery;

    function init(selector) {
        var $dialog = $(selector);
        $dialog.modal({
            'backdrop': 'static'
        });


    };

    function applyAll() {
        init('div[role=dialog]');
        $doc.bind('ajaxSuccess', function(e) {
            init('div[role=dialog]');
        });
    };

    applyAll();

    module.exports = {
        init: init,
        applyAll: applyAll
    }

});