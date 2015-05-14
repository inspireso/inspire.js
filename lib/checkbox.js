'use strict'

/*!
 * checkbox.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function applyTableSelected(selector) {
    $doc.on('change', selector, function (event) {
        var $this = $(this);
        var target = $this.data('target');
        var valueChanged = $this.data('value-changed');
        if (target) {
            var val = $(target).val();
            var tr = $this.parents('tr');
            if ($this.prop('checked')) {
                var id = $this.attr('id');
                if (val.indexOf(id) < 0) {
                    val = id + ';' + val;
                }
                tr.addClass('info');
            } else {
                val = val.replace($this.attr('id') + ';', '').replace($this.attr('id'), '');
                tr.removeClass('info');
            }
            $(target).val(val);
            var fnValueChanged = window[valueChanged];
            if (fnValueChanged && typeof fnValueChanged === 'function') {
                fnValueChanged(val);
            }
        }
    });
}

function applyTableSelectedAll(selector) {
    $doc.on('change', selector, function (event) {
        var $this = $(this);
        var $table = $this.parents('table');
        if ($table) {
            $table.children('tbody')
                .find('input:checkbox[role=table-selected]')
                .prop('checked', $this.prop('checked') || false)
                .trigger('change');
        }
    });
}

function applyAll() {
    applyTableSelected('input:checkbox[role*=table-selected]');
    applyTableSelectedAll('input:checkbox[role*=table-selected-all]');

}

applyAll();