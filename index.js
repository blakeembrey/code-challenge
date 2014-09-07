var Challenge = require('./lib/challenge');

/**
 * Exports a static challenge instance. Having multiple instances internally
 * makes testing somewhat easier to handle.
 *
 * @type {Challenge}
 */
module.exports = new Challenge();
