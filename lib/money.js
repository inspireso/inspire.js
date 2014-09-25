/*!
 * momey.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;
var number = require('./number');

function onblur() {
    this.value = format(this.value);
};

function onpaste() {
    var text = clipboardData.getData('text');
    if (valid(text)) {
        clipboardData.setData('text', text);
    } else {
        return false;
    }
}; // 禁止粘贴1.Float64Array();

function valid(txt) {
    var i = 0;
    var len = txt.length;
    for (i = 0; i < len; i++) {
        var checkTxt = txt.charCodeAt(i); // 使用charCodeAt方法，方法可返回指定位置的字符的
        // Unicode 编码。这个返回值是 0 - 65535
        // 之间的整数。
        if (checkTxt == 37 || checkTxt == 8 || checkTxt == 39 || checkTxt == 46 || checkTxt == 190 || checkTxt == 110 || (checkTxt >= 48 && checkTxt <= 57) || (checkTxt >= 96 && checkTxt <= 105)) {
            continue;
        } else {
            return false;
        }
    }
    return true;
};

function format(num) {
    if (/[^0-9\.]/.test(num)) {
        return num;
    }
    num = num.replace(/^(\d*)$/, '$1.');
    num = (num + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    num = num.replace('.', ',');
    var re = /(\d)(\d{3},)/;
    while (re.test(num)) {
        num = num.replace(re, '$1,$2');
    }
    num = num.replace(/,(\d\d)$/, '.$1');
    return num.replace(/^\./, '0.')
};

function init(selector) {
    number.init(selector);
    $doc.on('blur', selector, onblur);
    $doc.on('paste', selector, onpaste);
};

function applyAll() {
    init('input[role*=money]:visible');
};

applyAll();


module.exports = {
    init: init,
    applyAll: applyAll
};