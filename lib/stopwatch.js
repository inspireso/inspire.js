'use strict'
/*!
 * stopwatch.js
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
 *       role="stopwatch" >
 *       3秒后 ... 当前还剩<span class="num" />秒
 *  </div>
 *
 */


var $ = window.jQuery;

function stopwatch($stopwatch, count) {
    window.setTimeout(function() {
        count = count - 1;
        if (count > 0) {
            $stopwatch.children('.js-num').text(count);
            stopwatch($stopwatch, count);
        }
    }, 1000);
}

function init(selector) {
    var $stopwatch = $(selector).first();
    if ($stopwatch.size() > 0) {
        var timeout = $stopwatch.data('timeout');
        $stopwatch.children('.js-num').text(timeout);
        $(document).ready(function() {
            stopwatch($stopwatch, timeout);
        });
    }
}

function applyAll() {
    init('div[role*=stopwatch]');
    $doc.bind('ajaxSuccess', function(e) {
        init('div[role*=stopwatch]');
    });
}

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
}