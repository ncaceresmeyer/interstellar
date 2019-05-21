import React, { Component } from 'react';
import Header from './components/header';
import MapLocation from './components/MapLocation';
import PlacesGallery from './components/placesGallery';
import confEnv from './config/config';

export default class Core extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	issLocation: [],
			nearbyCities: []
		}
    };

   	componentDidMount() {
   		fetch(confEnv.APP_APIURL+'/api')
  		.then(res => res.json())
      	.then(issLocation => 
      		this.setState({ 
      			issLocation: {
					issLat: issLocation.issLat,
					issLong:  issLocation.issLong
				},
				nearbyCities: issLocation.nearbyCities
      		})
      	)
	  	.catch(error => {
	    	this.setState({ error: 'Sorry, an error occurred' });
	    });
	};

	render() {
		const { issLocation, nearbyCities, error } = this.state;
		return (
			<React.Fragment>
				<main className="container">
					<Header />
					<MapLocation issLat={ issLocation.issLat } issLong={ issLocation.issLong } />
					<div className="issError iss-wrapper"> { error && <p className="iss-alertMsg">{ error }</p> } </div>
					<PlacesGallery nearbyCities={ nearbyCities } />
				</main>
			</React.Fragment>
		);
	}
}
