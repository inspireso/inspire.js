/*!
 * number.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function onkeydown() {
    if ($.inArray(e.keyCode, [37, 8, 9, 39, 46, 190, 110]) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {

    } else {
        return false;
    }
};

function init(selector) {
    $doc.on('keydown', selector, onkeydown);
};


function applyAll() {
    init('input[role*=number]:visible');
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
};