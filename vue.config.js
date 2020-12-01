const webpack = require('webpack')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    assetsDir: 'assets',
    devServer: {
        host: "0.0.0.0",
        proxy: {
            '/gitee': {
                target: 'https://gitee.com/api/v5/repos/xiaodingsiren/JikePic/contents/', // giteeApi
                changeOrigin: true,
                pathRewrite: {
                    '^/gitee': '' // localhost:8080/gitee/xxx => https://gitee.com/api/v5/repos/xiaodingsiren/JikePic/contents/xxx
                }
            },
            '/jike-api': {
                target: process.env.NODE_ENV === 'production' ? 'http://jike.cocode.me:8081/jike-api' : 'http://127.0.0.1:8081/jike-api',
                changeOrigin: true,
                pathRewrite: {
                    '^/jike-api': ''
                }
            }
        }
    },
    configureWebpack: {
        //支持jquery
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
}