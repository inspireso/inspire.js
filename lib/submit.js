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
