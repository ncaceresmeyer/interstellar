const confEnv = process.env.NODE_ENV || 'development';

module.exports = {
  development: {
    APP_APIURL: 'http://localhost:3001',
    API_ISSURL:'http://api.open-notify.org/iss-now',
    API_CITIESURL:'http://getnearbycities.geobytes.com/GetNearbyCities?',
    API_PIXURL:'https://pixabay.com/api/?',
  	REACT_APP_PIXKEY:'12187388-19ee123d9b15f612089bb294a'
  },
  production: {
    APP_APIURL: 'https://tranquil-plateau-18180.herokuapp.com',
    API_ISSURL:'http://api.open-notify.org/iss-now',
    API_CITIESURL:'http://getnearbycities.geobytes.com/GetNearbyCities?',
    API_PIXURL:'https://pixabay.com/api/?',
    REACT_APP_PIXKEY:'12187388-19ee123d9b15f612089bb294a'
  },
}[confEnv];
