var _            = require('lodash');
var util         = require('util');
var Bluebird     = require('bluebird');
var Orchestrator = require('orchestrator');

/**
 * Create an exercise for the user by defining tasks using standardised names.
 * This is essentially just a dumb wrapper around Orchestrator.
 *
 * @param {string} name
 */
var Exercise = module.exports = function (name) {
  Orchestrator.call(this);

  this.name = name;
};

/**
 * Exercises inherit from orchestrator, which gives us a nice async flow.
 */
util.inherits(Exercise, Orchestrator);

/**
 * Make ochestrator methods return promises for cleaner flow control.
 *
 * @param {String} name
 * @param {Array}  opts
 */
Exercise.prototype.start = function (tasks, opts) {
  var self = this;
  var args = Array.isArray(tasks) ? _.clone(tasks) : [tasks];

  // Allow arguments to be defined on the context object for tasks.
  this._ = opts || [];

  return new Bluebird(function (resolve, reject) {
    /**
     * Passes a callback function to the ochestrator task runner. The callback
     * will then resolve the promise object.
     *
     * @param {Error} err
     */
    args.push(function (err) {
      // Delete the arguments from the context object.
      delete self._;

      // Resolve the promise.
      return err ? reject(err) : resolve();
    });

    return Orchestrator.prototype.start.apply(self, args);
  });
};
