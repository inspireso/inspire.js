;
(function() {
  var inspire_js_108_lib_string_debug, inspire_js_108_lib_submit_debug, inspire_js_108_lib_checkbox_debug, inspire_js_108_lib_multiselect_debug, inspire_js_108_lib_confirm_debug, inspire_js_108_lib_jump_debug, inspire_js_108_lib_link_debug, inspire_js_108_lib_number_debug, inspire_js_108_lib_money_debug, inspire_js_108_lib_decimal_debug, inspire_js_108_lib_pagination_debug, inspire_js_108_lib_required_debug, inspire_js_108_lib_roles_debug, inspire_js_108_lib_trim_debug, inspire_js_108_lib_validity_debug, inspire_js_108_lib_dialog_debug, inspire_js_108_lib_async_debug, inspire_js_108_lib_typeahead_debug, inspire_js_108_lib_messenger_debug, inspire_js_108_inspire_debug;
  inspire_js_108_lib_string_debug = function() {
    'use strict';
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
  }();
  inspire_js_108_lib_submit_debug = function(exports) {
    'use strict';
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
        $('a[role*=once],span[role*=once]').off('click', onclick);
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
        if ($this.parents('form').find('button[type=submit].default, input[type=submit].default').length <= 0) return true;
        if (e.which && e.which == 13 || e.keyCode && e.keyCode == 13) {
          $this.parents('form').find('button[type=submit].default, input[type=submit].default').click();
          return false;
        } else {
          return true;
        }
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_checkbox_debug = function() {
    'use strict';
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
          $table.children('tbody').find('input:checkbox[role=table-selected]').prop('checked', $this.prop('checked') || false).trigger('change');
        }
      });
    }

    function applyAll() {
      applyTableSelected('input:checkbox[role*=table-selected]');
      applyTableSelectedAll('input:checkbox[role*=table-selected-all]');
    }
    applyAll();
  }();
  inspire_js_108_lib_multiselect_debug = function() {
    'use strict';
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
      $doc.on('change', selector, function(event) {
        var $this = $(this);
        var target = $this.data('target');
        var valueChanged = $this.data('value-changed');
        if (target) {
          var $target = $(target);
          var array = $target.data('array-value') || [];
          var val = $this.data('value');
          if ($this.prop('checked')) {
            if ($.inArray(val, array) <= 0) {
              array.push(val);
            }
          } else {
            array.remove(val);
          }
          $target.data('array-value', array);
          $target.val(array.join(';'));
          var fnValueChanged = window[valueChanged];
          if (fnValueChanged && typeof fnValueChanged === 'function') {
            fnValueChanged(array, val);
          }
        }
      });
    }

    function applyAll() {
      applyMultiSelected('input:checkbox[role*=multi-select]');
    }
    applyAll();
  }();
  inspire_js_108_lib_confirm_debug = function(exports) {
    'use strict';
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
      if (!$this.parent().attr('disabled')) {
        if (!window.confirm($this.data('message'))) {
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

    function applyAll() {
      $.each(['span[role*=confirm]', 'a[role*=confirm]'], function(index, val) {
        init(val);
        $doc.bind('ajaxSuccess', function(e) {
          init(val);
        });
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_jump_debug = function(exports) {
    'use strict';
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

    function applyAll() {
      init('div[role*=jump]');
      $doc.bind('ajaxSuccess', function(e) {
        init('div[role*=jump]');
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_link_debug = function(exports) {
    'use strict';
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
      var selector = '[role*=button]';
      $doc.bind('ajaxSuccess', function(e) {
        init(selector);
      });
    }
    applyAll();
    exports = init;
    return exports;
  }();
  inspire_js_108_lib_number_debug = function(exports) {
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
      if ($.inArray(e.keyCode, [
          46,
          8,
          9,
          27,
          13,
          110,
          190
        ]) !== -1 || e.keyCode === 65 && e.ctrlKey === true || e.keyCode >= 35 && e.keyCode <= 39) {
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
      if ($.inArray(e.keyCode, [
          46,
          8,
          9,
          27,
          13,
          110
        ]) !== -1 || e.keyCode === 65 && e.ctrlKey === true || e.keyCode >= 35 && e.keyCode <= 39) {
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
    }

    function applyAll() {
      init('input[role*=number]:visible', onNumberKeydown);
      init('input[role*=integer]:visible', onIntegerKeydown);
    }
    applyAll();
    exports = {
      keydowns: {
        integer: onIntegerKeydown,
        number: onNumberKeydown
      },
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_money_debug = function(exports) {
    'use strict';
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
    var number = inspire_js_108_lib_number_debug;

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
      }
      // 禁止粘贴1.Float64Array();
    function valid(txt) {
      var i = 0;
      var len = txt.length;
      for (i = 0; i < len; i++) {
        var checkTxt = txt.charCodeAt(i);
        // 使用charCodeAt方法，方法可返回指定位置的字符的
        // Unicode 编码。这个返回值是 0 - 65535
        // 之间的整数。
        if (checkTxt === 37 || checkTxt === 8 || checkTxt === 39 || checkTxt === 46 || checkTxt === 190 || checkTxt === 110 || checkTxt >= 48 && checkTxt <= 57 || checkTxt >= 96 && checkTxt <= 105) {
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
      return num.replace(/^\./, '0.');
    }

    function init(selector) {
      number.init(selector, number.keydowns.number);
      $doc.on('blur', selector, onblur);
      $doc.on('paste', selector, onpaste);
    }

    function applyAll() {
      init('input[role*=money]:visible');
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_decimal_debug = function(exports) {
    'use strict';
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
    // var number = require('./number');
    function onkeydown(e) {
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [
          46,
          8,
          9,
          27,
          13,
          110,
          190
        ]) !== -1 || e.keyCode === 65 && e.ctrlKey === true || e.keyCode >= 35 && e.keyCode <= 39) {
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
      }
      // 禁止粘贴1.Float64Array();
    function valid(txt) {
      var i = 0;
      var len = txt.length;
      for (i = 0; i < len; i++) {
        var checkTxt = txt.charCodeAt(i);
        // 使用charCodeAt方法，方法可返回指定位置的字符的
        // Unicode 编码。这个返回值是 0 - 65535
        // 之间的整数。
        if (checkTxt === 37 || checkTxt === 8 || checkTxt === 39 || checkTxt === 46 || checkTxt === 190 || checkTxt === 110 || checkTxt >= 48 && checkTxt <= 57 || checkTxt >= 96 && checkTxt <= 105) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    }

    function format(number, scale, roundHalfUp) {
      scale = scale > 0 && scale <= 20 ? scale : 2;
      var newString;
      // The new rounded number
      scale = Number(scale);
      if (scale < 1) {
        newString = Math.round(number).toString();
      } else {
        var numString = number.toString();
        var minusSign = '';
        if (numString.indexOf('-')) {
          minusSign = numString.substring(0, 1);
          numString = numString.substring(1, numString.length);
        }
        if (numString.lastIndexOf('.') == -1) {
          // If there is no decimal point
          numString += '.';
        }
        var cutoff = numString.lastIndexOf('.') + scale;
        // The point at which to truncate the number
        var d1 = Number(numString.substring(cutoff, cutoff + 1));
        // The value of the last decimal place that we'll end up with
        var d2 = Number(numString.substring(cutoff + 1, cutoff + 2));
        // The next decimal, after the last one we want
        if (roundHalfUp && d2 >= 5) {
          // Do we need to round up at all? If not, the string will just be truncated
          if (d1 === 9 && cutoff > 0) {
            // If the last digit is 9, find a new cutoff point
            while (cutoff > 0 && (d1 === 9 || isNaN(d1))) {
              if (d1 !== '.') {
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
          numString = numString.substring(0, numString.lastIndexOf('.'));
          var roundedNum = Number(numString) + 1;
          newString = roundedNum.toString() + '.';
        } else {
          newString = numString.substring(0, cutoff) + d1.toString();
        }
      }
      if (newString.lastIndexOf('.') === -1) {
        // Do this again, to the new string
        newString += '.';
      }
      var decs = newString.substring(newString.lastIndexOf('.') + 1).length;
      for (var i = 0; i < scale - decs; i++) {
        newString += '0';
      }
      return minusSign + newString;
    }

    function init(selector) {
      $(selector).each(function(index, el) {
        $(el).trigger('blur');
      });
    }

    function applyAll() {
      var selector = 'input[role*=decimal]:visible';
      $doc.on('keydown', selector, onkeydown);
      $doc.on('blur', selector, onblur);
      $doc.on('paste', selector, onpaste);
      init(selector);
      $doc.bind('ajaxSuccess', function(e) {
        init(selector);
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_pagination_debug = function(exports) {
    'use strict';
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
          limit = offset === 0 && total !== 0 ? limit : offset + limit;
          limit = limit > total ? total : limit;
          $label.text(format($label.data('text-format'), {
            'offset': offset === 0 && total !== 0 ? 1 : offset + 1,
            'limit': limit,
            'total': total
          }));
        } else if ($target.hasClass('io-slice')) {
          offset = offset * limit;
          limit = offset === 0 && total !== 0 ? limit : offset + limit;
          limit = limit > offset + total ? offset + total : limit;
          $label.hide();
        } else {
          $label.text(format($label.data('text-format'), {
            'offset': offset === 0 && total !== 0 ? 1 : offset,
            'limit': limit,
            'total': total
          }));
        }
        var $previous = $pagination.parent().parent().find('#pagination-previous-link');
        var $next = $pagination.parent().parent().find('#pagination-next-link');
        // var $previous = $pagination.siblings('#pagination-previous-link');
        // var $next = $pagination.siblings('#pagination-next-link');
        $previous[offset <= 1 ? 'addClass' : 'removeClass']('disabled');
        $next[limit === total ? 'addClass' : 'removeClass']('disabled');
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

    function applyAll() {
      $.each(['#pagination', '.pagination'], function(index, val) {
        init(val);
        $doc.bind('ajaxSuccess', function(e) {
          init(val);
        });
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_required_debug = function(exports) {
    'use strict';
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
    }

    function init(selector) {
      $(selector).each(function() {
        var $this = $(this);
        var help = $this.nextAll().filter('span.help-inline');
        var title = $this.data('title') || help.text() || '\u6B64\u5B57\u6BB5\u5FC5\u987B\u586B\u5199';
        var options = {
          'placement': tipPlacement,
          'trigger': 'manual',
          'title': title
        };
        $this.tooltip(options);
      });
    }

    function applyAll() {
      var selector = 'input[required]:not(input[role]):visible';
      init(selector);
      $doc.bind('ajaxSuccess', function(e) {
        init(selector);
      });
      $doc.on('blur', selector, onblur);
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_roles_debug = function(exports) {
    'use strict';
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
      'number': {
        'pattern': '^[0-9]*$',
        'placeholder': '\u8BF7\u8F93\u5165\u6B63\u786E\u6570\u5B57'
      },
      'positive-integer': {
        'pattern': '^\\+?[1-9][0-9]*$',
        'placeholder': '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u6B63\u6574\u6570'
      },
      'email': {
        'pattern': '[\\w!#$%&\'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&\'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?',
        'placeholder': 'example@example.com'
      },
      'url': {
        'pattern': '[a-zA-z]+://[^s]*',
        'placeholder': 'http://example.com'
      },
      'website': {
        'pattern': '^\\s*((([a-zA-z]+://)(www\\.))|([a-zA-z]+://)|(www\\.))\\w+\\.\\w{2,}\\s*$',
        'placeholder': 'http://example.com'
      },
      'tel': {
        'pattern': '(^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)|(^86((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)|(^\\+86((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)',
        'placeholder': '0592-8888888 | 13588888888'
      },
      // "tel": {
      //     "pattern": '(^*$)',
      //     "placeholder": null
      // },
      'mobile': {
        'pattern': '1\\d{10}',
        'placeholder': '13588888888'
      },
      'zipcode': {
        'pattern': '[1-9]\\d{5}(?!\\d)',
        'placeholder': '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7F16'
      },
      'idc': {
        'pattern': '\\d{15}|\\d{18}',
        'placeholder': '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u8EAB\u4EFD\u8BC1'
      },
      'ip': {
        'pattern': '((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)',
        'placeholder': '\u8BF7\u8F93\u5165\u6B63\u786E\u7684IP,\u5982192.168.1.1'
      },
      'datetime': {
        'pattern': '^((?!0000)[0-9]{4}\\-((0[1-9]|1[0-2])\\-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)\\-02\\-29)(\\s)*((([0-1]?[0-9])|([2][0-3]))\\:([0-5]?[0-9])(\\:([0-5]?[0-9]))?)?$',
        'placeholder': '(2013-01-01)\u6216(2013-01-01 11:26:00)'
      },
      // "datetime": {
      //     "pattern": "^*$",
      //     "placeholder": null
      // },
      'tsrn': {
        'pattern': '^[\\d|X|x]{15}$'
      },
      'passwd': {
        'pattern': '^[\\w\\W]{6,}$',
        'placeholder': '\u5EFA\u8BAE\u5BC6\u7801\u5927\u4E8E6\u4F4D'
      },
      'account': {
        'pattern': '^[A-Za-z0-9]+$'
      },
      'money': {
        'pattern': '^[0-9]+(.[0-9]{2})?$'
      },
      'decimal': {
        'pattern': '^-?[0-9]+(.[0-9]\\d*)?$'
      }
    };

    function onblur(e) {
      var $this = $(this);
      var roles = ($this.attr('role') + ',').split(',');
      for (var i = 0; i < roles.length; i++) {
        if (roles[i].length < 1) {
          continue;
        }
        var validator = validators[roles[i]];
        var pattern = validator ? validator.pattern : null;
        if (pattern) {
          var reg = new RegExp(pattern);
          if (!reg.test($this.val())) {
            var help = $this.nextAll().filter('span.help-inline');
            var title = $this.data('title') || help.text() || $this.attr('placeholder') || validator.placeholder || '\u683C\u5F0F\u4E0D\u6B63\u786E';
            $this.data('title', title);
            $this.data('placement') || $this.data('placement', tipPlacement);
            $this.data('trigger') || $this.data('trigger', 'manual');
            $this.tooltip('show');
            if ($this.attr('force')) $this.focus();
            return;
          }
        }
      }
      $this.tooltip('hide');
    }

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
      });
    }

    function applyAll() {
      var selector = ':text[role]:visible,:password[role]:visible,textarea[role]:visible';
      init(selector);
      $doc.bind('ajaxSuccess', function(e) {
        init(selector);
      });
      $doc.on('blur', selector, onblur);
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll,
      validators: validators
    };
    return exports;
  }();
  inspire_js_108_lib_trim_debug = function(exports) {
    'use strict';
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
    function applyAll() {
      $doc.on('blur', ':text', onblur);
      // $doc.on("paste", ":text", onpaste);
      $doc.on('blur', ':password', onblur);
    }
    applyAll();
    exports = {
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_validity_debug = function(exports) {
    'use strict';
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

    function applyAll() {
      init('input[data-title]');
      $doc.bind('ajaxSuccess', function(e) {
        init('input[data-title]:visible');
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_dialog_debug = function(exports) {
    'use strict';
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
    }

    function applyAll() {
      init('div[role*=dialog]', false);
      init('div[role*=cdialog]', true);
      $doc.bind('ajaxSuccess', function(e) {
        init('div[role*=dialog]', false);
        init('div[role*=cdialog]', true);
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_async_debug = function(exports) {
    'use strict';
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
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
    var async = function(urls, callback) {
      if (!isArray(urls)) {
        urls = [urls];
      }
      var head = document.getElementsByTagName('head')[0] || document.documentElement;
      var len = urls.length - 1;
      for (var i = 0; i <= len; i++) {
        var url = urls[i];
        var isCSS = IS_CSS_RE.test(url);
        var node = document.createElement(isCSS ? 'link' : 'script');
        if (len === i && typeof callback === 'function') {
          node.onload = node.onerror = node.onreadystatechange = function() {
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

    function applyAll() {
      init('require');
      $doc.bind('ajaxSuccess', function(e) {
        init('require');
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll,
      async: async
    };
    return exports;
  }();
  inspire_js_108_lib_typeahead_debug = function(exports) {
    'use strict';
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
        var source = this.$element.data('source');
        var params = this.$element.data('params');
        // var url = window.location.protocol + '//' + window.location.host + '/' + source;
        var url = source.replace('//', '/');
        $.post(url, {
          'start': query,
          'params': params
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
      var updater = this.$element.data('updater');
      var json = JSON.parse(item);
      if (updater) {
        var fn = isFunction(updater);
        if (fn) {
          fn(json);
        } else {
          // var url = window.location.protocol + '//' + window.location.host + '/' + updater;
          var url = updater.replace('//', '/');
          $.post(url, {
            'item': json.value
          }).done(function(data) {});
        }
      }
      return json.name;
    };

    function init(selector) {
      var $selector = $(selector);
      if ($selector['typeahead'] !== 'undefined') {
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
      if ($selector.length === 0 || $selector.attr('disabled') || $selector['typeahead'] === 'undefined') {
        return;
      }
      init(selector);
      $doc.bind('ajaxComplete', function(e) {
        init(selector);
      });
    }
    applyAll();
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_lib_messenger_debug = function(exports) {
    'use strict';
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
            label: '\u53D6\u6D88',
            action: function() {
              return messenger.cancel();
            }
          }
        }
      });
    }

    function applyAll() {
      var selector = 'div[role*=messenger]';
      var $messenger = $(selector);
      if ($messenger.length === 0 || $messenger.attr('disabled')) {
        return;
      }
      init(selector);
    }
    if (typeof Messenger !== 'undefined') {
      config();
      applyAll();
    }
    exports = {
      init: init,
      applyAll: applyAll
    };
    return exports;
  }();
  inspire_js_108_inspire_debug = function(exports) {
    'use strict';
    var $ = window.jQuery;
    if (!window.$doc) {
      window.$doc = $(document);
    }
    Array.prototype.remove = function(el) {
      var index = this.indexOf(el);
      return index > -1 ? this.splice(index, 1) : this;
    };
    var inspirejs = {
      version: '1.0.1'
    };
    inspirejs.string = inspire_js_108_lib_string_debug;
    inspirejs.submit = inspire_js_108_lib_submit_debug;
    inspirejs.checkbox = inspire_js_108_lib_checkbox_debug;
    inspirejs.multiselect = inspire_js_108_lib_multiselect_debug;
    inspirejs.confirm = inspire_js_108_lib_confirm_debug;
    inspirejs.jump = inspire_js_108_lib_jump_debug;
    inspirejs.link = inspire_js_108_lib_link_debug;
    inspirejs.number = inspire_js_108_lib_number_debug;
    inspirejs.money = inspire_js_108_lib_money_debug;
    inspirejs.decimal = inspire_js_108_lib_decimal_debug;
    inspirejs.pagination = inspire_js_108_lib_pagination_debug;
    inspirejs.required = inspire_js_108_lib_required_debug;
    inspirejs.roles = inspire_js_108_lib_roles_debug;
    inspirejs.submit = inspire_js_108_lib_submit_debug;
    inspirejs.trim = inspire_js_108_lib_trim_debug;
    inspirejs.validity = inspire_js_108_lib_validity_debug;
    inspirejs.dialog = inspire_js_108_lib_dialog_debug;
    inspirejs.async = inspire_js_108_lib_async_debug;
    inspirejs.typeahead = inspire_js_108_lib_typeahead_debug;
    inspirejs.messenger = inspire_js_108_lib_messenger_debug;
    exports = inspirejs;
    return exports;
  }();
}());