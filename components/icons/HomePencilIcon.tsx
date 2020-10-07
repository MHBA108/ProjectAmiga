import React from 'react';
import { Image } from 'react-native';

export default class HomePencilIcon extends React.Component {
	render() {
		return (
			<Image
				source={require('../../assets/images/pencil_icon.png')}
				fadeDuration={0}
				style={{width: 32, height: 32}}
				/>
		)
	}
}