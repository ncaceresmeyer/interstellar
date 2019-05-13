// api url 
const confEnv = process.env.NODE_ENV || 'development';

module.exports = {
  development: {
    APP_APIURL: 'http://localhost:3001'
  },
  production: {
    APP_APIURL: 'https://tranquil-plateau-18180.herokuapp.com'
  },
}[confEnv];
