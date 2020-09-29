const { test } = require('tap')
const proxyquire = require('proxyquire')




test('index', assert => {
  const index = proxyquire('../index', {
    './_requestContext': {
      get: () => ({
        logLevel: 'INFO',
        foo: 'bar',
      })
    }
  })

  assert.deepEquals(
    index.info('hi', { bar: 'baz' }),
    {
      level: 'INFO',
      logLevel: 'INFO',
      foo: 'bar',
      message: 'hi',
      params: {
        bar: 'baz',
      },
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
      params: {
        bar: 'baz',
      },
      awsRegion: null,
      error: undefined,
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
      params: {
        bar: 'baz',
      },
      awsRegion: null,
      functionMemorySize: null,
      functionName: null,
      stage: null,
      error: {
        name: 'someName',
        message: 'someMessage',
        stack: 'someStack',
      }
    },
    'parses and logs errors'
  )

  

  assert.end()
})


test('index - logLevel from env', assert => {
  process.env.logLevel = 'DEBUG'

  let context = {
    foo: 'bar',
  }

  const index = proxyquire('../index', {
    './_requestContext': {
      get: () => context,
      replace: c => context = c,
    }
  })

  assert.deepEquals(
    index.debug('hi', { bar: 'baz' }),
    {
      level: 'DEBUG',
      logLevel: 'DEBUG',
      foo: 'bar',
      message: 'hi',
      params: {
        bar: 'baz',
      },
      awsRegion: null,
      functionMemorySize: null,
      functionName: null,
      stage: null,
    },
    'logs message to debug with context and params'
  )

  assert.deepEquals(
    index.warn('hi', { bar: 'baz' }),
    {
      level: 'WARN',
      logLevel: 'DEBUG',
      foo: 'bar',
      message: 'hi',
      params: {
        bar: 'baz',
      },
      awsRegion: null,
      error: undefined,
      functionMemorySize: null,
      functionName: null,
      stage: null,
    },
    'logs higher levels'
  )

  assert.end()
})