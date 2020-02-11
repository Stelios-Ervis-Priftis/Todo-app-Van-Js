const path = require("path")

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
    }]
  },
  devServer: {
      contentBase: path.resolve(__dirname, "public"),
      publicPath:"/dist/"
  },
  devtool: "source-map"
}