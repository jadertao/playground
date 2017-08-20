module.exports = {
  devtool: 'inline-source-map',
  entry: './src/Frx.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: 'Frx.js',
    path: __dirname + '/dist/'
  }
};