var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtrectTextPlugin = require('extract-text-webpack-plugin');

var extrectPlugin = new ExtrectTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: "./main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "/dist"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }

                    }
            },
            {
                test: /\.scss$/,
                use: extrectPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        extrectPlugin
    ]
};