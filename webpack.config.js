const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
entry: {
  index: './src/index.js',
  news: './src/news.js',
  music: './src/music.js',
  weather: './src/weather.js',
  contacts: './src/contacts.js',
  test: './src/test.js',
},
output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
},

module: {
    rules: [{
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [(isDev ? "style-loader" : MiniCssExtractPlugin.loader), {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'postcss-loader'],
            },

            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [

                {
                    loader: 'file-loader',
                    options: {
                    name: '[name][hash].[ext]',
                    outputPath: 'images',
                    esModule: false,
                }
                 },
                ]
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader?name=fonts/[name].[ext]']
        }

        ]
    },



plugins: [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].[contenthash].css"
}),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
}),
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: true,
        chunks: ["index"],
        favicon: './images/icon.ico'
    }),

    new HtmlWebpackPlugin({
      template: 'src/news.html',
      filename: 'news.html',
      inject: true,
      chunks: ["news"],
      favicon: './images/icon.ico'
  }),

    new HtmlWebpackPlugin({
      template: 'src/music.html',
      filename: 'music.html',
      inject: true,
      chunks: ["music"],
      favicon: './images/icon.ico'
}),

    new HtmlWebpackPlugin({
      template: 'src/weather.html',
      filename: 'weather.html',
      inject: true,
      chunks: ["weather"],
      favicon: './images/icon.ico'
}),
new HtmlWebpackPlugin({
  template: 'src/contacts.html',
  filename: 'contacts.html',
  inject: true,
  chunks: ["contacts"],
  favicon: './images/icon.ico'
}),
new HtmlWebpackPlugin({
  template: 'src/test.html',
  filename: 'test.html',
  inject: true,
  chunks: ["test"],
  favicon: './images/icon.ico'
}),

    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
]
}