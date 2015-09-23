/**
 * @fileoverview ESLint rule that validates ES6 imports are defined in local package.json
 * @author Don Abrams
 * @copyright 2015 Don Abrams. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex("./rules");



