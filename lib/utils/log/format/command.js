var chalk = require('chalk');

/**
 * Format the command line arguments for the console.
 *
 * @param {Array} args
 */
module.exports = function (args) {
  var command = chalk.bold.green('challenge');

  if (args && args.length) {
    command += ' ' + chalk.bold(args.join(' '));
  }

  return command;
};
