var chalk = require('chalk');
var log   = require('../log');
var cross = require('../format/cross');

/**
 * Tell the user when there are no challenges installed yet.
 */
module.exports = function (dirname) {
  log();
  log(cross('No challenges are installed. Try Project Euler:'
  ));
  log();
  log(chalk.bold.yellow('  npm install -g code-challenge-euler'));
  log();
};
