import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { View, Text } from "./Themed";
import PropTypes from "prop-types";
import CustomIcon from "../components/icons/CustomIcon";
import { COLORS } from "../assets/COLORS";

const { height, width } = Dimensions.get("window");

interface IProps {
}

interface IState {
	todoValue?: any;
	isEditing?: boolean;
}
 
class TodoItem extends Component<{todo?: any, deleteTodo: Function, inCompleteTodo: Function, CompleteTodo: Function, updateTodo: Function, textValue?: String, isCompleted?: boolean, id?: String,}, IState> {

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

	controlInput(textValue: String){
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
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completeCircle : styles.incompleteCircle,
              ]}
            >
              <CustomIcon iconPath={require("../assets/images/2x/round_done_blue_18dp.png")}/>
            </View>
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
            <Text style={[styles.text,
                isCompleted ? styles.strikeText : styles.unstrikeText,
                styles.input,
              ]}>{textValue}</Text>
          )}
        </View>
        {isEditing ? (
          <TouchableOpacity onPress={this.finishEditing}>
            <View style={styles.buttonContainer}>
              <CustomIcon iconPath={require("../assets/images/2x/round_done_blue_18dp.png")}/>
             </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.startEditing}>
              <View style={styles.buttonContainer}>
                <CustomIcon iconPath={require("../assets/images/2x/round_create_blue_18dp.png")}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(id)}>
              <View style={styles.buttonContainer}>
                <CustomIcon iconPath={require("../assets/images/2x/round_delete_blue_18dp.png")}/>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#4986c2",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    textAlign: "left",
    color: COLORS.beige,
  },
  rowContainer: {
    backgroundColor: "#4986c2",
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: width / 2,
    alignItems: "center",
    justifyContent: "space-between",
    color: COLORS.beige,
  },
  buttons: {
		backgroundColor: "#4986c2",
		flexDirection: "row",
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
  },
  buttonContainer: {
		backgroundColor: "#4986c2",
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		marginVertical: 10,
		marginHorizontal: 10,
		textAlign: "center",
  },
  buttonText: {
		borderTopRightRadius: 10,
		paddingBottom: 15,
		borderBottomRightRadius: 10,
    marginBottom: 1,
		alignContent: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    fontFamily: "HindSiliguri_400Regular",
    marginVertical: 20,
    textAlign: "left",
    color: COLORS.beige,
  },
  circle: {
    width: 32,
    backgroundColor: COLORS.lightBlue,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
		marginHorizontal: 10,
  },
  completeCircle: {
		borderColor: "#8cb2d9",
		backgroundColor: "#4986c2",
  },
  incompleteCircle: {
    borderColor: COLORS.lightBlue,
  },
  strikeText: {
    color: COLORS.lightBlue,
    textDecorationLine: "line-through",
  },
  unstrikeText: {
    color: COLORS.beige,
  },
  input: {
		marginVertical: 15,
		width: width / 2,
  },
});
 
export default TodoItem;
