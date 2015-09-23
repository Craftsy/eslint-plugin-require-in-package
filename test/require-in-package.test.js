"use strict";

var rule = require("../lib/rules/require-in-package"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();


var valid = [
    "import fs from 'fs';",
    "import eslint from 'eslint';",
    "import h from './i';",
].map(function(code) {
    return {
        code: code,
        parser: "babel-eslint",
        ecmaFeatures: { "modules": true },
    };
});

var message = "dependency not in the local package.json";

var invalid = [
    "import * as a from 'b';",
    "import c from 'd';",
    "import {e as f} from 'g';",
].map(function(code) {
    return {
        code: code,
        parser: "babel-eslint",
        ecmaFeatures: { "modules": true },
        errors: [{ message: message }],
    };
});

ruleTester.run("require-in-package", rule, {
    valid: valid,
    invalid: invalid
});