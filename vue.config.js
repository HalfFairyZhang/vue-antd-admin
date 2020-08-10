const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue ANT Admin' // page title

const port = process.env.port || process.env.npm_config_port || 8010 // dev port

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        host: "0.0.0.0",
        port: port,
        open: true,
        https: false,
        hotOnly: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            "/api": {//解决跨域设置代理
                target: "http://localhost:8020/web-api",
                changeOrigin: true,
                pathRewrite: { "^/api": "" },
            },
            '/upload': {//解决跨域设置代理
                target: 'http://localhost:8020/web-api',
                changeOrigin: true,
                pathRewrite: {
                    '^/upload': '/upload'
                }
            },
        },
        // before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()
        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial'
                                },
                                antd: {
                                    name: 'chunk-antd',
                                    priority: 20,
                                    test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'),
                                    minChunks: 3,
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    // modifyVars: {
                    //     'primary-color': '#1DA57A',
                    //     'link-color': '#1DA57A',
                    //     'border-radius-base': '2px',
                    // },
                    javascriptEnabled: true,
                },
            },
        },
    },
};