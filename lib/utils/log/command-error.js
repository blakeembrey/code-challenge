var chalk = require('chalk');
var log   = require('./log');
var cross = require('./format/cross');

module.exports = function (err) {
  log();
  log(cross('An error occured while executing your command:'));
  log();
  log(chalk.gray(err.stack));
  log();
};
