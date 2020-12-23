import React from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import moment from "moment";
import {useDB} from "../context/DBcontex";

function Todo({item, color, listId}) {

    const {deleteTodo, toggleTodoCompleted} = useDB()

    const onDelete = async () => {
        await deleteTodo(listId, item)
    }

    const toggleCompleted = async () => {
        await toggleTodoCompleted(listId, item)
    }

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}
                                  onPress={() => toggleCompleted()}>
                    <Ionicons name={item.completed ? "ios-square" : "ios-square-outline"} size={41} color="#47dbb9"/>
                </TouchableOpacity>
                <View style={styles.todoInfo}>
                    <Text
                        style={[styles.todoTitle, {textDecorationLine: item.completed ? 'line-through' : 'none'}]}>
                        {item.title}
                    </Text>
                    <Text style={styles.todoDate}>{moment(item.createdAt.toDate()).calendar()}</Text>
                </View>
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onPress={() => onDelete()}
                >
                    <Ionicons name="trash-outline" size={41} color="#fb634c"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderRadius: 10,
        padding: 5,

    },
    todoTitle: {
        fontSize: 22,
        flex: 1,
        alignSelf: 'center'
    },
    todoDate: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 10,
        color: 'white'
    },
    todoInfo: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 5,
    }
});

export default Todo;
