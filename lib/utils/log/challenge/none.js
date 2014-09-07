var chalk = require('chalk');
var log   = require('../log');
var cross = require('../format/cross');

/**
 * Tell the user when there are no challenges installed yet.
 */
module.exports = function (dirname) {
  log();
  log(cross('No challenges have been installed'));
  log();
  log(
    'Try installing your first challenge:',
    chalk.yellow('npm install -g code-challenge-euler')
  );
  log();
};
