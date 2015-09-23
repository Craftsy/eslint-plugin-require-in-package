eslint-require-in-package
=========================

Rule Details
------------
ES6 import only.

Given this:
```
import * as a from 'b';
import c from 'd';
import {e as f} from 'g';
import recast from 'recast';
import h from './i';
```

It will check dependencies, devDependencies, and peerDependencies for the existance of b, d, g, and recast. If they are not found, this message will print:
``` 
1:1  error  `b` : is not a dependency in the local package.json  require-in-package
```

Usage
-----
`npm install eslint-plugin-require-in-package`

.eslintrc
```
{
  "parser": "babel-eslint",
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "ecmaFeatures": {
    "modules": true,
    "jsx": true
  },
  "plugins": ["require-in-package"],
  // 0 - turn rule off
  // 1 - rule generates warnings
  // 2 - rule generates errors
  "rules": {
    "require-in-package/require-in-package": 2
  }
}
```


