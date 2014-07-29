/*!
 * async.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */


var $ = window.jQuery;

var READY_STATE_RE = /^(?:loaded|complete|undefined)$/;
var IS_CSS_RE = /\.(?:(css|gzcss))(?:\?|$)/i;

var node = document.getElementById('inspnode');
var debug = node.getAttribute('debug') === 'true' || false;

var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
};

var async = function(urls, callback) {
    if (!isArray(urls))
        urls = [urls];

    var head = document.getElementsByTagName('head')[0] || doc.documentElement;
    var len = urls.length - 1;

    for (var i = 0; i <= len; i++) {
        var url = urls[i];
        var isCSS = IS_CSS_RE.test(url)
        var node = document.createElement(isCSS ? 'link' : 'script')

        if ((len == i) && (typeof callback == 'function')) {
            node.onload = node.onerror = node.onreadystatechange = function() {
                if (READY_STATE_RE.test(node.readyState)) {
                    // Ensure only run once and handle memory leak in IE
                    node.onload = node.onerror = node.onreadystatechange = null;
                    // Remove the script to reduce memory leak
                    if (!isCSS) {
                        head.removeChild(node)
                    }
                    // Dereference the node
                    node = null;
                    callback();
                }
            }
        }
        if (isCSS) {
            node.rel = 'stylesheet';
            node.href = url;
        } else {
            node.async = true;
            node.src = url;
        }
        head.appendChild(node);
    }
};

function init(tagName) {
    var els = document.getElementsByTagName(tagName);
    if (els.length > 0) {
        var requires = [];
        for (var i = 0; i < els.length; i++) {
            var src = els[i].getAttribute('src');
            //如果是生产环境，会默认压缩成.min.js|.min.css文件，所以在这边统一替换
            // if (!debug) {
            //     src = src.replace('.js', '.min.js').replace('.css', '.min.css');
            // }
            requires[i] = src;

        }
        async(requires);
    }
};

function applyAll() {
    init('require');
    $doc.bind('ajaxSuccess', function(e) {
        init('require');
    });
};

applyAll();

module.exports = {
    init: init,
    applyAll: applyAll,
    async: async
};