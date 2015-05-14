'use strict';
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

var $ = window.jQuery;

function init(selector) {
    $(selector).each(function() {
        if (this.setCustomValidity) {
            this.setCustomValidity($(this).data('title'));
        }
    });
}

function applyAll() {
    init('input[data-title]');
    $doc.bind('ajaxSuccess', function(e) {
        init('input[data-title]:visible');
    });

}


applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
};