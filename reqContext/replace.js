const clear = require('./clear')
const set = require('./set')

module.exports = ctx => {
  clear()

  for (let key in ctx) {
    set(key, ctx[key])
  }
}
