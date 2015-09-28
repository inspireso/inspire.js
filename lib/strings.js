/*global clipboardData,jQuery,window,$,$doc */

/*!
 * Strings.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

"use strict";
var $ = window.jQuery;

var Joiner = {
    init: function(separator) {
        this.separator = separator || ',';
        return this;
    },

    join: function(object) {
        var array = $.isArray(object) ? object : [object];
        return array.join(this.separator);
    }
};

Joiner.init.prototype = Joiner;

window.Joiner = {
    on: function(separator) {
        return new Joiner.init(separator);
    }
};

var Spliter = {
    init: function(separator) {
        this.separator = separator || ',';
        return this;
    },
    split: function(sequence) {
        return sequence.split(this.separator);
    }
};

Spliter.init.prototype = Spliter;

window.Spliter = {
    on: function(separator) {
        return new Spliter.init(separator);

    }
};

function format(formatted, tokens) {
    for (var token in tokens) {
        if (tokens.hasOwnProperty(token)) {
            formatted = formatted.replace(RegExp('{' + token + '}', 'g'), tokens[token]);
        }
    }
    return formatted;
}

String.prototype.format = format;