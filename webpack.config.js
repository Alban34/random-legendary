const path = require('path');

module.exports = {
    entry: './dist/out-tsc/server.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",
    target: 'node'
};
