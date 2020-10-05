import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { View, Text } from './Themed';
import PropTypes from 'prop-types';
 
const {height, width} = Dimensions.get('window');
 
class TodoItem extends Component<{}> {

	static propTypes = {
		textValue: PropTypes.string.isRequired,
		isCompleted: PropTypes.bool.isRequired,
		deleteTodo: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		inCompleteTodo: PropTypes.func.isRequired,
		CompleteTodo: PropTypes.func.isRequired,
		updateTodo: PropTypes.func.isRequired,
	}
	
	constructor(props: any) {
		super(props);
		this.state = {
			todoValue: props.textValue,
			isEditing: false,
		};
		this.toggleItem = this.toggleItem.bind(this);
		this.startEditing = this.startEditing.bind(this);
		this.finishEditing = this.finishEditing.bind(this);
		this.controlInput = this.controlInput.bind(this);
	};
 
	startEditing(){
		const { textValue } = this.props;
		this.setState({
			isEditing: true,
		});
	};

	finishEditing(){
		const {todoValue} = this.state;
		const {id, updateTodo} = this.props;
		updateTodo(id, todoValue);
		this.setState({
			isEditing: false,
		});
	};

	controlInput(textValue){
		this.setState({todoValue: textValue});
	};

    toggleItem(){
	    const { isCompleted, inCompleteTodo, CompleteTodo, id } = this.props;
         if(isCompleted){
		    inCompleteTodo(id);
	    }else{
		    CompleteTodo(id);
	    }
    };
 
    render() {
	    const {isEditing, todoValue} = this.state;
	    const {textValue, id, deleteTodo, isCompleted} = this.props;
         return(
              <View style={styles.container}>
				<View style={styles.rowContainer}>
				<TouchableOpacity onPress={this.toggleItem}>
                     	<View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}/>
				</TouchableOpacity>
					{ isEditing ? (
						    <TextInput
								value={todoValue}
								style={[
									styles.text,
									styles.input,
									isCompleted ? styles.strikeText : styles.unstrikeText
								]}
								multiline={true}
								onChangeText={this.controlInput}
								returnKeyType={'done'}
								onBlur={this.finishEditing}
							/>
					) : (
                   			<Text style={[styles.text, isCompleted ? styles.strikeText : styles.unstrikeText]}>{textValue}</Text>
					)
					}
				</View>
				{isEditing ? (
						<View style={styles.buttons}>
						    <TouchableOpacity onPressOut={this.finishEditing}>
							    <View style={styles.buttonContainer}>
								    <Text style={styles.buttonText}>d</Text>
							    </View>
						    </TouchableOpacity>
					    </View>
				    ) : (
						<View style={styles.buttons}>
							<TouchableOpacity onPressOut={this.startEditing}>
								<View style={styles.buttonContainer}>
									<Text style={styles.buttonText}>e</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPressOut={() => deleteTodo(id)}>
								<View style={styles.buttonContainer}>
									<Text style={styles.buttonText}>d</Text>
								</View>
							</TouchableOpacity>
						</View>
				    )}
              </View>
         )
    }
};
 
const styles = StyleSheet.create({
    container: {
         width: width - 50,
         flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'space-between',
	    borderRadius: 10,
	    backgroundColor: '#6771a6',
	    marginLeft: 10,
	    marginRight: 10,
	    marginBottom: 10,
    },
    rowContainer: {
	    backgroundColor: '#6771a6',
		flexDirection: 'row',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		width: width / 2,
		alignItems: 'center',
		justifyContent: 'space-between',
    },
    buttons: {
		backgroundColor: '#6771a6',
		flexDirection: 'row',
    },
    buttonContainer: {
		backgroundColor: '#6771a6',
		marginVertical: 10,
		marginHorizontal: 10,
    },
    buttonText: {
		fontFamily: 'HindSiliguri_400Regular',
    },
    text: {
         fontWeight: '500',
	    fontSize: 18,
	    fontFamily: 'HindSiliguri_400Regular',
         marginVertical: 20,
    },
    circle: {
	    width: 30,
	    backgroundColor: '#6771a6',
         height: 30,
         borderRadius: 15,
         borderWidth: 3,
	    marginRight: 20,
	    marginLeft:10,
    },
    completeCircle: {
         borderColor: '#6699cc',
    },
    incompleteCircle: {
         borderColor: '#fbd1a2',
    },
    strikeText: {
         color:'#6699cc',
         textDecorationLine: 'line-through',
    },
    unstrikeText: {
         color: '#29323c',
    },
    input: {
	marginVertical: 15,
	width: width / 2,
	paddingBottom: 5,
    },
});
 
export default TodoItem;