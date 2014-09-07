var resolveInstance = require('./instance');

module.exports = function (basedir) {
  // Require the main challenge file before loading the challenge data.
  require(basedir);

  // Resolve the challenge instance and require.
  return resolveInstance(basedir).then(function (module) {
    var challenge = require(module[0]);

    challenge.dirname = basedir;

    return challenge;
  });
};
