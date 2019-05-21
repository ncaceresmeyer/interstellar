require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const confEnv = require('../config/config');

// get location of ISS and near cities.
router.get('/', function(req, res, next) {
	axios
		// get location of ISS
		.get(confEnv.API_ISSURL)
		// response location of ISS
		.then(resIssLoc => {
		    const issLocation = resIssLoc.data.iss_position;
		    // get near cities of ISS location
			axios.get(confEnv.API_CITIESURL, 
				{ params: {
					radius: '600', 
					limit: '15',
					Latitude: issLocation.latitude,
					Longitude: issLocation.longitude
					}
				})
				//response near cities of ISS location
		        .then(resNearbyCities => {
			    	const nearbyCities = resNearbyCities.data ? resNearbyCities.data.map(function(place) {
						return { nearCity: place[1], nearCountry: place[3]};
					}) : [];
					const firstCountry = nearbyCities[0].nearCountry;
					const firstCity = nearbyCities[0].nearCity;

			    		res.send({
							nearbyCities: nearbyCities,
							issLat: Number(issLocation.latitude),
							issLong: Number(issLocation.longitude)
	        			})
					/*axios.get(confEnv.API_PIXURL, 
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
						const mediaPlaces = resMedia.data ? resMedia.data.hits.map(function(media) {
							return { id: media.id, webformatURL: media.webformatURL, tags: media.tags};
						}) : [];
						const mediaSearchTerm = resMedia.config.params.q;

						// send all responses
				    	res.send({
							nearbyCities: nearbyCities,
							issLat: Number(issLocation.latitude),
							issLong: Number(issLocation.longitude),
							mediaPlaces: mediaPlaces,
		        			mediaSearchTerm: mediaSearchTerm
	        			})
	        			console.log('status', resMedia)
					}).catch(errMedia => res.send(`Get Media ${errMedia}`));*/
					

		  		}).catch(errCities => res.send(`Get Cities ${errCities}`));
	  	})
	  	.catch(errIssLoc => res.send(`Get ISS ${errIssLoc}`));

});

module.exports = router;
