var replace = require("replace")
var config = require('../client_config')
var utils = require('./utils')

replace({
  regex: '__DEV_SCRIPT__',
  replacement: '<script src="' + config.dev.assetsPublicPath + 'app.js"></script>',
  paths: [config.build.index],
  silent: true
})