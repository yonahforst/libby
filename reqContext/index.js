// taken from here:
// https://theburningmonk.com/2017/09/capture-and-forward-correlation-ids-through-different-lambda-event-sources/

module.exports = {
  clear: require('./clear'),
  replace: require('./replace'),
  set: require('./set'),
  get: require('./get'),
}
