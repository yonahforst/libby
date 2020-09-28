const reqContext = require('./_requestContext')
const parse = require('./parse')
const log = require('./_log')

module.exports = func => async (params) => {
  const records = params.Records ? params.Records : params
  const parsed = parse(records)
  
  for (let record of parsed) {
    if (reqContext)
      reqContext.replace(record.context)

    log.debug('libby/sns snsHandler', record.event)

    await func(record.event)
  }
}