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

define(function(require, exports, module) {

    var $ = window.jQuery;

    function jump($jump, count) {
        window.setTimeout(function() {
            count = count - 1;
            if (count > 0) {
                $jump.children('.js-num').text(count);
                jump($jump, count);
            } else {
                location.href = $jump.data('target');
            }
        }, 1000);
    };

    function init(selector) {
        var $jump = $(selector).first();
        if ($jump.size() > 0) {
            $jump.children('.js-num').text($jump.data('timeout'));
            $(document).ready(function() {
                jump($jump, $jump.data('timeout'));
            })
        }
    }

    function applyAll() {
        init('div[role=jump]');
        $doc.bind('ajaxSuccess', function(e) {
            init('div[role=jump]');
        });
    };

    applyAll();

    module.exports = {
        init: init,
        applyAll: applyAll
    }

});
