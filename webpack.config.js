const path                        = require('path');
const webpack                     = require('webpack');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const UglifyJsParallelPlugin      = require('webpack-uglify-parallel');
const CleanWebpackPlugin          = require('clean-webpack-plugin');
const CopyWebpackPlugin           = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const os                          = require('os');
const nib                         = require('nib');

const isProduction = process.env.NODE_ENV;

module.exports = {
	entry: {
		index: './src/js/index.js',
		about: './src/js/about.js'
	},
	output: {
		filename: 'js/[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase       : './dist',
		historyApiFallback: true,
		hot               : true,
		compress          : true,
		stats             : {
			colors: true
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
					presets: ['env'],
				}
			},
			{
				test   : /\.pug$/,
				exclude: /node_modules/,
				loader : 'pug-loader',
				options: {
					pretty: true
				}
			},
			{
				test   : /\.styl$/,
				loader : 'stylus-loader',
				options: {
					import: path.join(__dirname,'/utils.styl'),
					use: [nib]
				 }
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new HtmlWebpackPlugin({
			title   : '',
			hash    : true,
			template: './src/templates/layout.pug',
			chunks  : [''],
			minify: {
				removeComments: true
			}
		}),
		new CopyWebpackPlugin([
			'src/images/*', 'dist'
		]),
		new webpack.NoEmitOnErrorsPlugin(),
		new FriendlyErrorsWebpackPlugin({
			onErrors: function (severity, errors) {
				console.log('severity=', severity);
				console.log('errors=', errors);
			  },
			  clearConsole: true
		})
	],
	stats: {
		colors      : true,
		errors      : true,
		errorDetails: true,
		modules     : true,
		reasons     : true
	}
};

if (isProduction) {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new CleanWebpackPlugin(['dist/**/*']),
		new UglifyJsParallelPlugin({
			workers: os.cpus().length,
		})
	]);

	console.log(path.resolve(__dirname, 'src/images'));
}