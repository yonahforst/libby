const { test } = require('tap')

const base64 = require('../_base64')

test('encode', assert => {
  const obj = { foo: 'bar' }
  const expected = 'eyJmb28iOiJiYXIifQ=='

  assert.equals(expected, base64.encode(obj), 'an object')
  assert.equals(expected, base64.encode(JSON.stringify(obj)), 'a json string')
  assert.end()
})

test('decode', assert => {
  const obj = { foo: 'bar' }

  assert.deepEquals(obj, base64.decode(obj), 'an object')
  assert.deepEquals(obj, base64.decode({ custom: obj }), 'an object nested under custom')
  assert.deepEquals(obj, base64.decode(JSON.stringify(obj)), 'a json object')
  assert.deepEquals(obj, base64.decode(JSON.stringify({ custom: obj })), 'a json object nested under custom')
  assert.deepEquals(obj, base64.decode(base64.encode(obj)), 'a base64 json object')
  assert.deepEquals(obj, base64.decode(base64.encode({ custom: obj })), 'a base64 json object nested under custom')

  assert.end()
})