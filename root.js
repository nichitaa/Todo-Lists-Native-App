import React from 'react';
import {Header, HomeScreen} from "./components/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {NewListScreen} from "./components/NewListScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useDB} from "./context/DBcontex";

const Tab = createBottomTabNavigator();


export const Root = () => {

    const {lists} = useDB();

    return (
        <>
            <Header/>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'home-outline'
                                    : 'home-outline';
                            } else if (route.name === 'Add New List') {
                                iconName = focused
                                    ? 'duplicate-outline'
                                    : 'duplicate-outline';
                            }
                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#53abbf',
                        inactiveTintColor: 'grey',
                        keyboardHidesTabBar: true,
                        style: {backgroundColor: '#1C2833'}
                    }}
                >
                    <Tab.Screen name="Home" component={HomeScreen} options={{tabBarBadge: lists.length}}/>
                    <Tab.Screen name="Add New List" component={NewListScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </>
    )
}
