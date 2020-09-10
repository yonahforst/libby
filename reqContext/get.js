// get the current context
// return an empty object if it doesnt exist yet
module.exports = () => {
  if (!global.LIBBY_CONTEXT)
    return {}

  // remove any x-libby- prefixes
  return Object.keys(global.LIBBY_CONTEXT).reduce((p, c) => ({
    ...p,
    [ c.replace(/^x-libby-/, '') ]: global.LIBBY_CONTEXT[c], 
  }), {})
}
