import React from 'react';
import { StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

const { height, width } = Dimensions.get('window');

export default class TodoList extends React.Component {
	state = {
		newTodoItem: ''
	};

	newTodoItemController = (textValue) => {
		this.setState({
			newTodoItem: textValue,
		})
	}
	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle='light-content'/>
				<View style={styles.card}>
					<TextInput 
						style={styles.input} 
						placeholder="Add an item!"
						value={newTodoItem}
						onChangeText={this.newTodoItemController}
						placeholderTextColor='f2e9e3'
						returnKeyType={'done'}
						autoCorrect={false}
						/>
				</View>
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
	},
	card: {
		backgroundColor: '464d77',
		flex: 1,
		width: width - 25,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		...Platform.select({
			ios: {
				shadowColor: 'rgb(50,50,50)',
				shadowOpacity: 0.5,
				shadowRadius: 5,
				shadowOffset: {
					height: -1,
					width: 0,
				}
			},
			android: {
				elevation: 5,
			},
		})
	},
	input: {
		padding: 20,
		fontSize: 24,
	},
});