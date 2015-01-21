'use strict'
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
        var title = $this.data('title') || help.text() || '此字段必须填写';

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

module.exports = {
    init: init,
    applyAll: applyAll
};