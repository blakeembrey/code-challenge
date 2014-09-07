var Bluebird = require('bluebird');
var helpLog  = require('../utils/log/help');

/**
 * Provide the user with help documentation.
 *
 * @return {Promise}
 */
module.exports = function () {
  return Bluebird.resolve(helpLog());
};
