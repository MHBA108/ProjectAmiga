import React from 'react';
import { Image } from 'react-native';

export default class CalendarIcon extends React.Component {
	render() {
		return (
			<Image
				source={require('../../assets/images/CalendarIcon.png')}
				fadeDuration={0}
				style={{width: 32, height: 32}}
				/>
		)
	}
}