/**
 * @author: @amay0048
 */

// Look in ./config folder for the relevant webpack.dev.js
switch (process.env.TARGET) {
  case 'angular':
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
        module.exports = require('./config/angular/webpack.prod');
        break;
      case 'dev':
      case 'development':
      default:
        module.exports = require('./config/angular/webpack.dev')
    }
    break;
  case 'react':
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
        module.exports = require('./config/react/webpack.prod');
        break;
      case 'dev':
      case 'development':
      default:
        module.exports = require('./config/react/webpack.dev')
    }
    break;
  case '@angular':
  default:
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
        module.exports = require('./config/@angular/webpack.prod');
        break;
      case 'dev':
      case 'development':
      default:
        module.exports = require('./config/@angular/webpack.dev')
    }
}