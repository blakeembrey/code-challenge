var log    = require('./log');
var format = require('./format/heading');

/**
 * Log a heading to the console.
 *
 * @param {String} heading
 */
module.exports = function (heading) {
  log(format(heading));
  log();
};
