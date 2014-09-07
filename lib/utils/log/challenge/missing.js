var log     = require('../log');
var command = require('../command');
var cross   = require('../format/cross');

/**
 * Log missing challenges and prompt user action.
 *
 * @param {String} dirname
 */
module.exports = function (dirname) {
  log();
  log(cross('The challenge at "' + chalk.bold(dirname) + '" no longer exists'));
  log();
  log('To select a new challenge:');
  log();
  command('select');
  log();
};
