module.exports = records => {
  return records.map(({ Sns }) => {
    let context = {}

    // try to load any context from MessageAttributes
    for (let key in Sns.MessageAttributes) {
      context[key] = Sns.MessageAttributes[key].Value
    }

    return {
      context,
      event: JSON.parse(Sns.Message)
    }
  })
}