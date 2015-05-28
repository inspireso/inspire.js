/*global clipboardData,jQuery,window,$,$doc */

/*!
 * tirm.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

"use strict";
var $ = window.jQuery;

function onblur() {
	var $this = $(this);
	$this.val($.trim($this.val()));
}

// function onpaste() {
//     var text = clipboardData.getData("text");
//     clipboardData.setData("text", $.trim(text));
// }; // 禁止粘贴1.Float64Array();

var config = {
	selector: [':text', ':password'],
	options: {}
}

function applyAll() {
	$doc.on('blur', config.selector, onblur);
	// $doc.on("paste", ":text", onpaste);
	// $doc.on('blur', ':password', onblur);
	// $doc.on("paste", ":password", onpaste);
}

module.exports = {
	config: config,
	applyAll: applyAll
};