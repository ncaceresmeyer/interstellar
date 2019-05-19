import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import confEnv from '../config/config';

export default class PlacesGallery extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	mediaPlaces: [],
	    	nearbyCities: []
		}
    };

    componentDidMount() {
   		fetch(confEnv.APP_APIURL+'/api')
  		.then(res => res.json())
      	.then(mediaPlaces => 
      		this.setState({
				mediaPlaces: mediaPlaces.mediaPlaces,
				mediaSearchTerm: mediaPlaces.mediaSearchTerm,
				nearbyCities: mediaPlaces.nearbyCities
      		})
      	)
	  	.catch(error => {
	    	console.log('An error occurred:', error);
	    	this.setState({ error: 'Sorry, an error occurred' });
	    });
	};

	render() {
		const { mediaPlaces, mediaSearchTerm, error } = this.state;

		return (
			<div className="iss-container iss-galleryPlaces">
				<div className="iss-wrapper">

					<h3>Latest Cities Gallery</h3>

					<ul>
						{this.props.nearbyCities.length > 1 ? this.props.nearbyCities.map((place, i) =>
							<li key={ String(i) } className="iss-listItems">{ place.nearCity + ' - ' + place.nearCountry }</li> )
						: 
							( <p className="iss-alertMsg">Sorry, no cities near this location.</p> )
						}
					</ul> 

					{ error && <p className="iss-alertMsg">{ error }</p> }

					<ul className="iss-grid">{ mediaSearchTerm !== undefined
						? mediaPlaces.map(media => 
							<li key={ media.id }>
								<LazyLoad height={ '100%' }>
									<TransitionGroup component={ null } appear={ true } enter={ true }>
										<CSSTransition 
											key={ media.id }
							            	timeout={ 200 }
							            	classNames="fade"
							            	enter={ true }
							            	appear={ true }
							            	in> 
											<img src={ media.webformatURL } alt={ media.tags } />
										</CSSTransition>
									</TransitionGroup>
								</LazyLoad>
							</li>)
						: ( <p className="iss-alertMsg">Duh, we can't find photos for this place...</p> )
					}</ul>

				</div>
			</div>
		);
	}
}
