'use strict'

var $ = window.jQuery;

if (!window.$doc) {
	window.$doc = $(document);
}

Array.prototype.remove = function(el) {
	var index = this.indexOf(el);
	return index > -1 ? this.splice(index, 1) : this;
};


var inspirejs = {
	version: "1.0.1"
};

inspirejs.string = require('./lib/strings');

inspirejs.submit = require('./lib/submit');
inspirejs.checkbox = require('./lib/checkbox');
inspirejs.multiselect = require('./lib/multiselect');
inspirejs.confirm = require('./lib/confirm');
inspirejs.jump = require('./lib/jump');
inspirejs.link = require('./lib/link');
inspirejs.number = require('./lib/number');
inspirejs.money = require('./lib/money');
inspirejs.decimal = require('./lib/decimal');
inspirejs.pagination = require('./lib/pagination');
inspirejs.required = require('./lib/required');
inspirejs.roles = require('./lib/roles');
inspirejs.trim = require('./lib/trim');
inspirejs.stringCase = require('./lib/string-case');
inspirejs.validity = require('./lib/validity');
inspirejs.dialog = require('./lib/dialog');
inspirejs.async = require('./lib/async');
inspirejs.typeahead = require('./lib/typeahead');
inspirejs.messenger = require('./lib/messenger');
inspirejs.stopwatch = require('./lib/stopwatch');
inspirejs.datetime = require('./lib/datetime-picker');
inspirejs.tableSortable = require('./lib/table-sortable');
inspirejs.tableDragable = require('./lib/table-dragable');

inspirejs.applyAll = function() {
	inspirejs.submit.applyAll();
	inspirejs.checkbox.applyAll();
	inspirejs.multiselect.applyAll();
	inspirejs.confirm.applyAll();
	inspirejs.jump.applyAll();
	inspirejs.link.applyAll();
	inspirejs.number.applyAll();
	inspirejs.money.applyAll();
	inspirejs.decimal.applyAll();
	inspirejs.pagination.applyAll();
	inspirejs.required.applyAll();
	inspirejs.roles.applyAll();
	inspirejs.trim.applyAll();
	inspirejs.stringCase.applyAll();
	inspirejs.validity.applyAll();
	inspirejs.stopwatch.applyAll();
	inspirejs.datetime.applyAll();
}

inspirejs.applyAll();

module.exports = inspirejs;