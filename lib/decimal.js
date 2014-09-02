/*!
 * nomey.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;
// var number = require('./number');

function onkeydown() {
    if ($.inArray(e.keyCode, [189, 37, 8, 9, 39, 46, 190, 110]) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {

    } else {
        return false;
    }
};

function onblur() {
    var $this = $(this);
    var scale = $this.attr('scale');
    this.value = format(this.value, scale);
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

function format(number, scale, roundHalfUp) {
    scale = scale > 0 && scale <= 20 ? scale : 2;
    var newString; // The new rounded number
    scale = Number(scale);
    if (scale < 1) {
        newString = (Math.round(number)).toString();
    } else {
        var numString = number.toString();
        var minusSign = '';
        if (numString.indexOf('-')) {
            minusSign = numString.substring(0, 1);
            numString = numString.substring(1, numString.length)
        }

        if (numString.lastIndexOf(".") == -1) { // If there is no decimal point
            numString += "."; // give it one at the end
        }
        var cutoff = numString.lastIndexOf(".") + scale; // The point at which to truncate the number
        var d1 = Number(numString.substring(cutoff, cutoff + 1)); // The value of the last decimal place that we'll end up with
        var d2 = Number(numString.substring(cutoff + 1, cutoff + 2)); // The next decimal, after the last one we want
        if (roundHalfUp && d2 >= 5) { // Do we need to round up at all? If not, the string will just be truncated
            if (d1 == 9 && cutoff > 0) { // If the last digit is 9, find a new cutoff point
                while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
                    if (d1 != ".") {
                        cutoff -= 1;
                        d1 = Number(numString.substring(cutoff, cutoff + 1));
                    } else {
                        cutoff -= 1;
                    }
                }
            }
            d1 += 1;
        }
        if (d1 == 10) {
            numString = numString.substring(0, numString.lastIndexOf("."));
            var roundedNum = Number(numString) + 1;
            newString = roundedNum.toString() + '.';
        } else {
            newString = numString.substring(0, cutoff) + d1.toString();
        }
    }
    if (newString.lastIndexOf(".") == -1) { // Do this again, to the new string
        newString += ".";
    }
    var decs = (newString.substring(newString.lastIndexOf(".") + 1)).length;
    for (var i = 0; i < scale - decs; i++) newString += "0";
    return minusSign + newString;

}

function init(selector) {
    $(selector).each(function(index, el) {
        $(el).trigger('blur');
    });

};

function applyAll() {
    var selector = 'input[role*=decimal]:visible';
    $doc.on('keydown', selector, onkeydown);
    $doc.on('blur', selector, onblur);
    $doc.on('paste', selector, onpaste);

    init(selector);
    $doc.bind('ajaxSuccess', function(e) {
        init(selector);
    });


};

applyAll();


module.exports = {
    init: init,
    applyAll: applyAll
};