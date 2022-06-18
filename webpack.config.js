const path = require('path')
const HTMLPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "public")
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,

  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: path.resolve(__dirname, "./public/index.html"),
      title: "Webpack Auth App",
      inject: "body"
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", 'css-loader']
      }
    ]
  }
}
