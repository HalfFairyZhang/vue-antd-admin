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
            "/web-api": {
                target: "http://localhost:8020/web-api",
                changeOrigin: true,
                pathRewrite: { "^/web-api": "" },
            },
            '/upload': {
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