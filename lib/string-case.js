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

function applyAll() {
    $doc.on('keyup', 'input[role*=upper]:visible', toUpperCase);
    $doc.on('keyup', 'input[role*=lower]:visible', toLowerCase);

}

applyAll();

module.exports = {
    applyAll: applyAll
};