/**
 * @author: @amay0048
 */

// Look in ./config folder for the relevant webpack.dev.js
switch (process.env.TARGET) {
  case 'angular':
    switch (process.env.NODE_ENV) {
    //   case 'prod':
    //   case 'production':
    //     module.exports = require('./config/webpack.prod')({env: 'production'});
    //     break;
    //   case 'test':
    //   case 'testing':
    //     module.exports = require('./config/webpack.test')({env: 'test'});
    //     break;
      case 'dev':
      case 'development':
      default:
        module.exports = require('./config/angular/webpack.dev')
    }
    break;
  case '@angular':
  default:
    switch (process.env.NODE_ENV) {
    //   case 'prod':
    //   case 'production':
    //     module.exports = require('./config/webpack.prod')({env: 'production'});
    //     break;
    //   case 'test':
    //   case 'testing':
    //     module.exports = require('./config/webpack.test')({env: 'test'});
    //     break;
      case 'dev':
      case 'development':
      default:
        module.exports = require('./config/@angular/webpack.dev')
    }
}