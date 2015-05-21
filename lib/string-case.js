'use strict';
/*global clipboardData,jQuery,window,$,$doc */


/*!
 * upper.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

function toUpperCase(e) {
	this.value = this.value.toUpperCase();
}


function toLowerCase(e) {
	this.value = this.value.toLowerCase();
}

var config = {
	upperSelector: 'input[role*=upper]:visible',
	lowerSelector: 'input[role*=lower]:visible',
	options: {}
}

function applyAll() {
	$doc.on('keyup', config.upperSelector, toUpperCase);
	$doc.on('keyup', config.lowerSelector, toLowerCase);

}


module.exports = {
	config: config,
	applyAll: applyAll
};