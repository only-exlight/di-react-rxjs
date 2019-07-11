import { DefinePlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BaseHrefWebpackPlugin } from 'base-href-webpack-plugin'

export const getPlugins = (mode, domain) => {
    const plugins = [
        new DefinePlugin({
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
        new ExtractTextPlugin('style.css'),
    ];
    return plugins;
};
