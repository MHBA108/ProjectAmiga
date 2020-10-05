import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
    } from 'react-native';
 
const {height, width} = Dimensions.get('window');
 
class TodoItem extends Component {
 
    state = {
         isCompleted: false,
    };
 
    toggleItem = () => {
         this.setState(prevState => {
              return {
                   isCompleted: !prevState.isCompleted,
              };
         });
    };
 
    render() {
         const {isCompleted} = this.state;
         return(
              <View style={styles.container}>
                   <TouchableOpacity onPress={this.toggleItem}>
                        <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}/>
                   </TouchableOpacity>
                   <Text style={[styles.text, isCompleted ? styles.strikeText : styles.unstrikeText]}>Todo List will show here</Text>
              </View>
         );
    };
}
 
const styles = StyleSheet.create({
    container: {
         width: width - 65,
         borderBottomColor: '#6699cc',
         borderBottomWidth: StyleSheet.hairlineWidth,
         flexDirection: 'row',
         alignItems: "center",
    },
    text: {
         fontWeight: '500',
         fontSize: 18,
         marginVertical: 20,
    },
    circle: {
         width: 30,
         height:30,
         borderRadius: 15,
         borderWidth: 3,
         marginRight: 20,
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
});
 
export default TodoItem;