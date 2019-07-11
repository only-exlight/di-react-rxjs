import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BaseHrefWebpackPlugin } from 'base-href-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
        new CopyWebpackPlugin([{
                from: './src/assets',
                to: './build/[name].[ext]'
            },
            {
                from: './src/assets/fonts',
                to: './build/fonts/[name].[ext]'
            },
            {
                from: './src/favicon.ico',
                to: './favicon.ico'
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
          }),
    ];
    return plugins;
};
