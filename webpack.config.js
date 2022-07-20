module.exports = {
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
