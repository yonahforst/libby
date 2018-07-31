const { test } = require('tap')
const proxyquire = require('proxyquire')

const index = proxyquire('../index', {
  './_requestContext': {
    get: () => ({
      logLevel: 'INFO',
      foo: 'bar',
    })
  }
})


test('index', assert => {
  assert.deepEquals(
    index.info('hi', { bar: 'baz' }),
    {
      level: 'INFO',
      logLevel: 'INFO',
      foo: 'bar',
      message: 'hi',
      bar: 'baz',
      awsRegion: null,
      functionMemorySize: null,
      functionName: null,
      stage: null,
    },
    'logs message to info with context and params'
  )

  assert.false(
    index.debug('hi', { bar: 'baz' }),
    'does not log to lower levels'
  )

  assert.deepEquals(
    index.warn('hi', { bar: 'baz' }),
    {
      level: 'WARN',
      logLevel: 'INFO',
      foo: 'bar',
      message: 'hi',
      bar: 'baz',
      awsRegion: null,
      functionMemorySize: null,
      functionName: null,
      stage: null,
    },
    'logs higher levels'
  )

  assert.deepEquals(
    index.error('hi', { bar: 'baz' }, { name: 'someName', message: 'someMessage', stack: 'someStack'}),
    {
      level: 'ERROR',
      logLevel: 'INFO',
      foo: 'bar',
      message: 'hi',
      bar: 'baz',
      awsRegion: null,
      functionMemorySize: null,
      functionName: null,
      stage: null,
      errorName: 'someName',
      errorMessage: 'someMessage',
      stackTrace: 'someStack',
    },
    'parses and logs errors'
  )

  assert.end()
})