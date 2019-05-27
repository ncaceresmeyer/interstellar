import React, { Component } from 'react';
import Header from './components/header';
import MapLocation from './components/MapLocation';
import PlacesGallery from './components/placesGallery';
import { getPlacesGallery } from './services/servicePlacesGallery';

export default class Core extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	issLocation: []
		}
    };

	dataLocation() {
      getPlacesGallery()
        .then((res) => {
            this.setState({ 
      			issLocation: {
					issLat: res.issLat,
					issLong:  res.issLong
				}
      		})
        })
        .catch(error => {
	    	this.setState({ error: 'Sorry, an error occurred' });
	    });
    }

   	componentDidMount() {
		this.dataLocation()
	};

	render() {
		const { issLocation, error } = this.state;

		return (
			<React.Fragment>
				<main className="container">
					<Header />
					<MapLocation issLat={ issLocation.issLat } issLong={ issLocation.issLong } />
					<div className="issError iss-wrapper"> { error && <p className="iss-alertMsg">{ error }</p> } </div>
					<PlacesGallery />
				</main>
			</React.Fragment>
		);
	}
}
