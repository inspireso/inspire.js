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
