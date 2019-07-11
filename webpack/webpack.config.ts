import { sync } from 'rimraf';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BUILD_FOOLDER } from './webpack.const';
import { getPlugins } from './webpack.plugins';
import { chooseMode as getMode } from './webpack.modes';

export default (_, argv) => {
    console.warn(__dirname.split('/').slice(0, -1).join('/'), __dirname);
    const isProd = getMode(argv.mode);
    sync(BUILD_FOOLDER);
    return {
        entry: './src/main.tsx',
        output: {
            path: __dirname.split('/').slice(0, -1).join('/') + BUILD_FOOLDER,
            filename: '[name].[hash].bundle.js',
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx', '.jsx','.json', ]
        },
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'tslint-loader',
            }, {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }, {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: isProd,
                            sourceMap: isProd,
                            url: true,
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isProd
                        }
                    }]
                })
            }]
        },
        plugins: getPlugins(isProd, null),
        optimization: {
            minimize: isProd,
            noEmitOnErrors: true,
            removeAvailableModules: true,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devtool: isProd ? false : 'source-map',
        devServer: {
            https: true,
            host: '0.0.0.0',
            inline: true,
            historyApiFallback: true,
            contentBase: __dirname + BUILD_FOOLDER
        }
    };
};
