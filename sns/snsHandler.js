const reqContext = require('./_requestContext')
const snsHandler = func => async records => {
  const parsed = parse(records)
  
  for (let record of parsed) {
    if (reqContext)
      reqContext.replaceAllWith(record.context)

    await func(record.event)
  }
}