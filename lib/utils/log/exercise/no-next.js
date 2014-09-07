var log     = require('../log');
var command = require('../command');

module.exports = function () {
  log();
  log('No more exercises in the current challenge.');
  log('Maybe it\'s time to try a new challenge?');
  log();
  command('select');
  log();
};
