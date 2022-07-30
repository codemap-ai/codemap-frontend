const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
	plugins: [
		new MonacoEditorPlugin({
			languages: ['javascript', 'cpp', 'c', 'plaintext'],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				oneOf: [
					// this matches `<style module>`
					{
						resourceQuery: /module/,
						use: [
							'vue-style-loader',
							{
								loader: 'css-loader',
								options: {
									modules: true,
								}
							}
						]
					},
					// this matches plain `<style>` or `<style scoped>`
					{
						use: [
							'vue-style-loader',
							'css-loader'
						]
					}
				]
			},
		]
	}
};
