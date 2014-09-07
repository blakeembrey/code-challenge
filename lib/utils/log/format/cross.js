var chalk = require('chalk');

/**
 * Prepend the cross to any text.
 *
 * @param  {String} text
 * @return {String}
 */
module.exports = function (text) {
  return chalk.bold.red('✗') + (text ? ' ' + text : '');
};
