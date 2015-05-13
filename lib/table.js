/*
 * Copyright (c) 2015, Inspireso and/or its affiliates. All rights reserved.
 */

'use strict'
/*!
 * table.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function init($table) {

    var option = {
        theme: 'blue'
    };
    if ($table.data('option')) {
        $.extend(option, $table.data('option'));
    }

    $table.find('thead th').each(function (index, element) {
        var $th = $(element)
        if ($th.text() === '操作'
            || $th.text() == '操 作'
            || $th.find('input[type=checkbox]').length > 0
            || $th.find('div:contains("操作")').length > 0
            || $th.find('div:contains("操 作")').length > 0
        ) {
            $th.addClass('sorter-false');
        }
    })
    //$table.addClass("tablesorter-bootstrap");

    //$table.dragtable();
    $table.tablesorter(option);


}

function applyAll() {
    var $table = $('table');
    if ($table.length > 0) {
        init($table);
    }
    $doc.bind('ajaxSuccess', function (e) {
        $table = $('table');
        if ($table.length > 0) {
            init($table);

        }
    });


}


applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
};