var express = require('express');
var axios = require('axios');
var router = express.Router();
require('dotenv').config()

// get location of ISS and near cities.
router.get('/', function(req, res, next) {
	axios
		// get location of ISS
		.get(process.env.API_ISSURL)
		// response location of ISS
		.then(resIssLoc => {
		    const issLocation = resIssLoc.data.iss_position;
		    // get near cities of ISS location
			axios.get(process.env.API_CITIESURL, 
				{ params: {
					radius: '600', 
					limit: '15',
					Latitude: issLocation.latitude,
					Longitude: issLocation.longitude
					}
				})
				//response near cities of ISS location
		        .then(resNearbyCities => {
			    	const nearbyCities = resNearbyCities.data;
					// send ISS and near cities responses
			    	res.send({
						nearbyCities: nearbyCities,
						issLocation: issLocation,
						issLat: Number(issLocation.latitude),
						issLong: Number(issLocation.longitude),
        			})
		  		}).catch(errCities => res.send(`${errCities}`));
	  	})
	  	.catch(errIssLoc => res.send(`${errIssLoc}`));

});

module.exports = router;