// replace the entire context with a new object
// use 'set' so that keys are prefixed correctly

const clear = require('./clear')
const set = require('./set')

module.exports = ctx => {
  clear()

  for (let key in ctx) {
    set(key, ctx[key])
  }
}
