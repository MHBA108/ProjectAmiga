import React from 'react';
import { Image } from 'react-native';

export default class SettingsIcon extends React.Component {
	render() {
		return (
			<Image
				source={require('../../assets/images/settings_icon.png')}
				fadeDuration={0}
				style={{width: 32, height: 32}}
				/>
		)
	}
}