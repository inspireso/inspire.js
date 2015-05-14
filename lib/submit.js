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

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll
};