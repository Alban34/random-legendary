import fs from 'fs-extra';

const assetGeneratedPath = './assets/generated/';
fs.mkdirsSync(assetGeneratedPath);

fs.copyFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css',
    `${assetGeneratedPath}bootstrap.min.css`);
fs.copyFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css.map',
    `${assetGeneratedPath}bootstrap.min.css.map`);
fs.copyFileSync('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    `${assetGeneratedPath}bootstrap.bundle.min.js`);
fs.copyFileSync('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map',
    `${assetGeneratedPath}bootstrap.bundle.min.js.map`);
