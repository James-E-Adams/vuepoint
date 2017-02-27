var path = require('path')

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts','.vue'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      vue: 'vue/dist/vue.js'
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.ts$/,
        loader: 'vue-ts'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  vue: {
    loaders: { js: 'vue-ts-loader', },
    esModule: true
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  ts: {
      experimentalDecorators: true
  }
}
