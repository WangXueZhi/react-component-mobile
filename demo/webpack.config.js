let webpackCfg = require("webpack-config");
let pkg = require('./package.json');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let path = require('path');

// 路径
let srcPath = path.join(__dirname, './src')
let entryPath = path.join(srcPath, 'entrys'); // 入口脚本路径
let componentPath = path.join(srcPath, 'components'); // 业务组件路径

// 环境域名
let __URL_HOST__ = process.env.GULP_ENV === "prod" ? "" : "";

// mini-css-extract-plugin 配置
let cssExtractLoader = pkg.assetExtractCss ? MiniCssExtractPlugin.loader : {
  loader: 'style-loader'
};

let wdpcCommonPath = path.join(__dirname, '../lib'); // 组件库路径

let config = webpackCfg.getConfig({
  // 版本号，默认1.0.0
  version: pkg.version,
  // 环境变量：dev,test,prod。默认test
  env: process.env.NODE_ENV === 'development' ? "dev" : process.env.GULP_ENV,
  // 需要提取的公共依赖
  extractBundle: {
    commonBundle: [
      'commons/base', 'commons/util', 'commons/device', 'commons/config'
    ],
    reactBundle: ['react', 'react-dom'],
  },
  // 后端接口路径
  rpcPath: {
    h5: ""
  },
  // 测试和生产环境配置
  prod: {
    // 替换资源路径
    assetPath: `//static1.${__URL_HOST__}/static/fed/fed/${pkg.name}/${pkg.version}/assets/`
  },
  dev: {
    // 开发服务器配置
    devServer: {
      port: 8088
    },
  },
  // 模块索引规则
  resolve: {
    extensions: ['.jsx', '.web.js', '.js'],
    alias: {
      commons: path.join(srcPath, 'commons'),
      components: path.join(srcPath, 'components'),
      images: path.join(srcPath, 'images'),
      styles: path.join(srcPath, 'styles'),
      libraries: path.join(srcPath, 'libraries'),
      libs: path.join(srcPath, 'libs'),
      wdpcCommon: wdpcCommonPath
    }
  },
  // loaders
  loaders: [
    {
      test: function (absPath) {
        return (/\.less$/).test(absPath)
      },
      exclude: [
        wdpcCommonPath
      ],
      use: [
        cssExtractLoader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    },
    {
      test: function (absPath) {
        return (/\.less$/).test(absPath) && absPath.includes(wdpcCommonPath)
      },
      use: [
        cssExtractLoader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            modifyVars: {
              "@hd": "1px"
            }
          }
        }
      ],
    }
  ],
  // script加跨域头
  alterAssetTags: false
})
// 导出配置
module.exports = config;