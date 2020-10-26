import React from "react";
import PropTypes from "prop-types";
import { Image, ImageSourcePropType } from "react-native";
import { ImageSource } from "react-native-vector-icons/Icon";

export default class CustomIcon extends React.Component<{iconPath: ImageSourcePropType}> {

	render() {
		const { iconPath } = this.props;
		return (
			<Image
				source={iconPath}
				fadeDuration={0}
				style={{width: 32, height: 32}}
				/>
		)
	}
}