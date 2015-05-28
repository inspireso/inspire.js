/*global clipboardData,jQuery,window,$,$doc */

/*!
 * pagination.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

"use strict";
var $ = window.jQuery;

function format(formatted, tokens) {
    for (var token in tokens) {
        if (tokens.hasOwnProperty(token)) {
            formatted = formatted.replace(RegExp('{' + token + '}', 'g'), tokens[token]);
        }
    }
    return formatted;
}

function refresh($pagination) {
    var target = $pagination.data('target');
    var $target = $(target);
    if ($target && $target.length > 0) {
        var offset = $target.data('offset');
        var limit = $target.data('limit');
        var total = $target.data('total');
        var $label = $pagination;
        if ($target.hasClass('io-page')) {
            offset = offset * limit;
            limit = (offset === 0 && total !== 0) ? limit : offset + limit;
            limit = (limit > total) ? total : limit;
            $label.text(
                format($label.data('text-format'), {
                    'offset': (offset === 0 && total !== 0) ? 1 : offset + 1,
                    'limit': limit,
                    'total': total
                }));
        } else if ($target.hasClass('io-slice')) {
            offset = offset * limit;
            limit = (offset === 0 && total !== 0) ? limit : offset + limit;
            limit = (limit > (offset + total)) ? (offset + total) : limit;
            $label.hide();
        } else {
            $label.text(
                format($label.data('text-format'), {
                    'offset': (offset === 0 && total !== 0) ? 1 : offset,
                    'limit': limit,
                    'total': total
                }));
        }

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
        if (limit !== total) {
            $next.bind('click', function(event) {
                return $($next.data('target') || $target.data('next')).click();
            });
        }

    }
}

function init(selector) {
    var $paginations = $(selector);
    if ($paginations.length < 1) {
        return;
    }
    $paginations.each(function(index, el) {
        var $item = $(el);
        if ($item.data('pending')) {
            return;
        }

        $item.data('pending', true);

        refresh($item);

        $item.removeData('pending');
    });

}

var config = {
    selector: ['#pagination', '.pagination'],
    options: {

    }
}

function applyAll() {
    init(config.selector);

    $doc.bind('ajaxSuccess', function(e) {
        init(config.selector);
    });

}

module.exports = {
    config: config,
    init: init,
    applyAll: applyAll
};