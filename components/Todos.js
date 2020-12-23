import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons"
import Todo from "./Todo";
import {useDB} from "../context/DBcontex";


export const TodosModal = (props) => {

    const [todo, setTodo] = useState('');

    const {addNewTodo, getCurrentList, currentList, setCurrentList} = useDB();

    const listId = props.data.id;

    useEffect(() => {
        const fetchList = async () => await getCurrentList(listId)
        fetchList().catch(error => console.log(error))
        return () => setCurrentList(null) // run when component will be unmounted
    }, [])

    const submit = async () => {
        if(todo !== '') {
            const data = {
                completed: false,
                createdAt: new Date(),
                title: todo,
            }
            await addNewTodo(listId, data)
            Keyboard.dismiss()
            setTodo('')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{position: 'absolute', top: 24, right: 32}}
                              onPress={props.closeModal}>
                <AntDesign name="close" size={24} color="black"/>
            </TouchableOpacity>
            <Text style={[styles.listName, {color: props.data.color}]}> List: {props.data.title} </Text>

            <FlatList data={currentList}
                      renderItem={({item}) => <Todo item={item} color={props.data.color} listId={props.data.id}/>}
                      keyExtractor={(item) => item.title}
                      style={styles.list}
                      showsVerticalScrollIndicator={false}
            />

            <View style={[styles.inputContainer, {borderColor: props.data.color}]}>
                <TextInput placeholder="add a new todo"
                           placeholderTextColor={props.data.color}
                           style={[styles.input, {color: props.data.color}]}
                           value={todo}
                           onChangeText={text => setTodo(text)}/>
                <TouchableOpacity style={{backgroundColor: props.data.color}} onPress={() => submit()}>
                    <Ionicons name="add-outline" size={41} color="white"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#364a61'
    },
    inputContainer: {
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 10,
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 17,
        // borderWidth: 2,
    },
    list: {
        flex: 1,
        // borderWidth: 2,
        borderColor: 'red',
        marginHorizontal: 20,
        marginVertical: 30,
    },
    listName: {
        // borderWidth: 2,
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20
    }
})
