/*global clipboardData,jQuery,window,$,$doc */

/*!
 * vaildity.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

"use strict";
var $ = window.jQuery;

function init(selector) {
    $(selector).each(function() {
        if (this.setCustomValidity) {
            this.setCustomValidity($(this).data('title'));
        }
    });
}

var config = {
    selector: 'input[data-title]',
    options: {}
}

function applyAll() {
    init(config.selector);
    $doc.bind('ajaxSuccess', function(e) {
        init(config.selector);
    });

}


module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
};