const { test } = require('tap')
const proxyquire = require('proxyquire')

test('handler', async assert => {
  let context

  const handler = proxyquire('../handler', {
    './_requestContext': {
      replace: params => context = params,
    },
    './_base64': {
      decode: obj => ({ decoded: obj }),
    }
  })

  const func = params => params

  const res = await handler(func)(
    { some: 'event' }, 
    {
      clientContext: {
        foo: 'bar',
      }
    }
  )

  assert.deepEquals(context, { decoded: { foo: 'bar' }}, 'sets context from clientContext')
  assert.deepEquals(res, { some: 'event' }, 'sends event to function')
})