import React, { Component } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class PlacesGallery extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	mediaPlaces: []
		}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.nearbyCities !== this.props.nearbyCities) {
          this.getMedia(nextProps);
        }
    };

	getMedia = async (props) => {
		const firstCountry = props.nearbyCities[0][3];

		// get media from pixabayApi for the first country near iss location
		await axios.get('https://pixabay.com/api/?', 
		    	{ params: {
		    		key: process.env.REACT_APP_PIXKEY, 
		    		q: firstCountry, 
		    		image_type: 'photo', 
		    		category: 'places',
		    		per_page: '15', 
		    		order: 'latest'
		    	}
	    	})
			.then(resMedia => {
		      	const mediaPlaces = resMedia.data;
		      	const mediaSearchTerm = resMedia.config.params.q;
		        this.setState({
		        	mediaPlaces: mediaPlaces.hits,
		        	mediaSearchTerm: mediaSearchTerm
		        });
	    	})
	    	.catch(error => {
	    		console.log('An error occurred', error);
	    		this.setState({ error: 'Sorry, something went wrong.' });
	    	});

	    	
	}

	render() {
		const { mediaPlaces, mediaSearchTerm, error } = this.state;

		return (
			<div className="iss-container iss-galleryPlaces">
				<div className="iss-wrapper">

					<h3>Latest Cities Gallery</h3>

					<ul>
						{this.props.nearbyCities.length > 1 ? this.props.nearbyCities.map((city, i) =>
							<li key={ i } className="iss-listItems">{ city[1] + ' - ' + city[3] }</li> )
						: 
							( <p className="iss-alertMsg">Sorry, no cities near this location.</p> )
						}
					</ul> 

					{ error && <p className="iss-alertMsg">{ error }</p> }

					<ul className="iss-grid">{ mediaSearchTerm !== undefined 
						? mediaPlaces.map(place => 
							<li key={ place.id }>
							<LazyLoad height={ '100%' }>
								<TransitionGroup component={ null } appear={ true } enter={ true }>
									<CSSTransition 
										key={ place.id }
						            	timeout={ 200 }
						            	classNames="fade"
						            	enter={ true }
						            	appear={ true }
						            	in> 
										<img src={ place.webformatURL } alt={ place.tags } />
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
