module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
    path: '/home/dimitri/test/front/public'+'/static',
        filename: "bundle.js"
},
    watch: true,
    module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "env",
                        "react"
                    ]
                }
            }
        }
    ]
}
}