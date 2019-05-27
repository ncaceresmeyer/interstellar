import confEnv from '../config/config';

export const getPlacesGallery = () => {
	return fetch(confEnv.APP_APIURL+'/api')
  	.then(res => res.json())
}