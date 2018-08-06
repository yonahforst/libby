module.exports = (key, value) => {
  if (!key.startsWith("x-correlation-")) {
    key = "x-correlation-" + key
  }

  if (!global.CONTEXT) {
    global.CONTEXT = {}
  }
  
  global.CONTEXT[key] = value
}
