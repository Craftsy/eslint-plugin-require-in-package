"use strict";

var rule = require("../lib/rules/require-in-package"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();


var valid = [
    "import fs from 'fs';",
    "import eslint from 'eslint';",
    "import h from './i';",
    "import api from 'eslint/lib/api';",
    "import yay from '@craftsy/yay';",
    "import yay from '@craftsy/yay/lib/go';",
].map(function(code) {
    return {
        code: code,
        parser: "babel-eslint",
        ecmaFeatures: { "modules": true },
        filename: __filename,
    };
});

var message = "dependency not in the local package.json";

var invalid = [
    "import * as a from 'b';",
    "import c from 'd';",
    "import {e as f} from 'g';",
    "import api from 'nonexistant/blah';",
    "import boo from '@craftsy/boo';",
    "import boo from '@craftsy/boo/lib/go';",
].map(function(code) {
    return {
        code: code,
        parser: "babel-eslint",
        ecmaFeatures: { "modules": true },
        errors: [{ message: message }],
        filename: __filename,
    };
});

ruleTester.run("require-in-package", rule, {
    valid: valid,
    invalid: invalid
});
