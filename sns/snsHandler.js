const reqContext = require('./_requestContext')
const parse = require('./parse')

module.exports = func => async (params) => {
  const records = params.Records ? params.Records : params
  const parsed = parse(records)
  
  for (let record of parsed) {
    if (reqContext)
      reqContext.replace(record.context)

    await func(record.event)
  }
}