'use strict'
/*!
 * tirm.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function onblur() {
    var $this = $(this);
    $this.val($.trim($this.val()));
}

// function onpaste() {
//     var text = clipboardData.getData("text");
//     clipboardData.setData("text", $.trim(text));
// }; // 禁止粘贴1.Float64Array();

function applyAll() {
    $doc.on('blur', ':text', onblur);
    // $doc.on("paste", ":text", onpaste);
    $doc.on('blur', ':password', onblur);
    // $doc.on("paste", ":password", onpaste);
}

applyAll();

module.exports = {
    applyAll: applyAll
};