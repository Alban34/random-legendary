const path = require('path');

module.exports = {
    entry: './dist/out-tsc/src/server.js',
    output: {
        filename: 'random-legendary.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",
    target: 'node'
};
