/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var $ = window.jQuery;

	if (!window.$doc) {
		window.$doc = $(document);
	}

	Array.prototype.remove = function(el) {
		var index = this.indexOf(el);
		return index > -1 ? this.splice(index, 1) : this;
	};


	var inspirejs = {
		version: "1.0.1"
	};

	inspirejs.string = __webpack_require__(1);

	inspirejs.submit = __webpack_require__(2);
	inspirejs.checkbox = __webpack_require__(3);
	inspirejs.multiselect = __webpack_require__(4);
	inspirejs.confirm = __webpack_require__(5);
	inspirejs.jump = __webpack_require__(6);
	inspirejs.link = __webpack_require__(7);
	inspirejs.number = __webpack_require__(8);
	inspirejs.money = __webpack_require__(9);
	inspirejs.decimal = __webpack_require__(10);
	inspirejs.pagination = __webpack_require__(11);
	inspirejs.required = __webpack_require__(12);
	inspirejs.roles = __webpack_require__(13);
	inspirejs.trim = __webpack_require__(14);
	inspirejs.stringCase = __webpack_require__(15);
	inspirejs.validity = __webpack_require__(16);
	inspirejs.dialog = __webpack_require__(17);
	inspirejs.async = __webpack_require__(18);
	inspirejs.typeahead = __webpack_require__(19);
	inspirejs.messenger = __webpack_require__(20);
	inspirejs.stopwatch = __webpack_require__(21);
	inspirejs.datetime = __webpack_require__(22);
	inspirejs.tableSortable = __webpack_require__(23);
	inspirejs.tableDragable = __webpack_require__(24);

	inspirejs.applyAll = function() {
		inspirejs.submit.applyAll();
		inspirejs.checkbox.applyAll();
		inspirejs.multiselect.applyAll();
		inspirejs.confirm.applyAll();
		inspirejs.jump.applyAll();
		inspirejs.link.applyAll();
		inspirejs.number.applyAll();
		inspirejs.money.applyAll();
		inspirejs.decimal.applyAll();
		inspirejs.pagination.applyAll();
		inspirejs.required.applyAll();
		inspirejs.roles.applyAll();
		inspirejs.trim.applyAll();
		inspirejs.stringCase.applyAll();
		inspirejs.validity.applyAll();
		inspirejs.dialog.applyAll();
		inspirejs.async.applyAll();
		inspirejs.typeahead.applyAll();
		inspirejs.messenger.applyAll();
		inspirejs.stopwatch.applyAll();
		inspirejs.datetime.applyAll();
		inspirejs.tableSortable.applyAll();
		inspirejs.tableDragable.applyAll();
	}

	module.exports = inspirejs;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

	/*!
	 * String.js
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
	};

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
	};

	spliter.init.prototype = spliter;

	window.Spliter = {
	    on: function(separator) {
	        return new spliter.init(separator);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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


	function init() {
	    function onclick(e) {
	        var $this = $(this);
	        $this.attr('disabled', 'disabled').addClass('disabled');
	    }

	    $('a[role*=once],span[role*=once]').off('click', onclick)
	    $('a[role*=once],span[role*=once]').on('click', onclick);
	}



	// $doc.on('submit', 'form', function(e) {
	//     var $form = $(this);
	//     if ($form.length == 1) {
	//         if ($form.hasClass('disabled')) {
	//             e.preventDefault();
	//             e.stopPropagation();
	//         } else {
	//             $form.addClass('disabled');
	//             $form.find(':submit').attr("disabled", "disabled");
	//         }
	//     }
	// });



	function applyAll() {
	    init();
	    $doc.bind('ajaxSuccess', function(e) {
	        init();
	    });

	    $doc.on('click', 'button[type=submit],input[type=submit]', function(e) {
	        var $this = $(this);
	        var $form = $this.parents('form');
	        if ($form.length == 1) {
	            e.preventDefault();
	            e.stopPropagation();
	            $this.attr('disabled', 'disabled').addClass('disabled');
	            $form.submit();
	        }
	    });


	    $doc.on('keypress', 'form input, form select', function(e) {
	        var $this = $(this);
	        if ($this.parents('form').find('button[type=submit].default, input[type=submit].default').length <= 0)
	            return true;

	        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
	            $this.parents('form').find('button[type=submit].default, input[type=submit].default').click();
	            return false;
	        } else {
	            return true;
	        }
	    });
	}

	module.exports = {
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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
	                var id = $this.attr('id');
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
	            if (fnValueChanged && typeof fnValueChanged === 'function') {
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

	var config = {
	    selector: 'input:checkbox[role*=table-selected]',
	    allSelector: 'input:checkbox[role*=table-selected-all]',
	    options: {

	    }
	}


	function applyAll() {
	    applyTableSelected(config.selector);
	    applyTableSelectedAll(config.alSelector);

	}

	module.exports = {
	    config: config,
	    applyAll: applyAll,
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

	/*!
	 * multiselect.js
	 *
	 * https://github.com/inspireso
	 *
	 * Copyright 2014 Inspireso and/or its affiliates.
	 * Licensed under the Apache 2.0 License.
	 *
	 */

	var $ = window.jQuery;

	function applyMultiSelected(selector) {
	    $doc.on('change', selector, function (event) {
	        var $this = $(this);
	        var target = $this.data('target');
	        var valueChanged = $this.data('value-changed');
	        if (target) {
	            var $target = $(target);
	            var array = $target.data('array-value') || [];
	            var val = $this.data('value')
	            if ($this.prop('checked')) {
	                if ($.inArray(val, array) <= 0) {
	                    array.push(val);
	                }
	            } else {
	                array.remove(val);
	            }
	            $target.data('array-value', array);
	            $target.val(array.join(";"));
	            var fnValueChanged = window[valueChanged];
	            if (fnValueChanged && typeof fnValueChanged === 'function') {
	                fnValueChanged(array, val);
	            }
	        }
	    });
	}

	function init(selector) {
	    $(selector).each(function () {
	        var $this = $(this);
	        if ($this.val()) {
	            $this.data('array-value', $this.val().split(';'));
	        }
	    });
	}

	var config = {
	    selector:'input:checkbox[role*=multi-select]',
	    targetSelector :'input[role*=multi-select-target]',
	    options: {

	    }
	}


	function applyAll() {
	    applyMultiSelected(config.selector);

	    init(config.targetSelector);
	    $doc.bind('ajaxSuccess', function (e) {
	        init(config.targetSelector);
	    });
	}


	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */
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
	        } else {
	            var target = $this.data('target');
	            if (target) {
	                $(target).click();
	            }
	        }
	    }


	}

	function init(selector) {
	    $(selector).each(function() {
	        $(this).off('click').click(onclick);
	    });


	}

	var config = {
	    selector: 'span[role*=confirm]',
	    options: {

	    }
	}


	function applyAll() {
	    init(config.selector);

	    $doc.bind("ajaxSuccess", function(e) {
	        init(selector);
	    });



	}


	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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
	            var target = $jump.data('target');
	            var fntarget = window[target];
	            if (fntarget && typeof fntarget === 'function') {
	                fntarget();
	            } else {
	                location.href = target;
	            }

	        }
	    }, 1000);
	}

	function init(selector) {
	    var $jump = $(selector).first();
	    if ($jump.size() > 0) {
	        $jump.children('.js-num').text($jump.data('timeout'));
	        $(document).ready(function() {
	            jump($jump, $jump.data('timeout'));
	        });
	    }
	}
	var config = {
	    selector: 'div[role*=jump]',
	    options: {

	    }
	}

	function applyAll() {
	    init(config.selector);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });
	}


	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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

	var config = {
	    selector: '[role*=button]',
	    options: {

	    }
	}

	function applyAll() {
	    init(config.selector);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });
	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */
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

	function onNumberKeydown(e) {
	    // Allow: backspace, delete, tab, escape, enter and .
	    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	        // Allow: Ctrl+A
	        (e.keyCode === 65 && e.ctrlKey === true) ||
	        // Allow: home, end, left, right
	        (e.keyCode >= 35 && e.keyCode <= 39)) {
	        // let it happen, don't do anything
	        return;
	    }
	    // Ensure that it is a number and stop the keypress
	    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	        e.preventDefault();
	    }
	}

	function onIntegerKeydown(e) {
	    // Allow: backspace, delete, tab, escape, enter and .
	    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
	        // Allow: Ctrl+A
	        (e.keyCode === 65 && e.ctrlKey === true) ||
	        // Allow: home, end, left, right
	        (e.keyCode >= 35 && e.keyCode <= 39)) {
	        // let it happen, don't do anything
	        return;
	    }
	    // Ensure that it is a number and stop the keypress
	    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	        e.preventDefault();
	    }
	}

	function init(selector, keydown) {
	    $doc.on('keydown', selector, keydown);
	};

	var config = {
	    numberSelector: 'input[role*=number]',
	    integerSelector: 'input[role*=integer]',
	    options: {

	    }
	}

	function applyAll() {
	    init(config.numberSelector, onNumberKeydown);
	    init(config.integerSelector, onIntegerKeydown);
	};

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll,
	    keydowns: {
	        integer: onIntegerKeydown,
	        number: onNumberKeydown
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

	/*!
	 * momey.js
	 *
	 * https://github.com/inspireso
	 *
	 * Copyright 2014 Inspireso and/or its affiliates.
	 * Licensed under the Apache 2.0 License.
	 *
	 */

	var $ = window.jQuery;
	var number = __webpack_require__(8);

	function onblur() {
	    this.value = format(this.value);
	}

	function onpaste() {
	        var text = clipboardData.getData('text');
	        if (valid(text)) {
	            clipboardData.setData('text', text);
	        } else {
	            return false;
	        }
	    } // 禁止粘贴1.Float64Array();

	function valid(txt) {
	    var i = 0;
	    var len = txt.length;
	    for (i = 0; i < len; i++) {
	        var checkTxt = txt.charCodeAt(i); // 使用charCodeAt方法，方法可返回指定位置的字符的
	        // Unicode 编码。这个返回值是 0 - 65535
	        // 之间的整数。
	        if (checkTxt === 37 || checkTxt === 8 || checkTxt === 39 || checkTxt === 46 || checkTxt === 190 || checkTxt === 110 || (checkTxt >= 48 && checkTxt <= 57) || (checkTxt >= 96 && checkTxt <= 105)) {
	            continue;
	        } else {
	            return false;
	        }
	    }
	    return true;
	}

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
	}

	function init(selector) {
	    number.init(selector, number.keydowns.number);
	    $doc.on('blur', selector, onblur);
	    $doc.on('paste', selector, onpaste);
	}

	var config = {
	    selector: 'input[role*=money]',
	    options: {

	    }
	}


	function applyAll() {
	    init(config.selector);
	}


	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

	/*!
	 * decimal.js
	 *
	 * https://github.com/inspireso
	 *
	 * Copyright 2014 Inspireso and/or its affiliates.
	 * Licensed under the Apache 2.0 License.
	 *
	 */

	var $ = window.jQuery;

	function onkeydown(e) {
	    // Allow: backspace, delete, tab, escape, enter and .
	    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	        // Allow: Ctrl+A
	        (e.keyCode === 65 && e.ctrlKey === true) ||
	        // Allow: home, end, left, right
	        (e.keyCode >= 35 && e.keyCode <= 39)) {
	        // let it happen, don't do anything
	        return;
	    }
	    // Ensure that it is a number and stop the keypress
	    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	        e.preventDefault();
	    }
	}


	function onblur() {
	    var $this = $(this);
	    var scale = $this.attr('scale');
	    this.value = format(this.value, scale);
	}

	function onpaste() {
	        var text = clipboardData.getData('text');
	        if (valid(text)) {
	            clipboardData.setData('text', text);
	        } else {
	            return false;
	        }
	    } // 禁止粘贴1.Float64Array();

	function valid(txt) {
	    var i = 0;
	    var len = txt.length;
	    for (i = 0; i < len; i++) {
	        var checkTxt = txt.charCodeAt(i); // 使用charCodeAt方法，方法可返回指定位置的字符的
	        // Unicode 编码。这个返回值是 0 - 65535
	        // 之间的整数。
	        if (checkTxt === 37 || checkTxt === 8 || checkTxt === 39 || checkTxt === 46 || checkTxt === 190 || checkTxt === 110 || (checkTxt >= 48 && checkTxt <= 57) || (checkTxt >= 96 && checkTxt <= 105)) {
	            continue;
	        } else {
	            return false;
	        }
	    }
	    return true;
	}

	function format(number, scale, roundHalfUp) {
	    scale = scale > 0 && scale <= 20 ? scale : 2;
	    var newString; // The new rounded number
	    scale = Number(scale);
	    if (scale < 1) {
	        newString = (Math.round(number)).toString();

	    } else {
	        var numString = number.toString();
	        var minusSign = '';
	        if (numString.indexOf('-')) {
	            minusSign = numString.substring(0, 1);
	            numString = numString.substring(1, numString.length)
	        }

	        if (numString.lastIndexOf(".") === -1) { // If there is no decimal point
	            numString += "."; // give it one at the end
	        }
	        var cutoff = numString.lastIndexOf(".") + scale; // The point at which to truncate the number
	        var d1 = Number(numString.substring(cutoff, cutoff + 1)); // The value of the last decimal place that we'll end up with
	        var d2 = Number(numString.substring(cutoff + 1, cutoff + 2)); // The next decimal, after the last one we want
	        if (roundHalfUp && d2 >= 5) { // Do we need to round up at all? If not, the string will just be truncated
	            if (d1 === 9 && cutoff > 0) { // If the last digit is 9, find a new cutoff point
	                while (cutoff > 0 && (d1 === 9 || isNaN(d1))) {
	                    if (d1 !== ".") {
	                        cutoff -= 1;
	                        d1 = Number(numString.substring(cutoff, cutoff + 1));
	                    } else {
	                        cutoff -= 1;
	                    }
	                }
	            }
	            d1 += 1;
	        }
	        if (d1 === 10) {
	            numString = numString.substring(0, numString.lastIndexOf("."));
	            var roundedNum = Number(numString) + 1;
	            newString = roundedNum.toString() + '.';
	        } else {
	            newString = numString.substring(0, cutoff) + d1.toString();
	        }
	    }
	    if (newString.lastIndexOf(".") === -1) { // Do this again, to the new string
	        newString += ".";
	    }
	    var decs = (newString.substring(newString.lastIndexOf(".") + 1)).length;
	    for (var i = 0; i < scale - decs; i++) {
	        newString += "0";
	    }
	    return minusSign + newString;

	}

	function init(selector) {
	    $(selector).each(function(index, el) {
	        $(el).trigger('blur');
	    });

	}

	var config = {
	    selector: 'input[role*=decimal]',
	    options: {

	    }
	}

	function applyAll() {
	    $doc.on('keydown', config.selector, onkeydown);
	    $doc.on('blur', config.selector, onblur);
	    $doc.on('paste', config.selector, onpaste);

	    init(config.selector);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });


	}


	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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
	    for (var token in tokens) {
	        if (tokens.hasOwnProperty(token)) {
	            formatted = formatted.replace(RegExp('{' + token + '}', 'g'), tokens[token]);
	        }
	    }
	    return formatted;
	}

	function refresh($pagination) {
	    var target = $pagination.data('target');
	    var $target = $(target);
	    if ($target && $target.length > 0) {
	        var offset = $target.data('offset');
	        var limit = $target.data('limit');
	        var total = $target.data('total');
	        var $label = $pagination;
	        if ($target.hasClass('io-page')) {
	            offset = offset * limit;
	            limit = (offset === 0 && total !== 0) ? limit : offset + limit;
	            limit = (limit > total) ? total : limit;
	            $label.text(
	                format($label.data('text-format'), {
	                    'offset': (offset === 0 && total !== 0) ? 1 : offset + 1,
	                    'limit': limit,
	                    'total': total
	                }));
	        } else if ($target.hasClass('io-slice')) {
	            offset = offset * limit;
	            limit = (offset === 0 && total !== 0) ? limit : offset + limit;
	            limit = (limit > (offset + total)) ? (offset + total) : limit;
	            $label.hide();
	        } else {
	            $label.text(
	                format($label.data('text-format'), {
	                    'offset': (offset === 0 && total !== 0) ? 1 : offset,
	                    'limit': limit,
	                    'total': total
	                }));
	        }

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
	        if (limit !== total) {
	            $next.bind('click', function(event) {
	                return $($next.data('target') || $target.data('next')).click();
	            });
	        }

	    }
	}

	function init(selector) {
	    var $paginations = $(selector);
	    if ($paginations.length < 1) {
	        return;
	    }
	    $paginations.each(function(index, el) {
	        var $item = $(el);
	        if ($item.data('pending')) {
	            return;
	        }

	        $item.data('pending', true);

	        refresh($item);

	        $item.removeData('pending');
	    });

	}

	var config = {
	    selector: ['#pagination', '.pagination'],
	    options: {

	    }
	}

	function applyAll() {
	    init(config.selector);

	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });

	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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

	var config = {
	    selector: ['input[required]:not(input[role])'],
	    options: {
	        'placement': 'right',
	        'trigger': 'manual',
	    }
	}

	function onblur(e) {
	    var $this = $(this);
	    if ($this.val().length < 1) {
	        $this.tooltip('show');
	    } else {
	        $this.tooltip('hide');
	    }
	}

	function init(selector, options) {
	    $(selector).each(function() {
	        var $this = $(this);
	        var help = $this.nextAll().filter('span.help-inline');
	        var title = $this.data('title') || help.text() || '此字段必须填写';
	        var ops = $.extend({}, config.options, options, {
	            'title': title
	        });
	        $this.tooltip(ops);
	    });

	}


	function applyAll() {
	    init(config.selector);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });
	    $doc.on('blur', config.selector, onblur);
	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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
	var config = {
	    selector: ':text[role]:visible,:password[role]:visible,textarea[role]:visible',
	    options: {},
	    tipPlacement: 'right',
	    validators: {
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
	            "pattern": "^-?[0-9]+(.[0-9]\\d*)?$"
	        }

	    }
	}

	function onblur(e) {
	    var $this = $(this);
	    var roles = ($this.attr('role') + ',').split(',');
	    for (var i = 0; i < roles.length; i++) {
	        if (roles[i].length < 1) {
	            continue;
	        }
	        var validator = config.validators[roles[i]];
	        var pattern = validator ? validator.pattern : null;
	        if (pattern) {
	            var reg = new RegExp(pattern);
	            if (!reg.test($this.val())) {
	                var help = $this.nextAll().filter('span.help-inline');
	                var title = $this.data('title') || help.text() || $this.attr('placeholder') || validator.placeholder || '格式不正确';
	                $this.data('title', title);
	                $this.data('placement') || $this.data('placement', config.tipPlacement);
	                $this.data('trigger') || $this.data('trigger', 'manual');
	                $this.tooltip('show');
	                if ($this.attr('force'))
	                    $this.focus();

	                return;

	            }
	        }
	    }
	    $this.tooltip('hide');
	};

	function init(selector) {
	    $('form').each(function() {
	        $(this).attr('novalidate', 'novalidate');
	    });

	}

	function applyAll() {
	    init(config.selector);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });
	    $doc.on('blur', config.selector, onblur);
	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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
	}

	// function onpaste() {
	//     var text = clipboardData.getData("text");
	//     clipboardData.setData("text", $.trim(text));
	// }; // 禁止粘贴1.Float64Array();

	var config = {
		selector: [':text', ':password'],
		options: {}
	}

	function applyAll() {
		$doc.on('blur', config.selector, onblur);
		// $doc.on("paste", ":text", onpaste);
		// $doc.on('blur', ':password', onblur);
		// $doc.on("paste", ":password", onpaste);
	}

	module.exports = {
		config: config,
		applyAll: applyAll
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */


	/*!
	 * upper.js
	 *
	 * https://github.com/inspireso
	 *
	 * Copyright 2014 Inspireso and/or its affiliates.
	 * Licensed under the Apache 2.0 License.
	 *
	 */

	function toUpperCase(e) {
		this.value = this.value.toUpperCase();
	}


	function toLowerCase(e) {
		this.value = this.value.toLowerCase();
	}

	var config = {
		upperSelector: 'input[role*=upper]:visible',
		lowerSelector: 'input[role*=lower]:visible',
		options: {}
	}

	function applyAll() {
		$doc.on('keyup', config.upperSelector, toUpperCase);
		$doc.on('keyup', config.lowerSelector, toLowerCase);

	}


	module.exports = {
		config: config,
		applyAll: applyAll
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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
	}

	var config = {
	    selector: 'input[data-title]',
	    options: {}
	}

	function applyAll() {
	    init(config.selector);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });

	}


	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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

	var config = {
	    selector: 'div[role*=dialog]',
	    options: {
	        'backdrop': false
	    }
	}

	function init(selector, ignoreHidden, options) {
	    var $dialog = $(selector);
	    var hidden = !ignoreHidden && $dialog.is(':hidden');
	    var ops = $.extend({}, config.options, options);
	    if ($dialog.length > 0 && !hidden) {
	        $dialog.modal(ops);
	    }


	}

	function applyAll() {
	    init(config.selector, false);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector, false);
	    });
	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */
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

	var isArray = Array.isArray || function (obj) {
	        return Object.prototype.toString.call(obj) === '[object Array]';
	    };

	var async = function (urls, callback) {
	    if (!isArray(urls)) {
	        urls = [urls];
	    }

	    var head = document.getElementsByTagName('head')[0] || document.documentElement;
	    var len = urls.length - 1;

	    for (var i = 0; i <= len; i++) {
	        var url = urls[i];
	        var isCSS = IS_CSS_RE.test(url)
	        var node = document.createElement(isCSS ? 'link' : 'script')

	        if ((len === i) && (typeof callback === 'function')) {
	            node.onload = node.onerror = node.onreadystatechange = function () {
	                if (READY_STATE_RE.test(node.readyState)) {
	                    // Ensure only run once and handle memory leak in IE
	                    node.onload = node.onerror = node.onreadystatechange = null;
	                    // Remove the script to reduce memory leak
	                    if (!isCSS) {
	                        head.removeChild(node);
	                    }
	                    // Dereference the node
	                    node = null;
	                    callback();
	                }
	            };
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
	}

	var config = {
	    selector: 'require',
	    options: {

	    }
	}

	function applyAll() {
	    init(config.selector);
	    $doc.bind('ajaxSuccess', function (e) {
	        init(config.selector);
	    });
	}

	module.exports = {
	    config:config,
	    init: init,
	    applyAll: applyAll,
	    async: async
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
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

	var $ = window.jQuery;
	var isFunction = function(func) {
	    if ($.isFunction(func)) {
	        return func;
	    } else if ($.isFunction(window[func])) {
	        return window[func];
	    } else {
	        return null;
	    }
	};

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
	            });
	            return $this.render(items.slice(0, $this.options.items)).show();
	        });
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
	    if ($selector["typeahead"] !== "undefined") {
	        $selector.typeahead({
	            source: fnsource,
	            updater: fnupdater,
	            highlighter: function(item) {
	                return this.constructor.prototype.highlighter.call(this, item.name);
	            },
	            matcher: function(item) {
	                return this.constructor.prototype.matcher.call(this, item.name);
	            }
	        });
	    }
	}

	var config = {
	    selector: 'input[role*=typeahead]',
	    options: {}
	}

	function applyAll() {
	    var $selector = $(config.selector);
	    if ($selector.length === 0 || $selector.attr('disabled') || $selector["typeahead"] === "undefined") {
	        return;
	    }
	    init(selector);
	    $doc.bind('ajaxComplete', function(e) {
	        init(config.selector);
	    });
	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

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

	var config = {
	    selector: 'div[role*=messenger]',
	    options: {
	        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
	        theme: 'future'
	    }
	}

	function init(selector, options) {
	    var $messenger = $(selector);
	    var message = $messenger.data('message');
	    var target = $messenger.data('target');
	    var label = $messenger.data('label');
	    var ops = $.extend({}, config.options, options);
	    var messenger = Messenger(ops).post({
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
	    if (typeof Messenger === "undefined") {
	        return;
	    }

	    var $messenger = $(config.selector);
	    if ($messenger.length === 0 || $messenger.attr('disabled')) {
	        return;
	    }

	    init(config.selector);

	}


	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

	/*!
	 * stopwatch.js
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
	 *       role="stopwatch" >
	 *       3秒后 ... 当前还剩<span class="num" />秒
	 *  </div>
	 *
	 */


	var $ = window.jQuery;

	var config = {
	    selector: 'div[role*=stopwatch]',
	    options: {}

	}

	function stopwatch($stopwatch, count) {
	    window.setTimeout(function() {
	        count = count - 1;
	        if (count > 0) {
	            $stopwatch.children('.js-num').text(count);
	            stopwatch($stopwatch, count);
	        } else {
	            var fnstop = window[$stopwatch.data('stop')];
	            if (fnstop && typeof fnstop == 'function') {
	                fnstop();
	            }
	        }
	    }, 1000);
	}

	function init(selector) {
	    var $stopwatch = $(selector).first();
	    if ($stopwatch.size() > 0) {
	        var timeout = $stopwatch.data('timeout');
	        $stopwatch.children('.js-num').text(timeout);
	        $(document).ready(function() {
	            var fnstart = window[$stopwatch.data('start')];
	            if (fnstart && typeof fnstart == 'function') {
	                fnstart();
	            }
	            stopwatch($stopwatch, timeout);
	        });
	    }
	}

	function applyAll() {
	    init(config.selector);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });
	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*global clipboardData,jQuery,window,$,$doc */

	/*!
	 * datetime-picker.js
	 *
	 * https://github.com/inspireso
	 *
	 * Copyright 2014 Inspireso and/or its affiliates.
	 * Licensed under the Apache 2.0 License.
	 *
	 */

	var $ = window.jQuery;

	var config = {
	    selector: 'input[role*=datetime]',
	    options: {

	    }
	}

	var init = function(selector, options) {
	    var $selector = $(selector);
	    if ($selector.size() > 0) {
	        $selector.each(function() {
	            var $this = $(this);

	            var format = $this.data('format') || 'yyyy/mm/dd';
	            var ops = $.extend({}, config.options, options, {
	                format: format
	            });

	            $this.datetimepicker(ops);
	        });
	    }

	}

	function applyAll() {
	    if (!$.fn.datetimepicker) {
	        return;
	    }

	    $.fn.datetimepicker.dates['zh-CN'] = {
	        days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
	        daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
	        daysMin: ['日', '一', '二', '三', '四', '五', '六', '日'],
	        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	        monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	        today: '今日',
	        suffix: [],
	        meridiem: []
	    };

	    init(config.selector);
	    $doc.bind('ajaxSuccess', function(e) {
	        init(config.selector);
	    });


	}


	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
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

	var $ = window.jQuery;

	var config = {
	    selector: 'table.sortable',
	    options: {
	        cssHeader: 'table-header'
	    }
	}

	function init(table, options) {
	    var $table = $(table);
	    var ops = $.extend({}, config.options, options);

	    $table.find('thead th').each(function(index, element) {
	        var $th = $(element)
	        if ($th.text() === '操作' || $th.text() === '操 作' || $th.find('input[type=checkbox]').length > 0 || $th.find('div:contains("操作")').length > 0 || $th.find('div:contains("操 作")').length > 0) {
	            $th.addClass('{sorter: false}');
	        }
	    });

	    $table.tablesorter(
	        $.extend(ops, $table.data('option'))
	    );


	}

	function applyAll() {
	    var $table = $(config.selector);
	    if ($table.length <= 0 || !$table.tablesorter) {
	        return;
	    }

	    $table.each(function(index, el) {
	        init(el);
	    })

	    $doc.bind('ajaxSuccess', function(e) {
	        $table = $(config.selector);
	        if ($table.length <= 0 || !$table.tablesorter) {
	            return;
	        }

	        $table.each(function(index, el) {
	            init(el);
	        })
	    });

	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
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
	            persistState: function(table) {
	                if (!window.localStorage) return;
	                table.el.find('th').each(function(i) {
	                    if (this.id !== '') {
	                        table.sortOrder[this.id] = i;
	                    }
	                });
	                window.localStorage.setItem(sid, JSON.stringify(table.sortOrder));
	            },
	            restoreState: eval('(' + window.localStorage.getItem(sid) + ')')
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
	    $table.each(function(index, el) {
	        init(el);
	    })

	    $doc.bind('ajaxSuccess', function(e) {
	        $table = $(config.selector);
	        if ($table.length <= 0 || !$table.dragtable) {
	            return;
	        }

	        $table.each(function(index, el) {
	            init(el);
	        })
	    });

	}

	module.exports = {
	    config: config,
	    init: init,
	    applyAll: applyAll
	};

/***/ }
/******/ ]);