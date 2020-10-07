import React from 'react';
import { Image } from 'react-native';

export default class PencilIcon extends React.Component {
	render() {
		return (
			<Image
				source={require('../../assets/images/2x/round_create_blue_18dp.png')}
				fadeDuration={0}
				style={{width: 32, height: 32}}
				/>
		)
	}
}