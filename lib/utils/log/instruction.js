var log = require('./log');

/**
 * Log an instruction to the console.
 *
 * @param {String} instruction
 */
module.exports = function (instruction) {
  log('    ' + instruction);
};
