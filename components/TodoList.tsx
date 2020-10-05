import Reat from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Text, View } from '../components/Themed';

export default class TodoList extends React.Component {
	render() {
		return (
			<View style={StyleSheet.container}>
				<StatusBar barStyle='light-content'/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'f2e9e3',
		alignItems: 'center',
		justifyContent: 'center',
	}
});