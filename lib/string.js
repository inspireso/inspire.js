/*!
 * submit.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

var joiner = {
    init: function(separator) {
        this.separator = separator || ',';
        return this;
    },

    join: function(object) {
        var array = $.isArray(object) ? object : [object];
        return array.join(this.separator);
    }
}
joiner.init.prototype = joiner;

window.Joiner = {
    on: function(separator) {
        return new joiner.init(separator);

    }
};

var spliter = {
    init: function(separator) {
        this.separator = separator || ',';
        return this;
    },
    split: function(sequence) {
        return sequence.split(this.separator);
    }
}
spliter.init.prototype = spliter;


window.Spliter = {
    on: function(separator) {
        return new spliter.init(separator);

    }
};