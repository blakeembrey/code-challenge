var chalk = require('chalk');

/**
 * Prepend the checkmark to any text.
 *
 * @param  {String} text
 * @return {String}
 */
module.exports = function (text) {
  return chalk.bold.green('✓') + (text ? ' ' + text : '');
};
