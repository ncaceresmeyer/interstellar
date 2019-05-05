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
		      	const issLocation = resIssLoc.data;
		        this.setState({
		        	issLocation: {
		            	issLat: Number(issLocation.iss_position.latitude),
		            	issLong: Number(issLocation.iss_position.longitude)
	        		}
	       		})
	    	})
	    	.catch(error => {
	    		console.log('An error occurred:', error)
	    	});

		//get near cities of the current location of ISS
		await axios.get('https://cors.io/?http://getnearbycities.geobytes.com/GetNearbyCities?', 
		    	{ params: {
		    		radius: '600', 
		    		limit: '15',
		    		Latitude: this.state.issLocation.issLat,
		    		Longitude: this.state.issLocation.issLong
		    	}
	    	})
			.then(resNearbyCities => {
		      	const nearbyCities = resNearbyCities.data;
		        this.setState({
		        	nearbyCities: nearbyCities
		        });
	    	})
	    	.catch(error => {
	    		console.log('An error occurred:', error)
	    	});

	}

	render() {
		const { issLocation, nearbyCities } = this.state;

		return (
			<React.Fragment>
				<main className="container">
					<Header />
					<MapLocation issLat={ issLocation.issLat } issLong={ issLocation.issLong } />
					<PlacesGallery nearbyCities={ nearbyCities } />
				</main>
			</React.Fragment>
		);
	}
}
