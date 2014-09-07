var chalk  = require('chalk');
var repeat = require('repeat-string');
var log    = require('./log');

/**
 * Log a separator to the terminal interface.
 */
module.exports = function () {
  log(chalk.dim(repeat('-', process.stdout.columns)));
};
