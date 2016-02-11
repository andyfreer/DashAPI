var join = require('path').join
  , nconf = require('nconf')
  , env = process.env.NODE_ENV;

if (!env) {
  throw 'No Environment Specified. Run as NODE_ENV="development" node app.js'
}

nconf
  .env()
  .argv()
  .file(env, join(__dirname, './config', env + '.json'))

module.exports = nconf;
