var data = require('../utils/store/data');

/**
 * Reset all challenge data.
 *
 * @return {Promise}
 */
module.exports = function () {
  return data.reset();
};
