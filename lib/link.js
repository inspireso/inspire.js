/*global clipboardData,jQuery,window,$,$doc */

/*!
 * link.js
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
    $(selector).each(function () {
        var $this = $(this);
        $this.unbind('click');
        $this[$this.hasClass('disabled') ? 'unbind' : 'bind']('click', function (e) {
            $($(this).data('target')).click();
        });
    });
}

var config = {
    selector: '[role*=button]',
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