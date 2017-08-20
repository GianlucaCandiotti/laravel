var replace = require("replace")
var config = require('../client_config')

replace({
  regex: '(\/static.+?(.js|.css))',
  replacement: '"{{ asset(\'$1\') }}"',
  paths: [config.build.index],
  silent: true
})

replace({
  regex: '__DEV_SCRIPT__',
  replacement: '',
  paths: [config.build.index],
  silent: true
})
