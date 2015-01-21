'use strict'
/*!
 * dialog.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */
var $ = window.jQuery;

function init(selector, ignoreHidden) {
    var $dialog = $(selector);
    var hidden = !ignoreHidden && $dialog.is(':hidden');
    if ($dialog.length > 0 && !hidden) {
        $dialog.modal({
            'backdrop': false
        });
    }


};

function applyAll() {
    init('div[role*=dialog]', false);
    init('div[role*=cdialog]', true);
    $doc.bind('ajaxSuccess', function(e) {
        init('div[role*=dialog]', false);
        init('div[role*=cdialog]', true);
    });
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
}