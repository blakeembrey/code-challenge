var complete         = require('../store/complete');
var requireChallenge = require('./require');

/**
 * Check whether a challenge has been completed.
 *
 * @param  {Object}  challenge
 * @return {Promise}
 */
module.exports = function (challenge) {
  return complete.get(challenge.dirname)
    .then(function (completed) {
      return challenge.exercises.every(function (exercise) {
        return completed.indexOf(exercise.name) !== -1;
      });
    });
};
