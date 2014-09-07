#!/usr/bin/env node

var cli  = require('../lib/cli');
var argv = require('yargs').argv;

/**
 * Pass all arguments off to the CLI module.
 */
cli.argv(argv);
