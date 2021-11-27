module.exports = {
  presets: [
    '@vue/app',
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
      corejs: 2
    }]
  ],
  plugins: [
    // [ // babel-plugin-component 没有 externals 体积小，完全不打包 ui 库
    //   "component",
    //   { libraryName: "element-ui", style: false },
    //   "element-ui"
    // ],
    // // ["component", {
    // //   libraryName: "test-module",
    // //   style: true,
    // // }, "test-module"]
  ]
}
