const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const webpack = require('webpack');

    
const getPlugins = (mode, domain) => {
    const plugins = [
        new webpack.DefinePlugin({
            'API_URL': JSON.stringify(domain),
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            title: 'React App',
            template: './src/index.html',
            hash: true,
        }),
        new BaseHrefWebpackPlugin({
            baseHref: '/'
        }),
        new CopyWebpackPlugin([/*{
                from: './src/assets',
                to: './build/[name].[ext]'
            },
            {
                from: './src/assets/fonts',
                to: './build/fonts/[name].[ext]'
            },*/
            {
                from: './src/favicon.ico',
                to: './favicon.ico'
            }
        ]),
        new ExtractTextPlugin('style.[hash].css'),
    ];
    return plugins;
};

module.exports = getPlugins;
