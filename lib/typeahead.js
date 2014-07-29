/*!
 * typeahead.js
 *
 * https://www.github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
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
        $.post(source, {
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
            $.post(updater, {
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
    var selector = 'input[role=typeahead]:visible';
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