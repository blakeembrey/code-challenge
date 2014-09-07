var log     = require('../log');
var command = require('../command');

module.exports = function () {
  log();
  log('You are currently at the first exercise in the challenge.');
  log('Did you want to look at all the exercises instead?');
  log();
  command('exercise');
  log();
};
