const VUE_APP = /^VUE_APP_/i;

module.exports = function (env) {
  return {
    'process.env':
      Object.keys(process.env)
        .filter(key => VUE_APP.test(key))
        .reduce((value, key) => {
          value[key] = JSON.stringify(process.env[key])

          return value
        }, {
          NODE_ENV: env
        })
  }
}
