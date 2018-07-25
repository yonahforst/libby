const { test } = require('tap')
const parse = require('../parse')

test('parse', assert => {
  const records = [{
    Sns: {
      MessageAttributes: {
        foo: {
          StringValue: 'bar',
        }
      },
      Message: '{"bar":"baz"}'
    }
  }]

  const expected = [{
    context: {
      foo: 'bar',
    },
    event: {
      bar: 'baz',
    }
  }]

  const res = parse(records)

  assert.deepEquals(res, expected, 'parses event and context')
  assert.end()
})