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

var store = require('store.js');
var $ = window.jQuery;

var config = {
    selector: 'table.dragable',
    options: {
        clickDelay: 200, //ms to wait before rendering sortable list and delegating click event

    }
}

function init(table, options) {
    var $table = $(table);
    var ops = $.extend({}, config.options, options);
    if (window.localStorage) {
        var sid = window.location.pathname + table.id;
        ops = $.extend(ops, {
            persistState: function (table) {
                table.el.find('th').each(function (i) {
                    if (this.id !== '') {
                        table.sortOrder[this.id] = i;
                    }
                });
                store.set(sid, JSON.stringify(table.sortOrder));
            },
            restoreState: eval('(' + store.get(sid) + ')')
        });
    }

    $table.dragtable(
        $.extend(ops, $table.data('option'))
        );

}

function applyAll() {
    var $table = $(config.selector);
    if ($table.length <= 0 || !$table.dragtable) {
        return;
    }
    $table.each(function (index, el) {
        init(el);
    })

    $doc.ajaxSuccess(function (event, xhr, settings) {
        $table = $(config.selector);
        if ($table.length <= 0 || !$table.dragtable) {
            return;
        }

        $table.each(function (index, el) {
            init(el);
        })
    });

}

module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
};