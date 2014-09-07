var current             = require('../store/current');
var requireChallenge    = require('../challenge/require');
var logEmptyChallenge   = require('../log/challenge/empty');
var logMissingChallenge = require('../log/challenge/missing');

/**
 * Attempt to load the current challenge, logging any required user action.
 *
 * @return {Promise}
 */
module.exports = function () {
  return current.get('challenge')
    .then(function (dirname) {
      if (!dirname) {
        return logEmptyChallenge();
      }

      return requireChallenge(dirname)
        .catch(function () {
          return logMissingChallenge(dirname);
        });
    })
};
