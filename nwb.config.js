module.exports = {
  type: 'web-module',
  npm: {
    esModules: true,
    umd: true
  },
  karma: {
    browsers: [require('karma-firefox-launcher')]
  }
};
