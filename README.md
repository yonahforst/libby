# libby

Libby is a wrapper library for interacting with AWS services.

It currently supports:
 - Lambda
 - SNS
 - StepFunctions
 
Why use Libby, you ask? Great question. One of the difficult things in distributed architectures is tracing: following an event/request as it flows through your system. Libby tries to help you with this by giving you a 'context' object for passing data along as you invoke other services.

## How to use:
The first step is to wrap your lambda handler functions with one of the libby helpers, depending on how they are invoked. This will take any context data passed down from upstream services and make it available within the lambda invocation.
For example, if you have a `serverless.yml` file like this:
```yml
functions:
  hello:
    handler: handler.hello

  goodbye:
    handler: handler.goodbye
    events:
      - sns: goodbyeTopic

  step1:
    handler: handler.step1
      
```
you should have your handler file like this:
```js
const lambda = require('libby/lambda')
const sns = require('libby/sns')
const stepFunction = require('libby/stepFunction')

// for direct lambda invocations
module.exports.hello = lambda.handler(event => {
  //handle your event here
})

// for invocations via SNS subscriptions
module.exports.goodbye = sns.snsHandler(message => {
  //handle the message object here
})

// for invocatinos by step functions
module.exports.step1 = stepFunction.handler(event => {
  // handle the stepFunction event
})
```
If you want to access the context object somwhere in your code, you can do it like this:
```js
const context = require('libby/reqContext');

module.exports = () => {
  context.set('someKey', { some: 'value' } )
  context.set('anotherKey', 'anotherValue')
  const contextObj = context.get()
  //...
}
```
Finally, when you want to invoke another service, you do it like so:
```js
const lambda = require('libby/lambda')
const sns = require('libby/sns')
const stepFunction = require('libby/stepFunction')

const someOtherService = lambda.invoke('functionName')

module.exports = async () => {
  await someOtherService({ some: 'payload' })
  //or
  await sns.publish('some topic', { some: 'payload' })
  // or
  await stepFunction.startExecution('stepFunctionArn', 'id1234567', { some: 'payload' })
}
```
When you invoke other services using the the libby helpers (as demonstrated just above), the context object is passed along and captured by the handlers on the other side (as demonstrated in the first step)


## Bonus section
Libby comes with a logging library, which is probably the most useful part.
When you log using the libby library, the context is included in the log message. This allows you set a correlation id when a request enters your system and use it to correlate the logs between different services.
The logger has four levels
```js
const log = require('libby/log')
log.debug('just a debug message', { some: 'additional params' }) //you can also pass an object as the second argument
log.info('this is for your info')
log.warn('something bad is going on')
log.error('bigtime error. red alert')
```
Log levels let you add lots of logging without polluting your log stream. You set the desired log level and you'll only see logs from that level or higher. When you want more information, you just set a lower log level and you'll see more logs.

Libby first tries to read the log level from the context, then from a `logLevel` environment variable, and then defaults to 'info'. This means (here's the cool part) that if you set a `logLevel=debug` in the environment of an upstream service, all downstream services will also use that debug log level 😎😎
