var chalk          = require('chalk');
var Bluebird       = require('bluebird');
var ScrollableList = require('term-list-scrollable');

/**
 * Create a CLI list and resolve on selection. Makes a more usable promise
 * based UI than previously provided.
 *
 * @param  {Array}   items
 * @param  {Object}  opts
 * @return {Promise}
 */
module.exports = function (items, opts) {
  return new Bluebird(function (resolve, reject) {
    var padding = 4 + (opts.footer ? 2 : 0);

    var list = new ScrollableList({
      marker:       chalk.red('› '),
      markerLength: 2,
      viewportSize: Math.max(4, process.stdout.rows - padding)
    });

    // Resolve immediately when no items are present.
    if (!items || items.length === 0) {
      return resolve({ action: 'empty' });
    }

    // Iterate over each item in the list and render.
    items.forEach(function (item) {
      list.add(item[0], item[1]);
    });

    // Listen for hitting enter.
    list.on('keypress', function (key, item) {
      if (key.name === 'return') {
        list.stop();

        return resolve({
          item:   item,
          action: 'select'
        });
      }

      if (key.name === 'c' && key.ctrl) {
        list.stop();

        return resolve({
          item:   item,
          action: 'exit'
        });
      }
    });

    // Support empty lists.
    list.on('empty', function () {
      list.stop();

      return resolve({ action: 'empty' });
    });

    // An existing element can be set to selected.
    if (opts.selected) {
      list.select(opts.selected);
    }

    // Append a fixed footer to the menu.
    if (opts.footer) {
      list.footer('\n    ' + chalk.bold(opts.footer));
    }

    // Start the list rendering.
    list.start();
  });
};
