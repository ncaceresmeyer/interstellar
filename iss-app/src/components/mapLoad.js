import React, { Component } from 'react';
require('dotenv').config();

export default class Map extends Component {
	constructor(props) {
		super(props);
	    this.onScriptLoad = this.onScriptLoad.bind(this);
	}
	
  	onScriptLoad () {
  		const { id, options, onMapLoad } = this.props;
    	const map = new window.google.maps.Map(document.getElementById(id),options);
    	onMapLoad(map)
  	}

	componentDidMount() {
	    if (!window.google) {
	      const s = document.createElement('script');
	      s.type = 'text/javascript';
	      s.src = `https://maps.google.com/maps/api/js?key=${ process.env.REACT_APP_GKEY }`;
	      const x = document.getElementsByTagName('script')[ 0 ];
	      x.parentNode.insertBefore(s, x);
	      s.addEventListener('load', () => {
	        this.onScriptLoad()
	      })
	    } else {
	      this.onScriptLoad()
	    }
	}

	render() {
		const { id } = this.props;
	    return (<div className="iss-mapContent" id={ id } aria-label="Map displaying current location of international space station" tabIndex="0" />
	    );
	}
}