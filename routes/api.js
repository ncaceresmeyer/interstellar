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

					//eliminate duplicated countries
					const uniqueCountries = [...new Set(nearbyCities.map(c => c.nearCountry))];
					uniqueCountries;
 					
 					// shuffle function between unique countries
					const shuffleFunction = array => {
					  for (let i = array.length - 1; i > 0; i--) {
					    const rand = Math.floor(Math.random() * (i + 1));
					    [array[i], array[rand]] = [array[rand], array[i]];
					  }
					  return array;
					};
					let shuffleCountries = shuffleFunction(uniqueCountries);

					//get first element of the shuffle to use it as search param
					let firstCountry = shuffleCountries[0];

					axios.get(confEnv.API_PIXURL, 
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
						const mediaSearchTerm = resMedia.config.params.q;
						const mediaPlaces = mediaSearchTerm !== undefined && resMedia.data ? resMedia.data.hits.map(function(media) {
							return { id: media.id, webformatURL: media.webformatURL, tags: media.tags, user: media.user, url: 'https://pixabay.com/users/' + media.user + '-' + media.user_id};
						}) : [];

						// send all responses
				    	res.send({
							nearbyCities: nearbyCities,
							issLat: Number(issLocation.latitude),
							issLong: Number(issLocation.longitude),
							mediaPlaces: mediaPlaces,
		        			mediaSearchTerm: mediaSearchTerm
	        			})
					}).catch(errMedia => res.send(`Get Media ${errMedia}`));
					

		  		}).catch(errCities => res.send(`Get Cities ${errCities}`));
	  	})
	  	.catch(errIssLoc => res.send(`Get ISS ${errIssLoc}`));

});

module.exports = router;
