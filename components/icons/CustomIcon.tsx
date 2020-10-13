import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

export default class CustomIcon extends React.Component<{iconPath: String,}> {
	static propTypes = {
		iconPath: PropTypes.string.isRequired,
	};
	render() {
		return (
			<Image
				source={require('iconPath')}
				fadeDuration={0}
				style={{width: 32, height: 32}}
				/>
		)
	}
}