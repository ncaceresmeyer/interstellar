import React, { Component } from 'react';
import Header from './header';
import MapLocation from './MapLocation';

class core extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<MapLocation />
			</React.Fragment>
		);
	}
}

export default core;
