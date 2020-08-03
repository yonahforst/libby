module.exports.encode = (obj) => {
  if (typeof obj == 'object')
    obj = JSON.stringify(obj)

  return Buffer.from(obj).toString('base64')
}

const isJSON = str => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

const isBase64JSON = str => {
  return isJSON(Buffer.from(str, 'base64').toString())
}

//code around this bug https://github.com/localstack/localstack/issues/2758
const decode = (obj) => {
  if (typeof obj == 'object') {
    return obj.custom 
      ? obj.custom 
      : obj
  }

  if (isJSON(obj)) {
    return decode(JSON.parse(obj))
  }

  if (isBase64JSON(obj)) {
    return decode(Buffer.from(obj, 'base64').toString())
  } 
}

module.exports.decode = decode