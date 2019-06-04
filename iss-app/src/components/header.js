import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		return (
			<div className="iss-container iss-header">
				<div className="iss-wrapper">
					<h1>Interstellar</h1>
					<h2>Welcome to the International Space Station app</h2>
				</div>
			</div>
		);
	}
}