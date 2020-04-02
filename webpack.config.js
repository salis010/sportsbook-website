const path = require('path')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
            {
                test: /\.(jpg|png)$/,
                use: {
                  loader: 'url-loader',
                },
            },
        ]
    },
    devtool: 'source-map'
}
