const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        mythical: path.resolve(__dirname, 'src/main.tsx')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    }
                }
            }
        ]
    },
    output: {
        filename: 'mythical.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/template/index.html'),
                    to: path.resolve(__dirname, 'public'),
                },
                {
                    from: path.resolve(__dirname, 'src/assets/images'),
                    to: path.resolve(__dirname, 'public/images'),
                },
                {
                    from: path.resolve(__dirname, 'src/assets/css'),
                    to: path.resolve(__dirname, 'public/css'),
                }
            ]
        })
    ],
    resolve: {
        extensions: [
            '.js',
            '.ts',
            '.jsx',
            '.tsx'
        ]
    },
    devtool: 'source-map'
};