//  enable runtime transpilation to use ES6/7 in node

require('babel-register')({
  "presets": ["react", "es2015", "stage-0"],
  "plugins": [
    "transform-runtime",
    "add-module-exports",
    "syntax-dynamic-import",
    "dynamic-import-node"
  ]
});
