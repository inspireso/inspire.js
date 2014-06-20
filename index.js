var $ = window.jQuery || require("jquery");

if (!window.$doc) {
    window.$doc = $(document);
}

exports = module.exports;

exports.submit = require('./lib/submit');
exports.checkbox = require('./lib/checkbox');
exports.checkbox = require('./lib/confirm');
exports.jump = require('./lib/jump');
exports.link = require('./lib/link');
exports.messenger = require('./lib/messenger');
exports.money = require('./lib/money');
exports.number = require('./lib/number');
exports.pagination = require('./lib/pagination');
exports.required = require('./lib/required');
exports.roles = require('./lib/roles');
exports.submit = require('./lib/submit');
exports.trim = require('./lib/trim');
exports.validity = require('./lib/validity');
exports.dialog = require('./lib/dialog');
exports.async = require('./lib/async');