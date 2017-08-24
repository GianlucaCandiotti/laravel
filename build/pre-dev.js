// https://github.com/shelljs/shelljs
var shell = require('shelljs')
var utils = require('./utils')

var source = utils.resolve('resources/assets/index.html')
var destination = utils.resolve('resources/views/layouts/base.blade.php')

shell.cp(source, destination)
