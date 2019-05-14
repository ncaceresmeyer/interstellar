const confEnv = process.env.NODE_ENV || 'development';

module.exports = {
  development: {
    APP_APIURL: 'http://localhost:3001',
    API_ISSURL:'http://api.open-notify.org/iss-now',
    API_CITIESURL:'http://getnearbycities.geobytes.com/GetNearbyCities?',
    API_PIXURL:'https://pixabay.com/api/?'
  },
  production: {
    APP_APIURL: 'https://interstellar-app.herokuapp.com/',
    API_ISSURL:'http://api.open-notify.org/iss-now',
    API_CITIESURL:'http://getnearbycities.geobytes.com/GetNearbyCities?',
    API_PIXURL:'https://pixabay.com/api/?'
  },
}[confEnv];
