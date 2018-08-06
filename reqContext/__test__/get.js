const { test } = require('tap')

const get = require('../get')

test('get', assert => {
  global.CONTEXT = { foo: 'bar' }
  
  assert.deepEquals(get(), { foo: 'bar' }, 'returns context')
  assert.end()
})

test('get - missing context', assert => {
  global.CONTEXT = undefined
  
  assert.deepEquals(get(), { }, 'empty object')
  assert.end()
})