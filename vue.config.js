const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: (config) => {
    config.plugins.push(new MonacoWebpackPlugin());
  },
  chainWebpack: (config) => {
    config.plugin("copy").tap(([options]) => {
      options[0].ignore.push("server/**");
      return [options];
    });
  }

}