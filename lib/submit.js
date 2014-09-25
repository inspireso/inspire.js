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

// $doc.on('click', ':submit', function(e) {
//     var $this = $(this);
//     var $form = $this.parents("form");
//     if ($form.length == 1) {
//         e.preventDefault();
//         e.stopPropagation();
//         $this.attr("disabled", "disabled");
//         $form.submit();
//     }
// });

$doc.on('submit', 'form', function(e) {
    var $form = $(this);
    if ($form.length == 1) {
        if ($form.attr('isSubmited')) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            $form.attr('isSubmited', true);
        }
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