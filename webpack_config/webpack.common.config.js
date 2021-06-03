const path = require('path');
const webpack = require('webpack');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const options = {
    antDir: path.join(__dirname, '../node_modules/antd'),
    stylesDir: path.join(__dirname, '../src/assets/css'),
    varFile: path.join(__dirname, '../src/assets/css/variables.less'),

    themeVariables: ['@primary-color'],
    indexFileName: '../src/template/index.html',
    generateOnce: false,
    lessUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js',
    publicPath: '',
    customColorRegexArray: [], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
};
module.exports = (env, argv) => ({
    entry: ['@babel/polyfill', './src/index.tsx'],
    target: 'web',
    output: {
        // publicPath: 'assets/',
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contenthash:8].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            react: 'preact/compat',
            'react-dom': 'preact/compat',
            utils: path.resolve(__dirname, '../src/utils'),
            components: path.resolve(__dirname, '../src/components'),
            assets: path.resolve(__dirname, '../src/assets'),
            pages: path.resolve(__dirname, '../src/pages'),
            store: path.resolve(__dirname, '../src/store'),
            hooks: path.resolve(__dirname, '../src/hooks'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: true,
                            }),
                        ],
                    }),
                },
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },

            {
                test: /\.less$/,

                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            modules: false,
                        },
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            lessOptions: {
                                // strictMath: true,
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // 其他选项
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader',
                    // 'post-loader', //添加post-loader加载器
                ],
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/i,
            //     loader: 'file-loader',
            //     options: {
            //         esModule: false,
            //         outputPath: 'assets',
            //     },
            // },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 100,
                            outputPath: 'assets/', // 为你的文件配置自定义 output 输出目录 ; 用来处理图片路径问题
                            // publicPath: 'assets/', // 为你的文件配置自定义 public 发布目录 ; 用来处理图片路径问题
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                siteId: process.env.siteId,
                name: argv.name,
            }),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/template', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new AntdDayjsWebpackPlugin(),

        new AntDesignThemePlugin(options),
        new webpack.ProgressPlugin(),
    ],
});
