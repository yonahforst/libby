module.exports = records => {
  return records.map(({ Sns }) => {
    let context = {}

    for (let key in Sns.MessageAttributes) {
      context[key] = Sns.MessageAttributes[key].StringValue
    }

    return {
      context,
      event: JSON.parse(Sns.Message)
    }
  })
}