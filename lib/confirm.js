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
