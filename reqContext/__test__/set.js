const { test } = require('tap')

const set = require('../set')

test('set', assert => {
  global.CONTEXT = undefined

  const expected = { 'x-correlation-foo': 'bar' }

  set('foo', 'bar')

  assert.deepEquals(global.CONTEXT, expected, 'sets context with key prefix')
  assert.end()
})

test('set - with prefix', assert => {
  global.CONTEXT = { 'x-correlation-foo': 'bar' }
  
  const expected = { 
    'x-correlation-foo': 'bar',
    'x-correlation-bar': 'foo',
  }

  set('x-correlation-bar', 'foo')

  assert.deepEquals(global.CONTEXT, expected, 'does not add prefix if it already exists')
  assert.end()
})