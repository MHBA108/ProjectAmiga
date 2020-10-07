import React from 'react';
import { Image } from 'react-native';

export default class StatsIcon extends React.Component {
	render() {
		return (
			<Image
				source={require('../../assets/images/stats_icon.png')}
				fadeDuration={0}
				style={{width: 32, height: 32}}
				/>
		)
	}
}