let AWS;
if (process.env.LAMBDA_RUNTIME_DIR && process.env._X_AMZN_TRACE_ID) {
  const AWSXRay = require('aws-xray-sdk-core')
  AWS = AWSXRay.captureAWS(require('aws-sdk'))
} else {
  AWS = require('aws-sdk')
}
module.exports = AWS