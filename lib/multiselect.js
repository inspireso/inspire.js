'use strict'
/*!
 * multiselect.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

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

function applyAll() {
    applyMultiSelected('input:checkbox[role*=multi-select]');

    var selecter = 'input[role*=multi-select-target]';
    init(selecter);

    $doc.bind('ajaxSuccess', function (e) {
        init(selecter);
    });
}

applyAll();