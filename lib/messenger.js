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