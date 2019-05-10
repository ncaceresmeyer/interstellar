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
			    	const firstCountry = nearbyCities[0][3];

					axios.get(process.env.API_PIXURL, 
						{ params: {
							key: process.env.REACT_APP_PIXKEY, 
				    		q: firstCountry, 
				    		image_type: 'photo', 
				    		category: 'places',
				    		per_page: '15', 
				    		order: 'latest'
							}
						})
					.then(resMedia => {
						const mediaPlaces = resMedia.data;
						const mediaSearchTerm = resMedia.config.params.q;

						// send all responses
				    	res.send({
							nearbyCities: nearbyCities,
							issLat: Number(issLocation.latitude),
							issLong: Number(issLocation.longitude),
							mediaPlaces: mediaPlaces.hits,
		        			mediaSearchTerm: mediaSearchTerm
	        			})
					}).catch(errMedia => res.send(`${errMedia}`));

		  		}).catch(errCities => res.send(`${errCities}`));
	  	})
	  	.catch(errIssLoc => res.send(`${errIssLoc}`));

});

module.exports = router;
