const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        host: "0.0.0.0",
        port: 8081,
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

    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
};