import React from "react";
import { StyleSheet, StatusBar, Dimensions, Platform } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Text, View } from "./Themed";
import TodoItem from "./TodoItem";
import { AppLoading } from "expo";
import "react-native-get-random-values";
import { v1 as uuidv1 } from "uuid";
import { AsyncStorage } from "react-native";
import { COLORS } from "../assets/COLORS";
import EStyleSheet from "react-native-extended-stylesheet";

const { height, width } = Dimensions.get("window");

interface IProps {}

interface IState {
  newTodoItem?: any;
  dataIsReady?: any;
  todos?: any;
}

export default class TodoList extends React.Component<IProps, IState> {
  newTodoItem: any;
  constructor(props: any) {
    super(props);
    this.state = {
      dataIsReady: false,
      newTodoItem: "",
      todos: {},
    };
    this.newTodoItemController = this.newTodoItemController.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.loadTodos = this.loadTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.inCompleteTodo = this.inCompleteTodo.bind(this);
    this.CompleteTodo = this.CompleteTodo.bind(this);
    this.UpdateTodo = this.UpdateTodo.bind(this);
    this.saveTodos = this.saveTodos.bind(this);
  }

  newTodoItemController(textValue: any) {
    this.setState({
      newTodoItem: textValue,
    });
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async () => {
    try {
      if ((await AsyncStorage.getItem("todos")) != null) {
        const getTodos: string | null = await AsyncStorage.getItem("todos");
        const parsedTodos = getTodos ? JSON.parse(getTodos) : "";
        this.setState({ dataIsReady: true, todos: parsedTodos || {} });
      }
    } catch (err) {
      console.log(err);
    }
  };

  saveTodos(newToDos: any) {
    const saveTodos = AsyncStorage.setItem("todos", JSON.stringify(newToDos));
  }

  addTodo = () => {
    const { newTodoItem } = this.state;
    if (newTodoItem != "") {
      this.setState((prevState) => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            textValue: newTodoItem,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          newTodoItem: "",
          todos: {
            ...prevState.todos,
            ...newToDoObject,
          },
        };
        this.saveTodos(newState.todos);
        return { ...newState };
      });
    }
  };

  inCompleteTodo(id: any) {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false,
          },
        },
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  }

  CompleteTodo(id: any) {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true,
          },
        },
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  }

  UpdateTodo(id: any, textValue: any) {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            textValue: textValue,
          },
        },
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  }

  deleteTodo(id: any) {
    this.setState((prevState) => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos,
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  }

  render() {
    const { newTodoItem, dataIsReady, todos } = this.state;
    if (!dataIsReady) {
      // return <AppLoading/>;
    }
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>To Do:</Text>
          <TextInput
            style={styles.input}
            placeholder="Add task..."
            value={newTodoItem}
            onChangeText={this.newTodoItemController}
            placeholderTextColor={COLORS.beige}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this.addTodo}
          />
        </View>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {Object.values(todos).map((item: any) => (
            <TodoItem
              key={item.id}
              {...item}
              deleteTodo={this.deleteTodo}
              inCompleteTodo={this.inCompleteTodo}
              CompleteTodo={this.CompleteTodo}
              updateTodo={this.UpdateTodo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  card: {
    marginTop: "25rem",
    backgroundColor: COLORS.darkBlue,
    fontFamily: "HindSiliguri_400Regular",
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    aspectRatio: 5 / 1,
    alignItems: "center",
    paddingHorizontal: "10rem",
  },
  title: {
    fontFamily: "HindSiliguri_700Bold",
    color: COLORS.white,
    fontSize: "24rem",
    flex: 1,
  },
  input: {
    fontFamily: "HindSiliguri_400Regular",
    fontSize: "20rem",
    color: COLORS.beige,
    flex: 3,
  },
  listContainer: {
    alignItems: "center",
  },
});
