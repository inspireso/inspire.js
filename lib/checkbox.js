/*!
 * checkbox.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */
define(function(require, exports, module) {

    var $ = window.jQuery;

    function applyTableSelected(selector) {
        $doc.on('change', selector, function(event) {
            var $this = $(this);
            var target = $this.data('target');
            if (target) {
                var val = $(target).val();
                var tr = $this.parents('tr');
                if ($this.attr('checked')) {
                    val = $this.attr('id') + ';' + val;
                    tr.addClass('info');
                } else {
                    val = val.replace($this.attr('id') + ';', '');
                    tr.removeClass('info');
                }
                $(target).val(val);
            }
        });
    }

    function applyTableSelectedAll(selector) {
        $doc.on('change', selector, function(event) {
            var $this = $(this);
            var $table = $this.parents('table');
            if ($table) {
                $table.children('tbody')
                    .find('input:checkbox[role=table-selected]')
                    .attr('checked', $this.attr('checked') || false)
                    .trigger('change');
            }
        });
    }

    function applyAll() {
        applyTableSelected('input:checkbox[role=table-selected]');
        applyTableSelectedAll('input:checkbox[role=table-selected-all]');

    }

    applyAll();

});
