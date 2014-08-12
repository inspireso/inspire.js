define("inspire-js/1.0.1/index", ["inspire-js/1.0.1/lib/submit","inspire-js/1.0.1/lib/checkbox","inspire-js/1.0.1/lib/confirm","inspire-js/1.0.1/lib/jump","inspire-js/1.0.1/lib/link","inspire-js/1.0.1/lib/money","inspire-js/1.0.1/lib/number","inspire-js/1.0.1/lib/pagination","inspire-js/1.0.1/lib/required","inspire-js/1.0.1/lib/roles","inspire-js/1.0.1/lib/trim","inspire-js/1.0.1/lib/validity","inspire-js/1.0.1/lib/dialog","inspire-js/1.0.1/lib/async","inspire-js/1.0.1/lib/typeahead","inspire-js/1.0.1/lib/messenger"], function(require, exports, module){
var $ = window.jQuery;

if (!window.$doc) {
    window.$doc = $(document);
}

exports = module.exports;

exports.submit = require("inspire-js/1.0.1/lib/submit");
exports.checkbox = require("inspire-js/1.0.1/lib/checkbox");
exports.checkbox = require("inspire-js/1.0.1/lib/confirm");
exports.jump = require("inspire-js/1.0.1/lib/jump");
exports.link = require("inspire-js/1.0.1/lib/link");
exports.money = require("inspire-js/1.0.1/lib/money");
exports.number = require("inspire-js/1.0.1/lib/number");
exports.pagination = require("inspire-js/1.0.1/lib/pagination");
exports.required = require("inspire-js/1.0.1/lib/required");
exports.roles = require("inspire-js/1.0.1/lib/roles");
exports.submit = require("inspire-js/1.0.1/lib/submit");
exports.trim = require("inspire-js/1.0.1/lib/trim");
exports.validity = require("inspire-js/1.0.1/lib/validity");
exports.dialog = require("inspire-js/1.0.1/lib/dialog");
exports.async = require("inspire-js/1.0.1/lib/async");
exports.typeahead = require("inspire-js/1.0.1/lib/typeahead");
exports.messenger = require("inspire-js/1.0.1/lib/messenger");
});
define("inspire-js/1.0.1/lib/submit", [], function(require, exports, module){
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

$doc.on('click', ':submit', function(e) {
    var $this = $(this);
    var $form = $this.parents("form");
    if ($form.length == 1) {
        e.preventDefault();
        e.stopPropagation();
        $this.attr("disabled", "disabled");
        $form.submit();
    }
});
});
define("inspire-js/1.0.1/lib/checkbox", [], function(require, exports, module){
/*!
 * checkbox.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function applyTableSelected(selector) {
    $doc.on('change', selector, function(event) {
        var $this = $(this);
        var target = $this.data('target');
        var valueChanged = $this.data('value-changed');
        if (target) {
            var val = $(target).val();
            var tr = $this.parents('tr');
            if ($this.prop('checked')) {
                var id = $this.attr('id')
                if (val.indexOf(id) < 0) {
                    val = id + ';' + val;
                }
                tr.addClass('info');
            } else {
                val = val.replace($this.attr('id') + ';', '').replace($this.attr('id'), '');
                tr.removeClass('info');
            }
            $(target).val(val);
            var fnValueChanged = window[valueChanged];
            if (fnValueChanged && typeof fnValueChanged == 'function') {
                fnValueChanged(val);
            }
        }
    });
}

function applyTableSelectedAll(selector) {
    $doc.on('change', selector, function(event) {
        var $this = $(this);
        var $table = $this.parents('table');
        if ($table) {
            $table.children('tbody')
                .find('input:checkbox[role=table-selected]')
                .prop('checked', $this.prop('checked') || false)
                .trigger('change');
        }
    });
}

function applyAll() {
    applyTableSelected('input:checkbox[role=table-selected]');
    applyTableSelectedAll('input:checkbox[role=table-selected-all]');

}

applyAll();
});
define("inspire-js/1.0.1/lib/confirm", [], function(require, exports, module){
/*!
 * cinfirm.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function onclick(e) {
    var $this = $(this);
    if (!$this.parent().attr("disabled")) {
        if (!window.confirm($this.data("message"))) {
            e.preventDefault();
            e.stopPropagation();
        }
    }


};

function init(selector) {
    $(selector).each(function() {
        $(this).unbind('click').click(onclick);
    });


};


function applyAll() {
    init("span[role=confirm]");
    $doc.bind("ajaxSuccess", function(e) {
        init("span[role=confirm]");
    });
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
}
});
define("inspire-js/1.0.1/lib/jump", [], function(require, exports, module){
/*!
 * jump.js
 * Tested in IE 10, Chrome 27
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 * Example:
 *  <div data-target="${successBackUrl}"
 *       data-timeout="3"
 *       role="jump" >
 *       3秒后 ... 当前还剩<span class="num" />秒
 *  </div>
 *
 */


var $ = window.jQuery;

function jump($jump, count) {
    window.setTimeout(function() {
        count = count - 1;
        if (count > 0) {
            $jump.children('.js-num').text(count);
            jump($jump, count);
        } else {
            location.href = $jump.data('target');
        }
    }, 1000);
};

function init(selector) {
    var $jump = $(selector).first();
    if ($jump.size() > 0) {
        $jump.children('.js-num').text($jump.data('timeout'));
        $(document).ready(function() {
            jump($jump, $jump.data('timeout'));
        })
    }
}

function applyAll() {
    init('div[role=jump]');
    $doc.bind('ajaxSuccess', function(e) {
        init('div[role=jump]');
    });
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
}
});
define("inspire-js/1.0.1/lib/link", [], function(require, exports, module){
/*!
 * link.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function init(selector) {
    $(selector).each(function() {
        var $this = $(this);
        $this.unbind('click');
        $this[$this.hasClass('disabled') ? 'unbind' : 'bind']('click', function(e) {
            $($(this).data('target')).click();
        });
    });
}

function applyAll() {
    $doc.bind("ajaxSuccess", function(e) {
        init("[role=button]");
    });
}

applyAll();

module.exports = init;
});
define("inspire-js/1.0.1/lib/money", ["inspire-js/1.0.1/lib/number"], function(require, exports, module){
/*!
 * nomey.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;
var number = require("inspire-js/1.0.1/lib/number");

function onblur() {
    this.value = format(this.value);
};

function onpaste() {
    var text = clipboardData.getData('text');
    if (valid(text)) {
        clipboardData.setData('text', text);
    } else {
        return false;
    }
}; // 禁止粘贴1.Float64Array();

function valid(txt) {
    var i = 0;
    var len = txt.length;
    for (i = 0; i < len; i++) {
        var checkTxt = txt.charCodeAt(i); // 使用charCodeAt方法，方法可返回指定位置的字符的
        // Unicode 编码。这个返回值是 0 - 65535
        // 之间的整数。
        if (checkTxt == 37 || checkTxt == 8 || checkTxt == 39 || checkTxt == 46 || checkTxt == 190 || checkTxt == 110 || (checkTxt >= 48 && checkTxt <= 57) || (checkTxt >= 96 && checkTxt <= 105)) {
            continue;
        } else {
            return false;
        }
    }
    return true;
};

function format(num) {
    if (/[^0-9\.]/.test(num)) {
        return num;
    }
    num = num.replace(/^(\d*)$/, '$1.');
    num = (num + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    num = num.replace('.', ',');
    var re = /(\d)(\d{3},)/;
    while (re.test(num)) {
        num = num.replace(re, '$1,$2');
    }
    num = num.replace(/,(\d\d)$/, '.$1');
    return num.replace(/^\./, '0.')
};

function init(selector) {
    number.init(selector);
    $doc.on('blur', selector, onblur);
    $doc.on('paste', selector, onpaste);
};

function applyAll() {
    init('input[role=money]:visible');
};

applyAll();


module.exports = {
    init: init,
    applyAll: applyAll
};
});
define("inspire-js/1.0.1/lib/number", [], function(require, exports, module){
/*!
 * number.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function onkeydown() {
    if (event.keyCode == 37 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 || event.keyCode == 110 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {

    } else {
        return false;
    }
};

function init(selector) {
    $doc.on('keydown', selector, onkeydown);
};


function applyAll() {
    init('input[role=number]:visible');
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
};
});
define("inspire-js/1.0.1/lib/pagination", [], function(require, exports, module){
/*!
 * pagination.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function format(formatted, tokens) {
    for (var token in tokens)
        if (tokens.hasOwnProperty(token))
            formatted = formatted.replace(RegExp('{' + token + '}', 'g'), tokens[token]);
    return formatted;
};

function refresh($pagination) {
    var target = $pagination.data('target');
    var $target = $(target);
    if ($target && $target.size() > 0) {
        var offset = $target.data('offset');
        var limit = $target.data('limit');
        var total = $target.data('total');
        var $label = $pagination; //.siblings('#pagination-label');
        $label.text(
            format($label.data('text-format'), {
                'offset': offset,
                'limit': limit,
                'total': total
            }));

        var $previous = $pagination.parent().parent().find('#pagination-previous-link');
        var $next = $pagination.parent().parent().find('#pagination-next-link');

        // var $previous = $pagination.siblings('#pagination-previous-link');
        // var $next = $pagination.siblings('#pagination-next-link');
        $previous[(offset <= 1) ? 'addClass' : 'removeClass']('disabled');
        $next[(limit === total) ? 'addClass' : 'removeClass']('disabled');

        $previous.unbind('click');
        if (offset > 1) {
            $previous.bind('click', function(event) {
                return $($previous.data('target') || $target.data('previous')).click();
            });
        }

        $next.unbind('click');
        if (limit != total) {
            $next.bind('click', function(event) {
                return $($next.data('target') || $target.data('next')).click();
            });
        }

    };
}

function init(selector) {
    var $pagination = $(selector);
    if ($pagination.size() < 1 || $pagination.data('pending')) {
        return;
    }
    $pagination.data('pending', true);

    refresh($pagination);

    $pagination.removeData('pending');

}

function applyAll() {
    init('#pagination');
    $doc.bind('ajaxSuccess', function(e) {
        init('#pagination');
    });

};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
};
});
define("inspire-js/1.0.1/lib/required", [], function(require, exports, module){
/*!
 * required.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;
var tipPlacement = 'right';


function onblur(e) {
    var $this = $(this);
    if ($this.val().length < 1) {
        $this.tooltip('show');
    } else {
        $this.tooltip('hide');
    }
};

function init(selector) {
    $(selector).each(function() {
        var $this = $(this);
        var help = $this.nextAll().filter('span.help-inline');
        var title = $this.data('title') || help.text() || '此字段必须填写';

        var options = {
            'placement': tipPlacement,
            'trigger': 'manual',
            'title': title
        };
        $this.tooltip(options);
    });

};


function applyAll() {
    var selector = 'input[required]:not(input[role]):visible';

    init(selector);
    $doc.bind('ajaxSuccess', function(e) {
        init(selector);
    });
    $doc.on('blur', selector, onblur);
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
};
});
define("inspire-js/1.0.1/lib/roles", [], function(require, exports, module){
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
    "decimal": {
        "pattern": "^-?[0-9]+(.[0-9]{2})?$"
    },

};

function onblur(e) {
    var $this = $(this);
    var roles = $this.attr('role') + ''.split(',');
    for (int i = 0; i < roles.length; i++) {
        var validator = validators[roles[i]];
        // var pattern = $this.attr('pattern');
        var pattern = validator.pattern;
        if (pattern) {
            var reg = new RegExp(pattern);
            if (!reg.test($this.val())) {
                var help = $this.nextAll().filter('span.help-inline');
                var title = $this.data('title') || help.text() || $this.attr('placeholder') || validator.placeholder || '格式不正确';
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
    }
};

function init(selector) {
    // $(selector).each(function() {
    //     var $this = $(this);
    //     var roles = $this.attr('role') + ''.split(',');
    //     for (int i = 0; i < roles.length; i++) {
    //         var validator = validators[$this.attr('role')];
    //         if (validator && ($this.attr('type') != $this.attr('role'))) {
    //             if (validator.pattern)
    //                 $this.attr('pattern', validator.pattern);
    //             if (validator.placeholder)
    //                 $this.attr('placeholder', validator.placeholder);
    //         }
    //     }
    // });
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
});
define("inspire-js/1.0.1/lib/trim", [], function(require, exports, module){
/*!
 * tirm.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function onblur() {
    var $this = $(this);
    $this.val($.trim($this.val()));
};

// function onpaste() {
//     var text = clipboardData.getData("text");
//     clipboardData.setData("text", $.trim(text));
// }; // 禁止粘贴1.Float64Array();

function applyAll() {
    $doc.on('blur', ':text', onblur);
    // $doc.on("paste", ":text", onpaste);
    $doc.on('blur', ':password', onblur);
    // $doc.on("paste", ":password", onpaste);
};

applyAll();

module.exports = {
    applyAll: applyAll
};
});
define("inspire-js/1.0.1/lib/validity", [], function(require, exports, module){
/*!
 * vaildity.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function init(selector) {
    $(selector).each(function() {
        if (this.setCustomValidity) {
            this.setCustomValidity($(this).data('title'));
        }
    });
};

function applyAll() {
    init('input[data-title]');
    $doc.bind('ajaxSuccess', function(e) {
        init('input[data-title]:visible');
    });

};


applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
};
});
define("inspire-js/1.0.1/lib/dialog", [], function(require, exports, module){
/*!
 * dialog.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */
var $ = window.jQuery;

function init(selector, ignoreHidden) {
    var $dialog = $(selector);
    var hidden = !ignoreHidden && $dialog.is(':hidden');
    if ($dialog.length > 0 && !hidden) {
        $dialog.modal({
            'backdrop': false
        });
    }


};

function applyAll() {
    init('div[role=dialog]', false);
    init('div[role=cdialog]', true);
    $doc.bind('ajaxSuccess', function(e) {
        init('div[role=dialog]', false);
        init('div[role=cdialog]', true);
    });
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
}
});
define("inspire-js/1.0.1/lib/async", [], function(require, exports, module){
/*!
 * async.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */


var $ = window.jQuery;

var READY_STATE_RE = /^(?:loaded|complete|undefined)$/;
var IS_CSS_RE = /\.(?:(css|gzcss))(?:\?|$)/i;

var node = document.getElementById('inspnode');
var debug = node.getAttribute('debug') === 'true' || false;

var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
};

var async = function(urls, callback) {
    if (!isArray(urls))
        urls = [urls];

    var head = document.getElementsByTagName('head')[0] || doc.documentElement;
    var len = urls.length - 1;

    for (var i = 0; i <= len; i++) {
        var url = urls[i];
        var isCSS = IS_CSS_RE.test(url)
        var node = document.createElement(isCSS ? 'link' : 'script')

        if ((len == i) && (typeof callback == 'function')) {
            node.onload = node.onerror = node.onreadystatechange = function() {
                if (READY_STATE_RE.test(node.readyState)) {
                    // Ensure only run once and handle memory leak in IE
                    node.onload = node.onerror = node.onreadystatechange = null;
                    // Remove the script to reduce memory leak
                    if (!isCSS) {
                        head.removeChild(node)
                    }
                    // Dereference the node
                    node = null;
                    callback();
                }
            }
        }
        if (isCSS) {
            node.rel = 'stylesheet';
            node.href = url;
        } else {
            node.async = true;
            node.src = url;
        }
        head.appendChild(node);
    }
};

function init(tagName) {
    var els = document.getElementsByTagName(tagName);
    if (els.length > 0) {
        var requires = [];
        for (var i = 0; i < els.length; i++) {
            var src = els[i].getAttribute('src');
            //如果是生产环境，会默认压缩成.min.js|.min.css文件，所以在这边统一替换
            // if (!debug) {
            //     src = src.replace('.js', '.min.js').replace('.css', '.min.css');
            // }
            requires[i] = src;

        }
        async(requires);
    }
};

function applyAll() {
    init('require');
    $doc.bind('ajaxSuccess', function(e) {
        init('require');
    });
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll,
    async: async
};
});
define("inspire-js/1.0.1/lib/typeahead", [], function(require, exports, module){
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
});
define("inspire-js/1.0.1/lib/messenger", [], function(require, exports, module){
/*!
 * messenger.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

function config() {
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
        theme: 'future'
    };

}

function init(selector) {
    var $messenger = $(selector);
    var message = $messenger.data('message');
    var target = $messenger.data('target');
    var label = $messenger.data('label');
    var messenger = Messenger().post({
        message: message,
        type: 'info',
        actions: {
            run: {
                label: label,
                action: function() {
                    location.href = target;
                }
            },

            cancel: {
                label: '取消',
                action: function() {
                    return messenger.cancel();
                }
            }
        }
    });
}

function applyAll() {
    var selector = 'div[role=messenger]';
    var $messenger = $(selector);
    if ($messenger.length == 0 || $messenger.attr('disabled')) {
        return;
    }

    init(selector);

};

if (typeof Messenger != "undefined") {
    config();
    applyAll();
}


module.exports = {
    init: init,
    applyAll: applyAll
};
});
