import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const RouteBtn = ({onPress, title}) =>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer} >
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    appButtonContainer: {
        elevation: 8,
        backgroundColor: "blue",
        width: '100%',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 12,
        marginVertical: 15,
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});