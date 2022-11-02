import fs from 'fs-extra';

fs.copyFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css',
    './assets/generated/bootstrap.min.css');
fs.copyFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css.map',
    './assets/generated/bootstrap.min.css.map');
fs.copyFileSync('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    './assets/generated/bootstrap.bundle.min.js');
fs.copyFileSync('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map',
    './assets/generated/bootstrap.bundle.min.js.map');
