var Bluebird   = require('bluebird');
var Exercise   = require('./exercise');
var log        = require('../utils/log/log');
var render     = require('../utils/render/content');
var renderFile = require('../utils/render/file');

/**
 * Export a challenge constructor, used for setting up the code challenge.
 */
var Challenge = module.exports = function (name) {
  this.name      = name;
  this.exercises = [];
};

/**
 * Expose constructor functions.
 *
 * @type {Function}
 */
Challenge.prototype.Exercise  = Exercise;
Challenge.prototype.Challenge = Challenge;

/**
 * Create a new exercise to complete in the challenge.
 *
 * @param  {String}   name
 * @return {Exercise}
 */
Challenge.prototype.exercise = function (name) {
  var exercise = new Exercise(name);

  // Alias the challenge instance and index found.
  exercise.challenge = this;
  exercise.index     = this.exercises.length;

  // Push into the exercise into the array.
  this.exercises.push(exercise);

  return exercise;
};

/**
 * Print content to stdout with an optional language.
 *
 * @param  {String}  content
 * @param  {String}  language
 * @return {Promise}
 */
Challenge.prototype.print = function (content, language) {
  return render(content, language).then(log);
};

/**
 * Print a file to stdout with automatic language detection.
 *
 * @param  {String}  file
 * @return {Promise}
 */
Challenge.prototype.printFile = function (file) {
  return renderFile(file).then(log);
};

/**
 * Execute a file and return the response as a promise.
 *
 * @type {Function}
 */
Challenge.prototype.execFile = Bluebird.promisify(
  require('language-detect-exec')
);

/**
 * Spawn a file and return the child process object stream.
 *
 * @type {Function}
 */
Challenge.prototype.spawnFile = require('language-detect-spawn');
