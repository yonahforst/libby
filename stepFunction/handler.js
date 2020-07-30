const requestContext = require('./_requestContext')
const log = require('./_log')

module.exports = func => ({
  __context,
  ...event
}) => {
  if (requestContext && __context) {
    requestContext.replace(__context)
    log.debug('stepFunction.handler: set requestContext from __context parameter')
  }

  return func(event)
}