import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/header';
import MapLocation from './components/mapLocation';
import PlacesGallery from './components/placesGallery';

export default class Core extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	issLocation: [],
			nearbyCities: []
		}
    };

   	async componentDidMount() {
   		//get location of ISS
    	await axios.get('http://api.open-notify.org/iss-now')
	    	.then(resIssLoc => {
	    		//console.log(resIssLoc)
		      	const issLocation = resIssLoc.data;
		        this.setState({
		        	issLocation: {
		            	issLat: Number(issLocation.iss_position.latitude),
		            	issLong: Number(issLocation.iss_position.longitude)
	        		}
	       		})
	    	});

		//get near cities of the current location of ISS
		await axios.get('https://cors.io/?http://getnearbycities.geobytes.com/GetNearbyCities?', 
		    	{ params: {
		    		radius: '600', 
		    		limit: '15',
		    		Latitude: '29.2521',
		    		Longitude: '69.1759'
		    		/*
		    		Latitude: this.state.issLocation.issLat,
		    		Longitude: this.state.issLocation.issLong*/
		    	}
	    	})
			.then(resNearbyCities => {
		      	const nearbyCities = resNearbyCities.data;
		        this.setState({
		        	nearbyCities: nearbyCities,
		        	firstCity: nearbyCities[0][1],
          			firstCountry: nearbyCities[0][3]
		        });
	    	})
	    	.catch(error => {
	    		console.log('An error occurred')
	    	});

	}//close componentdidmount


	render() {
		const { issLocation, nearbyCities, firstCity, firstCountry } = this.state;
		return (
			<React.Fragment>
				<main className="container">
					<Header />
					<MapLocation issLat={ issLocation.issLat } issLong={ issLocation.issLong } />
					<PlacesGallery nearbyCities={ nearbyCities } firstCity= { firstCity } firstCountry= { firstCountry } />
				</main>
			</React.Fragment>
		);
	}
}
