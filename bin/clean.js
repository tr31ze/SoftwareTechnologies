'use strict';

const RimRaf = require('rimraf');
const Path = require('path');
const Fs = require('fs');

const dir = Path.resolve(__dirname,'../build');

RimRaf(dir, function (err) {
    if (err) throw err;

    if (process.argv.indexOf('createdir') >= 0) Fs.mkdirSync(dir);
});