import React, {useContext, useState, useEffect} from 'react';
import {db} from "../firebase";

const DBContext = React.createContext();

export const useDB = () => useContext(DBContext);

export const DBProvider = ({children}) => {
    const [loading, setLoading] = useState()
    const [lists, setLists] = useState([])
    const [currentList, setCurrentList] = useState({})

    const getLists = async () => {
        setLoading(true)
        return db.collection('lists')
            .onSnapshot((snapshot) => {
                setLists(snapshot.docs.map(doc => doc.data()))
            });
    }

    const getCurrentList = async (listId) => {
        const colRef = db.collection('lists').doc(listId).collection('todos')
        return colRef.onSnapshot((snapshot) => {setCurrentList(prev => snapshot.docs.map(doc => doc.data()))})
    }

    const newList = async (list) => {
        const docRef = db.collection('lists').doc()
        return await docRef.set({...list, id: docRef.id})
    }

    const deleteList = async (list) => {
        const docRef = db.collection('lists').doc(list.id)
        return await docRef.delete()
    }

    const addNewTodo = async (listId, todo) => {
        const docRef = db.collection('lists').doc(listId).collection('todos').doc()
        const data = {...todo, id: docRef.id}
        return await docRef.set({...data})
    }

    const deleteTodo = async (listId, todo) => {
        const docRef = db.collection('lists').doc(listId).collection('todos').doc(todo.id)
        return await docRef.delete()
    }

    const toggleTodoCompleted = async (listId, todo) => {
        const docRef = db.collection('lists').doc(listId).collection('todos').doc(todo.id)
        await docRef.get().then(async doc => {
            return await docRef.update({
                completed: !doc.data().completed
            })
        })
    }

    useEffect(() => {
        getLists().then(() => {setLoading(false)})
    }, [])

    const value = {
        getCurrentList,
        setCurrentList,
        currentList,
        getLists,
        lists,
        newList,
        deleteList,
        addNewTodo,
        toggleTodoCompleted,
        deleteTodo,
        loading
    }

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    );
}
