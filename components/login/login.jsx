import React from "react";
import { Button, Text, View, } from "react-native";
import { StyleSheet } from "react-native";
import { CustomBtn } from "../customcomponents/customBtn";


export default LoginScreen = ({navigation }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                maps
            </Text>
            <CustomBtn onPress={() =>
                navigation.navigate('entire')
            } title={'Вхід'} />
            <CustomBtn onPress={() =>
                navigation.navigate('register')
            } title={'Реєстрація'}/>
            
        </View>
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
        marginBottom: 50,
    },
})