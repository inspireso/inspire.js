/*global clipboardData,jQuery,window,$,$doc */

/*!
 * jump.js
 * Tested in IE 10, Chrome 27
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 * Example:
 *  <div data-target="${successBackUrl}"
 *       data-timeout="3"
 *       role="jump" >
 *       3秒后 ... 当前还剩<span class="num" />秒
 *  </div>
 *
 */

"use strict";
var $ = window.jQuery;

function jump($jump, count) {
    window.setTimeout(function () {
        count = count - 1;
        if (count > 0) {
            $jump.children('.js-num').text(count);
            jump($jump, count);
        } else {
            var target = $jump.data('target');
            var fntarget = window[target];
            if (fntarget && typeof fntarget === 'function') {
                fntarget();
            } else {
                location.href = target;
            }

        }
    }, 1000);
}

function init(selector) {
    $(selector).each(function (index, element) {
        var $jump = $(this);
        $jump.children('.js-num').text($jump.data('timeout'));
        $doc.ready(function () {
            jump($jump, $jump.data('timeout'));
        });
    });

}
var config = {
    selector: 'div[role*=jump]',
    options: {

    }
}

function applyAll() {
    init(config.selector);
    $doc.ajaxSuccess(function (event, xhr, settings) {
        init(config.selector);
    });
}


module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
}