const log = require('./_log')
const AWS = require('../aws')

const stepfunctions = new AWS.StepFunctions({
  region: 'eu-west-1',
  endpoint: process.env.LOCALSTACK_HOSTNAME 
    ? `http://${process.env.LOCALSTACK_HOSTNAME}:4566`
    : undefined,
})

function cancelArn(executionArn) {
  return stepfunctions.stopExecution({
    executionArn,
    cause: 'canceled',
  }).promise()
    .then((res) => ({ ...res, executionArn }));
}

module.exports = (arn, externalId) => {
  log.debug('libby/stepFunction startExecution', { arn, externalId })

  const params = {
    stateMachineArn: arn,
    statusFilter: 'RUNNING',
  };

  return stepfunctions.listExecutions(params).promise()
    .then((res) => res.executions.filter((item) => item.name.indexOf(externalId) === 0))
    .then((res) => Promise.all(res.map((item) => cancelArn(item.executionArn))));
}
