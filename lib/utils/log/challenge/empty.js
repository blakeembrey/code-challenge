var log     = require('../log');
var command = require('../command');

/**
 * Prompt the user to select a challenge.
 */
module.exports = function () {
  log();
  log('No challenge has been selected. To select a challenge:');
  log();
  command('select');
  log();
};
