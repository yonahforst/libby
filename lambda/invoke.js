const requestContext = require('./_requestContext')
const log = require('./_log')
const AWS = require('../aws')

const lambda = new AWS.Lambda({
  region: 'eu-west-1',
  endpoint: process.env.LOCALSTACK_HOSTNAME 
    ? `http://${process.env.LOCALSTACK_HOSTNAME}:4574` 
    : undefined,
})

module.exports = FunctionName => async payload => {
  const params = {
    FunctionName,
    Payload: JSON.stringify(payload),
  }

  // load any context and pass it along.
  // the context needs to be sent as a base64 encoded string
  if (requestContext) {
    const context = requestContext.get()

    // stringify and convert to base64
    params.ClientContext = Buffer.from(JSON.stringify(context)).toString('base64')
    log.debug('lambda.invoke: set outbound ClientContext from requestContext')
  }

  log.debug('libby/lambda invoke', { FunctionName, payload })

  const res = await lambda.invoke(params).promise()

  log.debug('libby/lambda response', res)

  // this only check that the lambda invocation was successfull.
  if (res.StatusCode !== 200 && res.StatusCode !== 201) {
    throw res
  }

  const parsed = JSON.parse(res.Payload)

  // we need to check for function errors here, since lambda INVOKE will return 200
  if (parsed && parsed.errorMessage) {
    throw parsed.errorMessage
  }

  if (parsed == null) {
    log.warn('libby/lambda response payload was null', res);
  }
  

  return parsed
}
