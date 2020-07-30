const { test } = require('tap')
const proxyquire = require('proxyquire')

test('handler', async assert => {
  let context

  const handler = proxyquire('../handler', {
    './_requestContext': {
      replace: params => context = params,
    }
  })

  const func = params => params

  const res = await handler(func)({ 
    some: 'event',
    __context: {
      foo: 'bar'
    }
  })

  assert.deepEquals(context, { foo: 'bar' }, 'sets context from clientContext')
  assert.deepEquals(res, { some: 'event' }, 'sends event to function')
})