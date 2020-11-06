const { test } = require('tap')
const EventFactory = require('../eventFactory')

test('Event Factory allows to setup the host metadata', assert => {

  const producerName = 'testService'
  const testEventFactory = new EventFactory(producerName);

  const firstEvent = testEventFactory.create('1234', 'test_event', {id: '123'})
  const secondEvent = testEventFactory.create('1234', 'anotherTest', {id: '123'})

  assert.equal(firstEvent.meta.host, producerName )
  assert.equal(secondEvent.meta.host, producerName )

  assert.end()
})

test('Event Factory metadata contains created_at field', assert => {

  const producerName = 'testService'
  const testEventFactory = new EventFactory(producerName);

  const firstEvent = testEventFactory.create('1234', 'test_event', {id: '123'})

  assert.equal(firstEvent.meta.hasOwnProperty('created_at'), true)
  assert.end()
})

test('Cannot create an EventFactory without a service name', assert => {

  try{
    new EventFactory();
  } catch(err){
    assert.equal(err.message, 'Event Factory must have a serviceName' )
  }

  assert.end()
})

test('Cannot create an anemic domain event (no data) ', assert => {

  const producerName = 'testService'
  const testEventFactory = new EventFactory(producerName);

  
  try{
    firstEvent = testEventFactory.create('1234', 'test_event', {})
  } catch(err){
    assert.equal(err.message, 'typeof attributes must be object and must contain data!' )
  }
  assert.end()
})