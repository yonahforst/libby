const log = require('./log')

let requestContext

try {
  requestContext = require('libby.reqcontext')
} catch {
  log.debug('requestContext not available') 
}

module.exports = requestContext