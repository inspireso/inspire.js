/*global clipboardData,jQuery,window,$,$doc */

/*!
 * table.js
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
    selector: 'table.sortable',
    options: {
        cssHeader: 'table-header'
    }
}

function init(table, options) {
    var $table = $(table);
    var ops = $.extend({}, config.options, options);

    $table.find('thead th').each(function(index, element) {
        var $th = $(element)
        if ($th.text() === '操作' || $th.text() === '操 作' || $th.find('input[type=checkbox]').length > 0 || $th.find('div:contains("操作")').length > 0 || $th.find('div:contains("操 作")').length > 0) {
            $th.addClass('{sorter: false}');
        }
    });

    $table.tablesorter(
        $.extend(ops, $table.data('option'))
    );


}

function applyAll() {
    var $table = $(config.selector);
    if ($table.length <= 0 || !$table.tablesorter) {
        return;
    }

    $table.each(function(index, el) {
        init(el);
    })

    $doc.bind('ajaxSuccess', function(e) {
        $table = $(config.selector);
        if ($table.length <= 0 || !$table.tablesorter) {
            return;
        }

        $table.each(function(index, el) {
            init(el);
        })
    });

}

module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
};