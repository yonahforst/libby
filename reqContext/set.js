// write to a global variable called 'LIBBY_CONTEXT'

module.exports = (key, value) => {
// every key should be prefixed with 'x-libby-'
  if (!key.startsWith("x-libby-")) {
    key = "x-libby-" + key
  }

// if the context doesnt exist, initialize it
  if (!global.LIBBY_CONTEXT) {
    global.LIBBY_CONTEXT = {}
  }
  
  global.LIBBY_CONTEXT[key] = value
}
