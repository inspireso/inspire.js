/*!
 * roles.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;
var tipPlacement = 'right';

var validators = {
    "number": {
        "pattern": "^[0-9]*$",
        "placeholder": "请输入正确数字"
    },
    "positive-integer": {
        "pattern": "^\\+?[1-9][0-9]*$",
        "placeholder": "请输入正确的正整数"
    },
    "email": {
        "pattern": "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?",
        "placeholder": "example@example.com"
    },
    "url": {
        "pattern": "[a-zA-z]+://[^\s]*",
        "placeholder": "http://example.com"
    },
    "website": {
        "pattern": "^\\s*((([a-zA-z]+://)(www\\.))|([a-zA-z]+://)|(www\\.))\\w+\\.\\w{2,}\\s*$",
        "placeholder": "http://example.com"
    },
    "tel": {
        "pattern": '(^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)|(^86((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)|(^\\+86((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)',
        "placeholder": "0592-8888888 | 13588888888"
    },
    // "tel": {
    //     "pattern": '(^*$)',
    //     "placeholder": null
    // },
    "mobile": {
        "pattern": "1\\d{10}",
        "placeholder": "13588888888"
    },
    "zipcode": {
        "pattern": "[1-9]\\d{5}(?!\\d)",
        "placeholder": "请输入正确的邮编"
    },
    "idc": {
        "pattern": "\\d{15}|\\d{18}",
        "placeholder": "请输入正确的身份证"
    },
    "ip": {
        "pattern": "((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)",
        "placeholder": "请输入正确的IP,如192.168.1.1"
    },
    "datetime": {
        "pattern": "^((?!0000)[0-9]{4}\\-((0[1-9]|1[0-2])\\-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)\\-02\\-29)(\\s)*((([0-1]?[0-9])|([2][0-3]))\\:([0-5]?[0-9])(\\:([0-5]?[0-9]))?)?$",
        "placeholder": "(2013-01-01)或(2013-01-01 11:26:00)"
    },
    // "datetime": {
    //     "pattern": "^*$",
    //     "placeholder": null
    // },
    "tsrn": {
        "pattern": "^[\\d|X|x]{15}$"
    },
    "passwd": {
        "pattern": "^[\\w\\W]{6,}$",
        "placeholder": "建议密码大于6位"
    },
    "account": {
        "pattern": "^[A-Za-z0-9]+$"
    },
    "money": {
        "pattern": "^[0-9]+(.[0-9]{2})?$"
    },

};

function onblur(e) {
    var $this = $(this);
    var pattern = $this.attr('pattern');
    if (pattern) {
        var reg = new RegExp(pattern);
        if (!reg.test($this.val())) {
            var help = $this.nextAll().filter('span.help-inline');
            var title = $this.data('title') || help.text() || $this.attr('placeholder') || '格式不正确';
            $this.data('title', title);
            $this.data('placement') || $this.data('placement', tipPlacement);
            $this.data('trigger') || $this.data('trigger', 'manual');
            $this.tooltip('show');
            if ($this.attr('force'))
                $this.focus();

        } else {
            $this.tooltip('hide');
        }
    }
};

function init(selector) {
    $(selector).each(function() {
        var $this = $(this);
        var validator = validators[$this.attr('role')];
        if (validator && ($this.attr('type') != $this.attr('role'))) {
            if (validator.pattern)
                $this.attr('pattern', validator.pattern);
            if (validator.placeholder)
                $this.attr('placeholder', validator.placeholder);
        }
    });
    $('form').each(function() {
        $(this).attr('novalidate', 'novalidate');
    })

};

function applyAll() {
    init('input[role]:visible');
    $doc.bind('ajaxSuccess', function(e) {
        init('input[role]:visible');
    });
    $doc.on('blur', 'input[role]:visible', onblur);
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll,
    validators: validators
};