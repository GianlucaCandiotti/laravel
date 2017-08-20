var replace = require("replace")
var config = require('../client_config')
var utils = require('./utils')

replace({
  regex: '__DEV_SCRIPT__',
  replacement: '<script src="http://laravue.dev:8080/app.js"></script>',
  paths: [config.build.index],
  silent: true
})