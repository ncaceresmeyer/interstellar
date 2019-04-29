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
	    const { data: issLocation } = await axios.get('http://api.open-notify.org/iss-now');
	    this.setState({ 
	    	issLocation: {
	            issLat: Number(issLocation.iss_position.latitude),
	            issLong: Number(issLocation.iss_position.longitude)
        	}
	    });
	
		//get near cities of the current location of ISS
	    const { data: nearbyCities } = await axios.get('https://cors.io/?http://getnearbycities.geobytes.com/GetNearbyCities?', 
	    	{ params: {
	    		radius: '600', 
	    		limit: '15', 
	    		Latitude: '-31.6158037',
	    		Longitude: '-57.5033388'
	    		/*
	    		Latitude: this.state.issLocation.issLat,
	    		Longitude: this.state.issLocation.issLong*/
	    	}
	    })
	    this.setState({ 
          nearbyCities: nearbyCities
        });
	}

	render() {
		const { issLocation, nearbyCities } = this.state;
		const firstCity = nearbyCities[0];


		//console.log(firstCity)

		return (
			<React.Fragment>
				<main className="container">
					<Header />
					<MapLocation issLat={ issLocation.issLat } issLong={ issLocation.issLong } />
					<PlacesGallery nearbyCities={ nearbyCities } firstCity= { firstCity } />
				</main>
			</React.Fragment>
		);
	}
}
