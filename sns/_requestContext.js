let log = require('./_log')

let requestContext

try {
  requestContext = require('libby.reqcontext')
} catch (e) {
  log.debug('requestContext not available') 
}

module.exports = requestContext