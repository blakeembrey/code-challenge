var data = require('./data');

/**
 * Get the current persistent data.
 *
 * @param  {String}  [name]
 * @return {Promise}
 */
exports.get = function (name) {
  return data.get('current').then(function (current) {
    current = current || {};

    return name ? current[name] : current;
  });
};

/**
 * Set the current persistent state.
 *
 * @param {String} name
 * @param {*}      value
 */
exports.set = function (name, value) {
  // Override the entire object.
  if (typeof name === 'object') {
    return data.set('current', name);
  }

  // Set a single value.
  return this.get().then(function (current) {
    current[name] = value;

    return data.set('current', current);
  });
};

/**
 * Remove current persistence state.
 *
 * @param  {String}  name
 * @return {Promise}
 */
exports.remove = function (name) {
  // Remove all current data.
  if (!name) {
    return data.remove('current');
  }

  // Remove a single value.
  return this.get().then(function (current) {
    // The value exists, so we need to persist deletion.
    if (current.hasOwnProperty(name)) {
      delete current[name];

      return data.set('current', current);
    }

    return current;
  });
};
