/*global clipboardData,jQuery,window,$,$doc */

/*!
 * required.js
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
    selector: 'input[required]:not(input[role])',
    options: {
        'placement': 'right',
        'trigger': 'manual',
    }
}

function onblur(e) {
    var $this = $(this);
    if ($this.val().length < 1) {
        $this.tooltip('show');
    } else {
        $this.tooltip('hide');
    }
}

function init(selector, options) {
    $(selector).each(function () {
        var $this = $(this);
        var help = $this.nextAll().filter('span.help-inline');
        var title = $this.data('title') || help.text() || '此字段必须填写';
        var ops = $.extend({}, config.options, options, {
            'title': title
        });
        $this.tooltip(ops);
    });

}


function applyAll() {
    init(config.selector);
    $doc.ajaxSuccess(function (event, xhr, settings) {
        init(config.selector);
    });
    $doc.on('blur', config.selector, onblur);
}

module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
};