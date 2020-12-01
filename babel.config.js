module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset',
    ['@vue/cli-plugin-babel/preset', { "modules": false }]
  ],
  plugins: [
    // ['import', {
    //   libraryName: 'vant',
    //   libraryDirectory: 'es',
    //   style: true
    // }, 'vant']
    [
      "import",
      {
        "libraryName": "element-ui",
        "style": name => {
          const arr = name.split('/');
          return `element-ui/lib/theme-chalk/${arr[arr.length - 1]}.css`;
        }
      },
      "element-ui"
    ],
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      },
      "vant"
    ]
  ]
}
