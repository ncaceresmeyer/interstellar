import React, { Component } from 'react';
import Header from './header';
import MapLocation from './mapLocation';
import PlacesGallery from './placesGallery';

class core extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<MapLocation />
				<PlacesGallery />
			</React.Fragment>
		);
	}
}

export default core;
