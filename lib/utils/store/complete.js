var data = require('./data');

/**
 * Create a key to store results.
 *
 * @param  {String} name
 * @return {String}
 */
var key = function (name) {
  return 'completed:' + name;
};

/**
 * Add an exercise to the completed array of a challenge.
 *
 * @param  {String}  challenge
 * @param  {String}  exercise
 * @return {Promise}
 */
exports.add = function (challenge, exercise) {
  return this.get(challenge).then(function (completed) {
    // If the exercise has not already been completed, push it into storage.
    if (completed.indexOf(exercise) === -1) {
      completed.push(exercise);

      return data.set(key(challenge), completed);
    }

    return completed;
  });
};

/**
 * Get all completed exercises for a challenge.
 *
 * @param  {String}  challenge
 * @return {Promise}
 */
exports.get = function (challenge) {
  return data.get(key(challenge)).then(function (completed) {
    return completed || [];
  });
};

/**
 * Remove the results for a challenge.
 *
 * @param  {String}  challenge
 * @return {Promise}
 */
exports.remove = function (challenge) {
  return data.remove(key(challenge));
};
