const requestContext = require('./_requestContext')
const log = require('./_log')

module.exports = func => (event, context={}) => {
  if (requestContext && context.clientContext) {
    requestContext.replace(context.clientContext)
    log.debug('lambda.handler: set requestContext from inbound ClientContext')
  }

  return func(event)
}