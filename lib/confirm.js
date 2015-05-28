/*global clipboardData,jQuery,window,$,$doc */
/*!
 * cinfirm.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

"use strict";
var $ = window.jQuery;

function onclick(e) {
    var $this = $(this);
    if (!$this.parent().attr("disabled")) {
        if (!window.confirm($this.data("message"))) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            var target = $this.data('target');
            if (target) {
                $(target).click();
            }
        }
    }


}

function init(selector) {
    $(selector).each(function() {
        $(this).off('click').click(onclick);
    });


}

var config = {
    selector: 'span[role*=confirm]',
    options: {

    }
}


function applyAll() {
    init(config.selector);

    $doc.bind("ajaxSuccess", function(e) {
        init(config.selector);
    });



}


module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
}