const config = require('./config.json')
const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FailPlugin = require('webpack-fail-plugin')

const htmls = fs.readdirSync('./app').filter(f => /\.twig$/g.test(f))
const data = JSON.parse(fs.readFileSync('./app/_data/app.json', 'utf-8'))

module.exports = {
  module: {
    rules: [
      {
        loader: 'webpack-modernizr-loader',
        test: /\.modernizrrc\.js$/
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
       
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        include: path.resolve(__dirname, 'app/assets/images'),
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: false,
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf|svg)(\?#(.))?$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: false,
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.twig$/,
        loader: 'twig-loader'
      }
    ]
  },
  entry: {
    app: './app/assets/js/app.js'
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, './.modernizrrc.js')
    }
  },
  plugins: [
    FailPlugin
  ].concat(htmls.map(html => {
    let htmlData = {}
    for (var prop in data) {
      htmlData[prop] = data[prop]
    }
    htmlData.template = `./app/${html}`
    htmlData.filename = html.replace('.twig', '.html')
    return new HtmlWebpackPlugin(htmlData)
  }
  ))
}
