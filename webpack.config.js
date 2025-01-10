const path = require('path');
module.exports = {
  entry: ['/js/index.js', '/js/test.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};