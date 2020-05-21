const webpack = require('webpack');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

const utils = require('./utils.js');

module.exports = (options) => ({
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],
        mainFields: ['browser', 'module', 'main'],
        alias: utils.mapTypescriptAliasToWebpackAlias()
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: {
                        caseSensitive: true,
                        removeAttributeQuotes:false,
                        minifyJS:false,
                        minifyCSS:false
                    }
                },
                exclude: utils.root('src/main/webapp/index.html')
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loader: 'file-loader',
                options: {
                    digest: 'hex',
                    hash: 'sha512',
                    // For fixing src attr of image
                    // See https://github.com/jhipster/generator-jhipster/issues/11209
                    name: 'content/[hash].[ext]',
                    esModule: false
                }
            },
            {
                test: /manifest.webapp$/,
                loader: 'file-loader',
                options: {
                    name: 'manifest.webapp'
                }
            },
            // Ignore warnings about System.import in Angular
            { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${options.env}'`,
                BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
                // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
                VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
                DEBUG_INFO_ENABLED: options.env === 'development',
                // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
                // If this URL is left empty (""), then it will be relative to the current context.
                // If you use an API server, in `prod` mode, you will need to enable CORS
                // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
                SERVER_API_URL: `''`
            }
        }),
        new CopyWebpackPlugin([
            { from: './node_modules/swagger-ui-dist/*.{js,css,html,png}', to: 'swagger-ui', flatten: true, ignore: ['index.html'] },
            { from: './node_modules/axios/dist/axios.min.js', to: 'swagger-ui' },
            { from: './src/main/webapp/swagger-ui/', to: 'swagger-ui' },
            { from: './src/main/webapp/content/', to: 'content' },
            { from: './src/main/webapp/favicon.ico', to: 'favicon.ico' },
            { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
            // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
            { from: './src/main/webapp/robots.txt', to: 'robots.txt' }
        ]),
        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/al/*.json", fileName: "./i18n/al.json" },
                    { pattern: "./src/main/webapp/i18n/ar-ly/*.json", fileName: "./i18n/ar-ly.json" },
                    { pattern: "./src/main/webapp/i18n/hy/*.json", fileName: "./i18n/hy.json" },
                    { pattern: "./src/main/webapp/i18n/by/*.json", fileName: "./i18n/by.json" },
                    { pattern: "./src/main/webapp/i18n/bn/*.json", fileName: "./i18n/bn.json" },
                    { pattern: "./src/main/webapp/i18n/bg/*.json", fileName: "./i18n/bg.json" },
                    { pattern: "./src/main/webapp/i18n/ca/*.json", fileName: "./i18n/ca.json" },
                    { pattern: "./src/main/webapp/i18n/zh-cn/*.json", fileName: "./i18n/zh-cn.json" },
                    { pattern: "./src/main/webapp/i18n/zh-tw/*.json", fileName: "./i18n/zh-tw.json" },
                    { pattern: "./src/main/webapp/i18n/cs/*.json", fileName: "./i18n/cs.json" },
                    { pattern: "./src/main/webapp/i18n/da/*.json", fileName: "./i18n/da.json" },
                    { pattern: "./src/main/webapp/i18n/nl/*.json", fileName: "./i18n/nl.json" },
                    { pattern: "./src/main/webapp/i18n/et/*.json", fileName: "./i18n/et.json" },
                    { pattern: "./src/main/webapp/i18n/fa/*.json", fileName: "./i18n/fa.json" },
                    { pattern: "./src/main/webapp/i18n/fi/*.json", fileName: "./i18n/fi.json" },
                    { pattern: "./src/main/webapp/i18n/fr/*.json", fileName: "./i18n/fr.json" },
                    { pattern: "./src/main/webapp/i18n/gl/*.json", fileName: "./i18n/gl.json" },
                    { pattern: "./src/main/webapp/i18n/de/*.json", fileName: "./i18n/de.json" },
                    { pattern: "./src/main/webapp/i18n/el/*.json", fileName: "./i18n/el.json" },
                    { pattern: "./src/main/webapp/i18n/hi/*.json", fileName: "./i18n/hi.json" },
                    { pattern: "./src/main/webapp/i18n/hu/*.json", fileName: "./i18n/hu.json" },
                    { pattern: "./src/main/webapp/i18n/in/*.json", fileName: "./i18n/in.json" },
                    { pattern: "./src/main/webapp/i18n/it/*.json", fileName: "./i18n/it.json" },
                    { pattern: "./src/main/webapp/i18n/ja/*.json", fileName: "./i18n/ja.json" },
                    { pattern: "./src/main/webapp/i18n/ko/*.json", fileName: "./i18n/ko.json" },
                    { pattern: "./src/main/webapp/i18n/mr/*.json", fileName: "./i18n/mr.json" },
                    { pattern: "./src/main/webapp/i18n/my/*.json", fileName: "./i18n/my.json" },
                    { pattern: "./src/main/webapp/i18n/pl/*.json", fileName: "./i18n/pl.json" },
                    { pattern: "./src/main/webapp/i18n/pt-br/*.json", fileName: "./i18n/pt-br.json" },
                    { pattern: "./src/main/webapp/i18n/pt-pt/*.json", fileName: "./i18n/pt-pt.json" },
                    { pattern: "./src/main/webapp/i18n/ro/*.json", fileName: "./i18n/ro.json" },
                    { pattern: "./src/main/webapp/i18n/ru/*.json", fileName: "./i18n/ru.json" },
                    { pattern: "./src/main/webapp/i18n/sk/*.json", fileName: "./i18n/sk.json" },
                    { pattern: "./src/main/webapp/i18n/sr/*.json", fileName: "./i18n/sr.json" },
                    { pattern: "./src/main/webapp/i18n/si/*.json", fileName: "./i18n/si.json" },
                    { pattern: "./src/main/webapp/i18n/es/*.json", fileName: "./i18n/es.json" },
                    { pattern: "./src/main/webapp/i18n/sv/*.json", fileName: "./i18n/sv.json" },
                    { pattern: "./src/main/webapp/i18n/tr/*.json", fileName: "./i18n/tr.json" },
                    { pattern: "./src/main/webapp/i18n/ta/*.json", fileName: "./i18n/ta.json" },
                    { pattern: "./src/main/webapp/i18n/te/*.json", fileName: "./i18n/te.json" },
                    { pattern: "./src/main/webapp/i18n/th/*.json", fileName: "./i18n/th.json" },
                    { pattern: "./src/main/webapp/i18n/ua/*.json", fileName: "./i18n/ua.json" },
                    { pattern: "./src/main/webapp/i18n/uz-Cyrl-uz/*.json", fileName: "./i18n/uz-Cyrl-uz.json" },
                    { pattern: "./src/main/webapp/i18n/uz-Latn-uz/*.json", fileName: "./i18n/uz-Latn-uz.json" },
                    { pattern: "./src/main/webapp/i18n/vi/*.json", fileName: "./i18n/vi.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/index.html',
            chunks: ['polyfills', 'main', 'global'],
            chunksSortMode: 'manual',
            inject: 'body'
        }),
        new BaseHrefWebpackPlugin({ baseHref: '/' }),
        new AngularCompilerPlugin({
            mainPath: utils.root('src/main/webapp/app/app.main.ts'),
            tsConfigPath: utils.root('tsconfig.app.json'),
            sourceMap: true
        })
    ]
});
