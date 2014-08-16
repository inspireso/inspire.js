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
var $ = window.jQuery;
var isFunction = function(func) {
    if ($.isFunction(func)) {
        return func;
    } else if ($.isFunction(window[func])) {
        return window[func];
    } else {
        return null;
    }
}
var fnsource = function(query, callback) {
    var fn = isFunction(source);
    if (fn) {
        return fn(query, callback);
    } else {
        var $this = this;
        var source = this.$element.data("source");
        var params = this.$element.data("params");
        // var url = window.location.protocol + '//' + window.location.host + '/' + source;
        var url = source.replace('//', '/');
        $.post(url, {
            "start": query,
            "params": params
        }).done(function(items) {
            items = $(items).map(function(i, item) {
                return {
                    value: item.value,
                    name: item.name,
                    toString: function() {
                        return JSON.stringify(this);
                    }
                };
            })
            return $this.render(items.slice(0, $this.options.items)).show()
        })
    }
};
var fnupdater = function(item) {
    var updater = this.$element.data("updater");
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
            }).done(function(data) {
                // alerts(data);
            });
        }

    }
    return json.name;

};

function init(selector) {
    var $selector = $(selector);
    if ($selector["typeahead"] != "undefined") {
        $selector.typeahead({
            source: fnsource,
            updater: fnupdater,
            highlighter: function(item) {
                return this.__proto__.highlighter.call(this, item.name);
            },
            matcher: function(item) {
                return this.__proto__.matcher.call(this, item.name);
            }
        });
    }
}

function applyAll() {
    var selector = 'input[role*=typeahead]:visible';
    var $selector = $(selector);
    if ($selector.length == 0 || $selector.attr('disabled') || $selector["typeahead"] == "undefined") {
        return;
    }
    init(selector);
    $doc.bind('ajaxComplete', function(e) {
        init(selector);
    });
};
applyAll();
module.exports = {
    init: init,
    applyAll: applyAll
}