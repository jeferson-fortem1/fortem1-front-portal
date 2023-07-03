import { ExtendedAPIPlugin, DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import JavaScriptObfuscator from 'webpack-obfuscator';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rootDir = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(rootDir, 'build');

import commonConfig from './common';

const domain = process.env.BUILD_DOMAIN ? process.env.BUILD_DOMAIN.split(',') : [];

const plugins = [
    new ExtendedAPIPlugin(),
    new DefinePlugin({ 'process.env.BUILD_EXPIRE': JSON.stringify(process.env.BUILD_EXPIRE) }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: false,
    }),
    new CopyWebpackPlugin({
        patterns: [{ from: 'public' }],
    }),
    new JavaScriptObfuscator({ rotateUnicodeArray: true, domainLock: domain }),
];

if (process.env.ANALYZE === '1') {
    plugins.push(new BundleAnalyzerPlugin());
}

const config = merge(commonConfig, {
    mode: 'production',
    output: {
        path: BUILD_DIR,
        filename: '[name].[hash].js',
        globalObject: 'this',
        publicPath: '/',
    },
    optimization: {
        usedExports: false,
        minimize: true,
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: ['file-loader'],
            },
            {
                test: /\.(css|sass|scss|pcss)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    'cache-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'thread-loader',
                        options: {
                            poolTimeout: Infinity,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                        },
                    },
                    
                ],
                
                exclude: /node_modules/,
            },

         
            

                  {
                    // Match js, jsx, ts & tsx files
                    test: /.(js|jsx)$/,
                    

                    
                    use: {
                        loader: "babel-loader"
                      }
                    
                 },
        ],
    },
    stats: {
        children: false,
    },
});

// eslint-disable-next-line import/no-default-export
export default config;
