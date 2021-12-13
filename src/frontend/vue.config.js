let assetsDir = "assets";
module.exports = {
  assetsDir: assetsDir,
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: config => {
      if(process.env.NODE_ENV === "production") {
        //config.output.filename = assetsDir + 'js/[name].[contenthash:8].min.js'
        //config.output.chunkFilename = assetsDir + '/[name].[contenthash:8].min.js'
	    config.output.filename = assetsDir + '/[name].min.js'
        config.output.chunkFilename = assetsDir + '/[name].min.js'
      } else {
        config.output.filename = assetsDir + '/[name].js'
        config.output.chunkFilename = assetsDir + '/[name].js';
      }
      config.output.libraryExport = 'default'
      config.devtool='source-map'
   },
   chainWebpack: config => {
      if (config.plugins.has("extract-css")) {
      	const extractCSSPlugin = config.plugin("extract-css");
      	extractCSSPlugin &&
        	extractCSSPlugin.tap(() => [
          	{
            		filename: assetsDir + "/[name].css",
            		chunkFilename: assetsDir + "/[name].css"
          	}
        	]);
      }

      config.plugins
      	.delete("html")
      	.delete("prefetch")
      	.delete("preload");   
 }
 
};
