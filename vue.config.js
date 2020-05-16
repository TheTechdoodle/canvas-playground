process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath: '',

  pwa: {
    name: 'Canvas Playground'
  }
}
