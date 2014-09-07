/**
 * Find an exercise by name on a challenge instance.
 *
 * @param  {Object} challenge
 * @param  {String} name
 * @return {Object}
 */
module.exports = function (challenge, name) {
  for (var i = 0; i < challenge.exercises.length; i++) {
    var exercise = challenge.exercises[i];

    if (exercise.name === name) {
      return exercise;
    }
  }
};
