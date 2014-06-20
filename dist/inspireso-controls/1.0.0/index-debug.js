(function() {
  /**
   * Sea.js mini 2.3.0 | seajs.org/LICENSE.md
   */
  var define;
  var require;
  (function(global, undefined) {
    /**
     * util-lang.js - The minimal language enhancement
     */
    function isType(type) {
      return function(obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
      }
    }
    var isFunction = isType("Function")
      /**
       * module.js - The core of module loader
       */
    var cachedMods = {}

    function Module() {}
    // Execute a module
    Module.prototype.exec = function() {
      var mod = this
        // When module is executed, DO NOT execute it again. When module
        // is being executed, just return `module.exports` too, for avoiding
        // circularly calling
      if (this.execed) {
        return mod.exports
      }
      this.execed = true;

      function require(id) {
        return Module.get(id).exec()
      }
      // Exec factory
      var factory = mod.factory
      var exports = isFunction(factory) ? factory(require, mod.exports = {}, mod) : factory
      if (exports === undefined) {
        exports = mod.exports
      }
      // Reduce memory leak
      delete mod.factory
      mod.exports = exports
      return exports
    }
    // Define a module
    define = function(id, deps, factory) {
      var meta = {
        id: id,
        deps: deps,
        factory: factory
      }
      Module.save(meta)
    }
    // Save meta data to cachedMods
    Module.save = function(meta) {
      var mod = Module.get(meta.id)
      mod.id = meta.id
      mod.dependencies = meta.deps
      mod.factory = meta.factory
    }
    // Get an existed module or create a new one
    Module.get = function(id) {
      return cachedMods[id] || (cachedMods[id] = new Module())
    }
    // Public API
    require = function(id) {
      var mod = Module.get(id)
      if (!mod.execed) {
        mod.exec()
      }
      return mod.exports
    }
  })(this);
  define("inspireso-controls/1.0.0/index-debug", ["inspireso-controls/1.0.0/__init__-debug", "inspireso-controls/1.0.0/submit-debug", "inspireso-controls/1.0.0/checkbox-debug", "inspireso-controls/1.0.0/confirm-debug", "inspireso-controls/1.0.0/jump-debug", "inspireso-controls/1.0.0/link-debug", "inspireso-controls/1.0.0/messenger-debug", "inspireso-controls/1.0.0/money-debug", "inspireso-controls/1.0.0/number-debug", "inspireso-controls/1.0.0/pagination-debug", "inspireso-controls/1.0.0/required-debug", "inspireso-controls/1.0.0/roles-debug", "inspireso-controls/1.0.0/trim-debug", "inspireso-controls/1.0.0/validity-debug", "inspireso-controls/1.0.0/dialog-debug", "inspireso-controls/1.0.0/async-debug"], function(require, exports, module) {
    require("inspireso-controls/1.0.0/__init__-debug");
    module.exports = {};
  });
  define("inspireso-controls/1.0.0/__init__-debug", ["inspireso-controls/1.0.0/submit-debug", "inspireso-controls/1.0.0/checkbox-debug", "inspireso-controls/1.0.0/confirm-debug", "inspireso-controls/1.0.0/jump-debug", "inspireso-controls/1.0.0/link-debug", "inspireso-controls/1.0.0/messenger-debug", "inspireso-controls/1.0.0/money-debug", "inspireso-controls/1.0.0/number-debug", "inspireso-controls/1.0.0/pagination-debug", "inspireso-controls/1.0.0/required-debug", "inspireso-controls/1.0.0/roles-debug", "inspireso-controls/1.0.0/trim-debug", "inspireso-controls/1.0.0/validity-debug", "inspireso-controls/1.0.0/dialog-debug", "inspireso-controls/1.0.0/async-debug"], function(require, exports, module) {
    /*!
     * __init__.js: import controls
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
      if (!window.$doc) {
        window.$doc = $(document);
      }

      function applyAll() {
        require("inspireso-controls/1.0.0/submit-debug");
        require("inspireso-controls/1.0.0/checkbox-debug");
        require("inspireso-controls/1.0.0/confirm-debug");
        require("inspireso-controls/1.0.0/jump-debug");
        require("inspireso-controls/1.0.0/link-debug");
        require("inspireso-controls/1.0.0/messenger-debug");
        require("inspireso-controls/1.0.0/money-debug");
        require("inspireso-controls/1.0.0/number-debug");
        require("inspireso-controls/1.0.0/pagination-debug");
        require("inspireso-controls/1.0.0/required-debug");
        require("inspireso-controls/1.0.0/roles-debug");
        require("inspireso-controls/1.0.0/submit-debug");
        require("inspireso-controls/1.0.0/trim-debug");
        require("inspireso-controls/1.0.0/validity-debug");
        require("inspireso-controls/1.0.0/dialog-debug");
        require("inspireso-controls/1.0.0/async-debug");
      };
      applyAll();
    });
  });
  define("inspireso-controls/1.0.0/submit-debug", [], function(require, exports, module) {
    /*!
     * submit.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
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
  });
  define("inspireso-controls/1.0.0/checkbox-debug", [], function(require, exports, module) {
    /*!
     * checkbox.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
      var $ = window.jQuery;

      function applyTableSelected(selector) {
        $doc.on('change', selector, function(event) {
          var $this = $(this);
          var target = $this.data('target');
          if (target) {
            var val = $(target).val();
            var tr = $this.parents('tr');
            if ($this.attr('checked')) {
              val = $this.attr('id') + ';' + val;
              tr.addClass('info');
            } else {
              val = val.replace($this.attr('id') + ';', '');
              tr.removeClass('info');
            }
            $(target).val(val);
          }
        });
      }

      function applyTableSelectedAll(selector) {
        $doc.on('change', selector, function(event) {
          var $this = $(this);
          var $table = $this.parents('table');
          if ($table) {
            $table.children('tbody').find('input:checkbox[role=table-selected]').attr('checked', $this.attr('checked') || false).trigger('change');
          }
        });
      }

      function applyAll() {
        applyTableSelected('input:checkbox[role=table-selected]');
        applyTableSelectedAll('input:checkbox[role=table-selected-all]');
      }
      applyAll();
    });
  });
  define("inspireso-controls/1.0.0/confirm-debug", [], function(require, exports, module) {
    /*!
     * cinfirm.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
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
  });
  define("inspireso-controls/1.0.0/jump-debug", [], function(require, exports, module) {
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
    define(function(require, exports, module) {
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
  });
  define("inspireso-controls/1.0.0/link-debug", [], function(require, exports, module) {
    /*!
     * link.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
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
  });
  define("inspireso-controls/1.0.0/messenger-debug", [], function(require, exports, module) {
    /*!
     * messenger.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
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
        if ($messenger.size() == 0 || $messenger.attr('disabled')) {
          return;
        }
        init(selector);
      };
      config();
      applyAll();
      module.exports = {
        init: init,
        applyAll: applyAll
      };
    });
  });
  define("inspireso-controls/1.0.0/money-debug", ["inspireso-controls/1.0.0/number-debug"], function(require, exports, module) {
    /*!
     * nomey.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
      var $ = window.jQuery;
      var number = require("inspireso-controls/1.0.0/number-debug");

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
  });
  define("inspireso-controls/1.0.0/number-debug", [], function(require, exports, module) {
    /*!
     * number.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
      var $ = window.jQuery;

      function onkeydown() {
        if (event.keyCode == 37 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 || event.keyCode == 110 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {} else {
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
  });
  define("inspireso-controls/1.0.0/pagination-debug", [], function(require, exports, module) {
    /*!
     * pagination.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
      var $ = window.jQuery;

      function format(formatted, tokens) {
        for (var token in tokens)
          if (tokens.hasOwnProperty(token)) formatted = formatted.replace(RegExp('{' + token + '}', 'g'), tokens[token]);
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
          $label.text(format($label.data('text-format'), {
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
  });
  define("inspireso-controls/1.0.0/required-debug", [], function(require, exports, module) {
    /*!
     * required.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
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
  });
  define("inspireso-controls/1.0.0/roles-debug", [], function(require, exports, module) {
    /*!
     * roles.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
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
          "pattern": "^\\d{15}$"
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
        var validator = $this.attr('pattern');
        if (validator) {
          var patten = new RegExp(validator);
          if (!patten.test($this.val())) {
            var help = $this.nextAll().filter('span.help-inline');
            var title = $this.data('title') || help.text() || $this.attr('placeholder') || '格式不正确';
            $this.data('title', title);
            $this.data('placement') || $this.data('placement', tipPlacement);
            $this.data('trigger') || $this.data('trigger', 'manual');
            $this.tooltip('show');
            if ($this.attr('force')) $this.focus();
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
            if (validator.pattern) $this.attr('pattern', validator.pattern);
            if (validator.placeholder) $this.attr('placeholder', validator.placeholder);
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
        applyAll: applyAll
      };
    });
  });
  define("inspireso-controls/1.0.0/trim-debug", [], function(require, exports, module) {
    /*!
     * tirm.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
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
  });
  define("inspireso-controls/1.0.0/validity-debug", [], function(require, exports, module) {
    /*!
     * vaildity.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
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
  });
  define("inspireso-controls/1.0.0/dialog-debug", [], function(require, exports, module) {
    /*!
     * dialog.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
      var $ = window.jQuery;

      function init(selector) {
        var $dialog = $(selector);
        $dialog.modal({
          'backdrop': 'static'
        });
      };

      function applyAll() {
        init('div[role=dialog]');
        $doc.bind('ajaxSuccess', function(e) {
          init('div[role=dialog]');
        });
      };
      applyAll();
      module.exports = {
        init: init,
        applyAll: applyAll
      }
    });
  });
  define("inspireso-controls/1.0.0/async-debug", [], function(require, exports, module) {
    /*!
     * async.js
     *
     * https://github.com/inspireso
     *
     * Copyright 2014 Inspireso and/or its affiliates.
     * Licensed under the Apache 2.0 License.
     *
     */
    define(function(require, exports, module) {
      var $ = window.jQuery;

      function init(tagName) {
        var els = document.getElementsByTagName(tagName);
        if (els.length > 0) {
          var requires = [];
          for (var i = 0; i < els.length; i++) {
            var src = els[i].getAttribute('src');
            //如果是生产环境，会默认压缩成.min.js|.min.css文件，所以在这边统一替换
            if (!insp.debug) {
              src = src.replace('.js', '.min.js').replace('.css', '.min.css');
            }
            requires[i] = src;
          }
          require.async(requires);
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
        applyAll: applyAll
      };
    });
  });
  require("inspireso-controls/1.0.0/index-debug");
})();