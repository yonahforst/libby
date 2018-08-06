// write to a global variable called 'CONTEXT'

module.exports = (key, value) => {
// every key should be prefixed with 'x-correlation-'
  if (!key.startsWith("x-correlation-")) {
    key = "x-correlation-" + key
  }

// if the context doesnt exist, initialize it
  if (!global.CONTEXT) {
    global.CONTEXT = {}
  }
  
  global.CONTEXT[key] = value
}
