/**
 * @fileoverview ESLint rule that validates ES6 imports are defined in local package.json
 * @author Don Abrams
 * @copyright 2015 Craftsy Inc. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = {
	'require-in-package': require('./rules/require-in-package'),
};



