/*global clipboardData,jQuery,window,$,$doc */

/*!
 * dialog.js
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
    selector: 'div[role*=dialog]',
    options: {
        'backdrop': false
    }
}

function init(selector, ignoreHidden, options) {
    $(selector).each(function (index, element) {
        var $dialog = $(this);
        var hidden = !ignoreHidden && $dialog.is(':hidden');
        var ops = $.extend({}, config.options, options);
        if ($dialog.length > 0 && !hidden) {
            $dialog.modal(ops);
        }
    });

}

function applyAll() {
    init(config.selector, false);
    $doc.ajaxSuccess(function (event, xhr, settings) {
        init(config.selector, false);
    });
}

module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
}