import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useDB} from "../context/DBcontex";

export const NewListScreen = ({navigation}) => {
    const colors = ["#983b97", "#f7cb22", "#8190ed", "#6078db", "#94604f", "#28594e", "#c66e6b", "#fbfbfb", "#254a77", "#228038", "#857c3c", "#fb6383", "#a56782", "#b1442c", "#e43c5e", "#8da7a5"]

    const [color, setColor] = useState(colors[3])
    const [listName, setListName] = useState('')

    const {newList} = useDB();

    const submit = async () => {
        if(listName !== '') {
            const data = {
                title: listName,
                createdAt: new Date(),
                color: color,
            }
            setListName('')
            setColor(colors[3])
            Keyboard.dismiss()
            await newList(data)
            navigation.goBack()
        }
    }

    const OneColor = ({color}) => {
        return (
            <TouchableOpacity style={{
                marginEnd: 10,
                borderRadius: 10,
                overflow: 'hidden'
            }} onPress={() => setColor(color)}>
                <View style={{backgroundColor: color, width: 70, height: 70}}/>
            </TouchableOpacity>
        );
    }

    const renderItem = ({item}) => (
        <OneColor color={item}/>
    );

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={styles.header}>Create New TodoList</Text>

                <View style={styles.flatList}>
                    <FlatList data={colors}
                              renderItem={renderItem}
                              keyExtractor={color => color}
                              showsHorizontalScrollIndicator={false}
                              horizontal
                    />
                </View>

                <View style={[styles.colorSquare, {backgroundColor: color}]}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{color}</Text>
                </View>
            </View>

            <View style={styles.inputWrapper}>
                <TextInput
                    style={[styles.inputText]}
                    placeholder="Enter the new list name"
                    placeholderTextColor="grey"
                    onChangeText={(text) => setListName(text)}
                    value={listName}/>
                <TouchableOpacity style={styles.iconButton} onPress={() => submit()}>
                    <Ionicons name="add-outline" size={41} color="pink"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    colorSquare: {
        borderRadius: 10,
        width: 350,
        height: 150,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconButton: {
      backgroundColor: 'grey',
    },
    inputText: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 20,
        color: '#eae1db'
    },
    inputWrapper: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        flexDirection: 'row',
        marginHorizontal: 30,
        marginVertical: 10,
        overflow: 'hidden'
    },
    flatList: {
        marginHorizontal: 30,
        marginVertical: 40
    },
    header: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#53abbf'
    },
    container: {
        flex: 1,
        backgroundColor: '#14141c'
    },
})

