const path = require('path');

module.exports = {
    entry: './index.js',
    mode: 'development',
    output: {
        path: path.join(__dirname),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    devtool: 'source-map'
}
