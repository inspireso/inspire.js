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


};

function init(selector) {
    $(selector).each(function() {
        $(this).off('click').click(onclick);
    });


};


function applyAll() {
    $.each(['span[role*=confirm]', 'a[role*=confirm]'], function(index, val) {
        init(val);
        $doc.bind("ajaxSuccess", function(e) {
            init(val);
        });
    });



};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
}