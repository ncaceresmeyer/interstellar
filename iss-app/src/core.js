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
		axios.all([
			//get location of ISS
		    axios.get('http://api.open-notify.org/iss-now'),
		    //get near cities of the current location of ISS
		    axios.get('https://cors.io/?http://getnearbycities.geobytes.com/GetNearbyCities?', 
				{ params: {
					radius: '600', 
					limit: '15',
					Latitude: this.state.issLocation.issLat,
					Longitude: this.state.issLocation.issLong
				}
			})
		])
		.then(axios.spread((resIssLoc, resNearbyCities) => {
			//response location of ISS
		    const issLocation = resIssLoc.data;
			this.setState({
				issLocation: {
				    issLat: Number(issLocation.iss_position.latitude),
				    issLong: Number(issLocation.iss_position.longitude)
				}
			});
			//response near cities of the current location of ISS
			const nearbyCities = resNearbyCities.data;
			this.setState({
				nearbyCities: nearbyCities
			});

	  	}))
	  	.catch(error => {
	    	console.log('An error occurred:', error);
	    	this.setState({ error: 'Sorry, an error occurred' });
	    });

	};

	render() {
		const { issLocation, nearbyCities, error } = this.state;

		return (
			<React.Fragment>
				<main className="container">
					<Header />
					<div className="issError iss-wrapper"> { error && <p className="iss-alertMsg">{ error }</p> } </div>
					<MapLocation issLat={ issLocation.issLat } issLong={ issLocation.issLong }> </MapLocation>
					<PlacesGallery nearbyCities={ nearbyCities } />
				</main>
			</React.Fragment>
		);
	}
}
