const reqContext = require('./_requestContext')
const parse = require('./parse')

module.exports = func => async records => {
  const parsed = parse(records)
  
  for (let record of parsed) {
    if (reqContext)
      reqContext.replaceAllWith(record.context)

    await func(record.event)
  }
}