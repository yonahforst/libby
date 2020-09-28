const requestContext = require('./_requestContext')
const log = require('./_log')
const AWS = require('../aws')

const stepfunctions = new AWS.StepFunctions({
  region: 'eu-west-1',
  endpoint: process.env.LOCALSTACK_HOSTNAME 
    ? `http://${process.env.LOCALSTACK_HOSTNAME}:4585`
    : undefined,
})

module.exports = (arn, externalId, payload) => {
  log.debug('libby/stepFunction startExecution', { arn, externalId, payload })

  const __context = requestContext ? requestContext.get() : {}
  
  const now = new Date().getTime();
  const params = {
    stateMachineArn: arn,
    name: `${externalId}-${now}`,
    input: JSON.stringify({
      __context,
      ...payload,
    }),
  };

  return stepfunctions.startExecution(params).promise();
}
