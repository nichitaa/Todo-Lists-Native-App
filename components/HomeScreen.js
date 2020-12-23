import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {TodosModal} from "./Todos";
import {useDB} from "../context/DBcontex";
import moment from "moment";

export const Header = () => {
    return (
        <View style={{backgroundColor: '#1C2833', paddingTop: 25}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                <Text style={styles.todo}>Todo</Text>
                <Text style={styles.list}>List</Text>
            </View>
            <View style={{alignSelf: 'flex-end', marginRight: 5}}>
                <Text style={{color: 'grey'}}>by nikitaal</Text>
            </View>
        </View>
    )
}

export const HomeScreen = () => {
    const [showModal, setShowModal] = useState(false)
    const [currentList, setCurrentList] = useState({})

    const {lists, deleteList, loading} = useDB()

    if (loading) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }

    const toggleModal = (listData = null) => {
        setCurrentList(listData)
        setShowModal(prev => !prev)
    }

    const onDelete = async (list) => {
        await deleteList(list)
    }


    const OneListCard = ({item}) => (
        <TouchableOpacity onPress={() => {toggleModal(item)}}>
            <View style={[styles.item, {backgroundColor: item.color}]}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 27, alignSelf: 'center', fontWeight: 'bold'}}>{item.title}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingHorizontal: 1,
                        marginTop: 10}}>
                        <Text style={{fontSize: 12}}>{moment(item.createdAt.toDate()).calendar()}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}
                                  onPress={() => onDelete(item)}>
                    <Ionicons name="trash-outline" size={41} color="#fb634c"/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={showModal}
                onRequestClose={() => {toggleModal()}}>
                <TodosModal closeModal={() => toggleModal()} data={currentList}/>
            </Modal>

            <FlatList
                style={styles.flatList}
                data={lists}
                renderItem={({item}) => <OneListCard item={item}/>}
                keyExtractor={(item) => item.title}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 5,
        marginHorizontal: 50,
        marginTop: 20,
    },
    flatList: {},
    todo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'grey'
    },
    list: {
        fontSize: 30,
        color: '#53abbf'
    },
    header: {
        borderWidth: 2,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#14141c'
    }
})

