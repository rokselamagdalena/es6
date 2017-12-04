var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extrectPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        // publicPath: "/dist"
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
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use:
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "img/",
                            publicPath: "/"
                        }

                    }
            }
        ]
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        extrectPlugin,
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/users.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};