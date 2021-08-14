// const path = require('path');
// const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
// const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// const resolve = (dir) => path.join(__dirname, dir);

module.exports = {


    publicPath: '/',

    outputDir: 'dist',

    assetsDir: '',

    indexPath: 'index.html',

    filenameHashing: true,
    pages: undefined,
    lintOnSave: false, 
    transpileDependencies: [],
    
    productionSourceMap: false,
  
    crossorigin: undefined,

    integrity: true,

    css: {
      modules: false,
      extract: false,
      sourceMap: true,
      loaderOptions: {

        sass: {
          
        },
        
      },
    },
   
    devServer: {
      open: false, 
      hot: true, 
      compress: true, 
      host: 'localhost', 
      port: 8080, 
      
    },

  };
 