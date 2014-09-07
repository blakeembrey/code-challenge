var log     = require('./log');
var format  = require('./format/command');
var __slice = Array.prototype.slice;

/**
 * Log the command to the console.
 *
 * @param {String} [..args]
 */
module.exports = function (/* ...args */) {
  log('  ' + format(__slice.call(arguments)));
};
