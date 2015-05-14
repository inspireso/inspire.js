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
    var selector = 'div[role*=messenger]';
    var $messenger = $(selector);
    if ($messenger.length === 0 || $messenger.attr('disabled')) {
        return;
    }

    init(selector);

}

if (typeof Messenger !== "undefined") {
    config();
    applyAll();
}


module.exports = {
    init: init,
    applyAll: applyAll
};