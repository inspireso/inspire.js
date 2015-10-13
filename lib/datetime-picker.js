/*global clipboardData,jQuery,window,$,$doc */

/*!
 * datetime-picker.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

"use strict";
var $ = window.jQuery;

var config = {
    selector: 'input[role*=datetime]',
    options: {

    }
}

var init = function (selector, options) {
    $(selector).each(function () {
        var $this = $(this);

        var format = $this.data('format') || 'yyyy/mm/dd';
        var ops = $.extend({}, config.options, options, {
            format: format
        });

        $this.datetimepicker(ops);
    });
}

function applyAll() {
    if (!$.fn.datetimepicker) {
        return;
    }

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