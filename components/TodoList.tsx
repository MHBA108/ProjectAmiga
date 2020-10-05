import React from 'react';
import { StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Text, View } from './Themed';
import TodoItem from './TodoItem';
import { AppLoading } from 'expo';

const { height, width } = Dimensions.get('window');

export default class TodoList extends React.Component<{}> {
	constructor(props: any) {
		super(props);
		this.state = {
			dataIsReady: false,
			newTodoItem: '',
		};
		this.newTodoItemController = this.newTodoItemController.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.loadTodos = this.loadTodos.bind(this);
		this.addTodo = this.addTodo.bind(this);
	   }

	newTodoItemController(textValue: any){
		this.setState({
			newTodoItem: textValue,
		});
	}

	componentDidMount(){
		this.loadTodos();
	};

	loadTodos(){
		this.setState({dataIsReady: true});
	};

	addTodo(){
		if(this.state.newTodoItem !== ''){
			this.setState({
				newTodoItem: ''
			});
		}
	};

	render() {
		const { newTodoItem, dataIsReady } = this.state;
		if(!dataIsReady){
			return <AppLoading/>;
		}
		return (
			<View style={styles.container}>
				<StatusBar barStyle='light-content'/>
				<View style={styles.card}>
					<TextInput 
						style={styles.input} 
						placeholder="Add an item!"
						value={newTodoItem}
						onChangeText={this.newTodoItemController}
						placeholderTextColor='#f2e9e3'
						returnKeyType={'done'}
						autoCorrect={false}
						/>
					<ScrollView>
						<TodoItem textValue={'TodoItem'}/>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2e9e3',
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'HindSiliguri_400Regular',
	},
	card: {
		backgroundColor: '#464d77',
		fontFamily: 'HindSiliguri_400Regular',
		flex: 1,
		width: width - 25,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
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
		fontFamily: 'HindSiliguri_400Regular',
		padding: 20,
		fontSize: 24,
	},
});