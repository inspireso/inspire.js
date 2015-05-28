/*global clipboardData,jQuery,window,$,$doc */

/*!
 * multiselect.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

"use strict";
var $ = window.jQuery;

function applyMultiSelected(selector) {
    $doc.on('change', selector, function (event) {
        var $this = $(this);
        var target = $this.data('target');
        var valueChanged = $this.data('value-changed');
        if (target) {
            var $target = $(target);
            var array = $target.data('array-value') || [];
            var val = $this.data('value')
            if ($this.prop('checked')) {
                if ($.inArray(val, array) <= 0) {
                    array.push(val);
                }
            } else {
                array.remove(val);
            }
            $target.data('array-value', array);
            $target.val(array.join(";"));
            var fnValueChanged = window[valueChanged];
            if (fnValueChanged && typeof fnValueChanged === 'function') {
                fnValueChanged(array, val);
            }
        }
    });
}

function init(selector) {
    $(selector).each(function () {
        var $this = $(this);
        if ($this.val()) {
            $this.data('array-value', $this.val().split(';'));
        }
    });
}

var config = {
    selector:'input:checkbox[role*=multi-select]',
    targetSelector :'input[role*=multi-select-target]',
    options: {

    }
}


function applyAll() {
    applyMultiSelected(config.selector);

    init(config.targetSelector);
    $doc.bind('ajaxSuccess', function (e) {
        init(config.targetSelector);
    });
}


module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
};