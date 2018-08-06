// taken from here:
// https://theburningmonk.com/2017/09/capture-and-forward-correlation-ids-through-different-lambda-event-sources/
// basically, we're using a global variable called 'CONTEXT' share correlation ids between various libraries
// e.g. 
// 1 - the SNS lib sets the correlation id from an inbound request.
// 2 - the LOG lib adds that correlation id to all log messages
// 3 - the LAMBDA lib forwards the correlation id to downstream invoked services

module.exports = {
  clear: require('./clear'),
  replace: require('./replace'),
  set: require('./set'),
  get: require('./get'),
}
