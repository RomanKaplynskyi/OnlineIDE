const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: (config) => {
    config.plugins.push(new MonacoWebpackPlugin());
  }
}