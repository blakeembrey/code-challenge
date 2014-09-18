var logCommandError = require('../utils/log/command-error');

/**
 * Map of available commands.
 *
 * @type {Object}
 */
var COMMANDS = {
  ls:       require('./ls'),
  run:      require('./run'),
  next:     require('./next'),
  prev:     require('./prev'),
  help:     require('./help'),
  reset:    require('./reset'),
  print:    require('./print'),
  select:   require('./select'),
  verify:   require('./verify'),
  exercise: require('./exercise')
};

/**
 * Correctly route command line arguments.
 *
 * @param {Object} argv
 */
exports.argv = function (argv) {
  var command = argv._[0];
  var args    = argv._.slice(1);

  if (!COMMANDS.hasOwnProperty(command)) {
    command = 'help';
  }

  return COMMANDS[command](args).catch(logCommandError);
};
