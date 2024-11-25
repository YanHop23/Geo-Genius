import React from "react";
import { Alert, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Profile from "./profile"; 
import App from "./app";
import { state } from "../../state";
const Tab = createBottomTabNavigator();

const HomeScreen = ({ route }) => {
    const userId = route.params?.userId;
    const userTable = state.UsersTable; 
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="App" 
                children={() => <App/>} 
                options={{
                    title: 'Map',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
                }}
            />
            <Tab.Screen 
                name="Profile" 
                children={() => <Profile userId={userId} userTable={userTable} />} 
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "500",
    },
});

export default HomeScreen;
