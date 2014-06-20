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
            if (tokens.hasOwnProperty(token))
                formatted = formatted.replace(RegExp('{' + token + '}', 'g'), tokens[token]);
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
            $label.text(
                format($label.data('text-format'), {
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
