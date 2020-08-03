const requestContext = require('./_requestContext')
const log = require('./_log')

const { decode } = require('./_base64')

module.exports = func => (event, context={}) => {
  let { clientContext } = context
  
  //code around this bug https://github.com/localstack/localstack/issues/2758
  if (clientContext)
    clientContext = decode(clientContext)

  if (requestContext && clientContext) {
    requestContext.replace(clientContext)
    log.debug('lambda.handler: set requestContext from inbound ClientContext')
  }

  return func(event)
}