import React from "react";
import { Image, ImageSourcePropType } from "react-native";

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