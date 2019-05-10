import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		return (
			<div className="iss-container iss-header">
				<div className="iss-wrapper">
					<h1>Interstellar</h1>
					<p>Welcome to the International Space Station app</p>
				</div>
			</div>
		);
	}
}