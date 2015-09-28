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
require('tablesorter-widesign');

var $ = window.jQuery;
var config = {
    selector: 'table',
    options: {
        sortable: {
            cssHeader: 'table-header',
            widthFixed: true
        },
        dragable: {
            clickDelay: 200
        },
        view: {}

    }
};

function computeTableHeaderCellIndexes(t) {
    var matrix = [];
    var lookup = {};
    var thead = t.getElementsByTagName('THEAD')[0];
    var trs = thead.getElementsByTagName('TR');

    for (var i = 0; i < trs.length; i++) {
        var cells = trs[i].cells;
        for (var j = 0; j < cells.length; j++) {
            var c = cells[j];

            var rowIndex = c.parentNode.rowIndex;
            var cellId = rowIndex + "-" + c.cellIndex;
            var rowSpan = c.rowSpan || 1;
            var colSpan = c.colSpan || 1
            var firstAvailCol;
            if (typeof (matrix[rowIndex]) == "undefined") {
                matrix[rowIndex] = [];
            }
            // Find first available column in the first row
            for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                if (typeof (matrix[rowIndex][k]) == "undefined") {
                    firstAvailCol = k;
                    break;
                }
            }
            lookup[cellId] = firstAvailCol;
            for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                if (typeof (matrix[k]) == "undefined") {
                    matrix[k] = [];
                }
                var matrixrow = matrix[k];
                for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                    matrixrow[l] = "x";
                }
            }
        }
    }
    return lookup;
};


/**
 * 锁定表头和列
 * @param tableId 要锁定的Table的ID
 * @param fixColumnNumber  要锁定列的个数
 * @param width 显示的宽度
 * @param height 显示的高度
 * @constructor
 */
function view(tableId, fixColumnNumber, width, height) {
    var tableSelector = "#" + tableId;
    var tableLayoutId = tableId + "_tableLayout";
    var tableLayoutSelector = "#" + tableLayoutId;

    var tableFixId = tableId + "_tableFix";
    var tableFixSelector = "#" + tableFixId;

    var tableHeadId = tableId + "_tableHead";
    var tableHeadSelector = "#" + tableHeadId;

    var tableColumnId = tableId + "_tableColumn";
    var tableColumnSelector = "#" + tableColumnId;

    var tableDataId = tableId + "_tableData";
    var tableDataSelector = "#" + tableDataId;

    var $table = $(tableSelector);
    var $tableLayout = $(tableLayoutSelector);
    if ($tableLayout.length != 0) {
        $tableLayout.before($(tableSelector));
        $tableLayout.empty();
    }
    else {
        $table.after("<div id='" + tableId + "_tableLayout' style='overflow:hidden;height:" + height + "px; width:" + width + "px;'></div>");
    }

    $('<div id="' + tableFixId + '"></div>'
        + '<div id="' + tableHeadId + '"></div>'
        + '<div id="' + tableColumnId + '"></div>'
        + '<div id="' + tableDataId + '"></div>'
        ).appendTo(tableLayoutSelector);


    var $tableFixDiv = $(tableFixSelector);
    var $tableHeadDiv = $(tableHeadSelector);
    var $tableColumnDiv = $(tableColumnSelector);
    var $tableDataDiv = $(tableDataSelector);

    var tableFixClone = $table.clone(true);
    tableFixClone.attr("id", tableId + "_tableFixClone");
    $tableFixDiv.append(tableFixClone);

    var tableHeadClone = $table.clone(true);
    tableHeadClone.attr("id", tableId + "_tableHeadClone");
    $tableHeadDiv.append(tableHeadClone);

    var tableColumnClone = $table.clone(true);
    tableColumnClone.attr("id", tableId + "_tableColumnClone");
    $tableColumnDiv.append(tableColumnClone);

    $tableDataDiv.append($table);

    $(tableLayoutSelector + " table").each(function () {
        $(this).css("margin", "0");
    });


    var headHeight = $(tableHeadSelector + " thead").height();
    headHeight += 2;
    $tableHeadDiv.css("height", headHeight);
    $tableFixDiv.css("height", headHeight);


    var columnsNumber = 0;
    var columnsWidth = 0;
    var fixColumn = $(tableColumnSelector + " tr:last td:lt(" + fixColumnNumber + ")");
    if (fixColumn.length < 1) {
        fixColumn = $(tableColumnSelector + " tr:last th:lt(" + fixColumnNumber + ")");
    }
    fixColumn.each(function () {
        columnsWidth += $(this).outerWidth(true);
        columnsNumber++;
    });
    columnsWidth += 2;
    if ($.browser.msie) {
        switch ($.browser.version) {
            case "7.0":
                if (columnsNumber >= 3) columnsWidth--;
                break;
            case "8.0":
                if (columnsNumber >= 2) columnsWidth--;
                break;
        }
    }

    $tableColumnDiv.css("width", columnsWidth);
    $tableFixDiv.css("width", columnsWidth);


    $tableDataDiv.scroll(function () {
        $tableHeadDiv.scrollLeft($(tableDataSelector).scrollLeft());
        $tableColumnDiv.scrollTop($(tableDataSelector).scrollTop());
    });

    $tableFixDiv.css({
        "overflow": "hidden",
        "position": "relative",
        "z-index": "50",
        "background-color": "Silver"
    });
    $tableHeadDiv.css({
        "overflow": "hidden",
        "width": width - 17,
        "position": "relative",
        "z-index": "45",
        "background-color": "Silver"
    });
    $tableColumnDiv.css({
        "overflow": "hidden",
        "height": height - 17,
        "position": "relative",
        "z-index": "40",
        "background-color": "Silver"
    });
    $tableDataDiv.css({
        "overflow": "scroll",
        "width": width,
        //"width": "100%",
        "height": height,
        "position": "relative",
        "z-index": "35"
    });

    if ($tableHeadDiv.width() > $(tableColumnSelector + " table").width()) {
        $(tableFixSelector + " table").css("width", $(tableHeadSelector).width());
        $(tableHeadSelector + " table").css("width", $(tableHeadSelector).width());
        $(tableColumnSelector + " table").css("width", $(tableHeadSelector).width());
        $(tableDataSelector + " table").css("width", $(tableHeadSelector).width());
    }
    if ($tableColumnDiv.height() > $(tableColumnSelector + " table").height()) {
        $(tableColumnSelector + " table").css("height", $(tableColumnSelector).height());
        $(tableDataSelector + " table").css("height", $(tableColumnSelector).height());
    }

    var tableLayoutOffset = $(tableLayoutSelector).offset();
    $tableFixDiv.offset(tableLayoutOffset);
    $tableHeadDiv.offset(tableLayoutOffset);
    $tableColumnDiv.offset(tableLayoutOffset);
    $tableDataDiv.offset(tableLayoutOffset);

    var sortConfig = $table.data("tablesorter");
    if ($table.hasClass("sortable")) {
        var $headers = $("thead th", tableHeadClone);

        var sortCss = [sortConfig.cssDesc, sortConfig.cssAsc];
        var header_index = computeTableHeaderCellIndexes(tableHeadClone[0]);
        $headers.click(function (e) {
            var $this = $(this);
            var totalRows = ($table[0] && $table[0].tBodies[0] && $table[0].tBodies[0].rows.length) || 0;
            if (!this.sortDisabled && totalRows > 0) {
                var sortList = [];
                this.order = $this.hasClass(sortConfig.cssDesc) ? 0 : 1;
                $headers.removeClass(sortCss[0]).removeClass(sortCss[1]);
                $this.addClass(sortCss[(this.order + 1) % 2]);
                var i = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
                sortList.push([i, this.order]);
                $table.trigger("sorton", [sortList]);//触发排序
            }
            return false;
        });
    }

};

$.fn.extend({
    tableview: function (options) {
        return this.each(function (index, table) {
            view(table.id, 1, $(table).width(), 450);
        });
    }
});

function init(table, options) {
    var $table = $(table);
    var ops = $.extend({}, config.options, options);
    ops = $.extend(ops, $table.data('option'))

    $table.each(function (index, table) {
        var $this = $(this);
        $this.find('thead th').each(function (index, element) {
            var $th = $(element)
            if ($th.text() === '操作' || $th.text() === '操 作' || $th.find('input[type=checkbox]').length > 0 || $th.find('div:contains("操作")').length > 0 || $th.find('div:contains("操 作")').length > 0) {
                $th.addClass('{sorter: false}');
            }
        });
        $this.tablesorter(ops.sortable);
        $this.tableview(ops.view);
    });

};


function applyAll() {
    var $table = $(config.selector);
    if ($table.length <= 0) {
        return;
    }
    init($table);

    $doc.ajaxSuccess(function (event, xhr, settings) {
        $table = $(config.selector);
        if ($table.length <= 0) {
            return;
        }

        init($table);
    });
};

module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
};

