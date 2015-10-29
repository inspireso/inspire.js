/*global clipboardData,jQuery,window,$,$doc */

/*!
 * typeahead.js
 *
 * https://www.github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 * Example:
 *     input: <input id="typeahead-input"
 *                     role="typeahead"
 *                     data-source="url or function, return [{"name":"display name", "value":"val1"},...]"
 *                     data-params="parameters with source"
 *                     data-updater="url or function"/>
 *     data-source:获取数据的URL或者自定义js函数,返回一个JSON数组即可。
 *         js函数格式:function(query, callback)
 *     data-params:获取数据传递的参数，数据类型可以是String 或者 JSON
 *     data-updater:选中某个数据项后的更新函数，也可以是一个URL，返回选中的结果。
 *
 */

"use strict";
var $ = window.jQuery;
var isFunction = function (func) {
    if ($.isFunction(func)) {
        return func;
    } else if ($.isFunction(window[func])) {
        return window[func];
    } else {
        return null;
    }
};

var fnsource = function ($element) {
    var source = $element.data("source");
    var params = $element.data("params");

    return function (query, sync, async) {
        var fn = isFunction(source);
        if (fn) {
            return fn(query, async);
        } else {
            // var url = window.location.protocol + '//' + window.location.host + '/' + source;
            var url = source.replace('//', '/');
            $.post(url, {
                "start": query,
                "params": params
            }).done(function (items) {
                items = $(items).map(function (i, item) {
                    return {
                        value: item.value,
                        name: item.name,
                        toString: function () {
                            return JSON.stringify(this);
                        }
                    };
                });
                async(items);
            });
        }
    }
};

var fnupdater = function ($element) {
    var updater = $element.data("updater");
    return function (ev, item) {
        var json = JSON.parse(item);
        if (updater) {
            var fn = isFunction(updater);
            if (fn) {
                fn(json);
            } else {
                // var url = window.location.protocol + '//' + window.location.host + '/' + updater;
                var url = updater.replace('//', '/');
                $.post(url, {
                    "item": json.value
                }).done(function (data) {
                    // alerts(data);
                });
            }

        }
        return json.name;
    }
};

function init(selector) {
    $(selector).each(function (index, element) {
        var $this = $(this);
        if (!$this.data("initialized")) {
            $this.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                    display: 'name',
                    source: fnsource($this),
                    async: true,
                    limit: 20
                });
            $this.on('typeahead:select', fnupdater($this));
            $this.data('initialized', true);
        }
    })

};

var config = {
    selector: 'input[role*=typeahead]:not(.tt-hint)',
    options: {}
};

function applyAll() {
    var $selector = $(config.selector);
    if ($selector.length === 0 || $selector["typeahead"] === "undefined") {
        return;
    }
    init($selector);

    $doc.ajaxSuccess(function (event, xhr, settings) {
        init(config.selector);
    });
};

module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
};