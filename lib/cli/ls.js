var resolveChallenges  = require('../utils/challenge/resolve');

/**
 * List all found modules. Useful for debugging.
 *
 * @return {Promise}
 */
module.exports = function () {
  return resolveChallenges(process.cwd())
    .then(function (dirs) {
      console.log(dirs.join('\n'));
    });
};
