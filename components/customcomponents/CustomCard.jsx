import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CustomCard = ({ title, imageUrl, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image 
                source={{ uri: imageUrl }} 
                style={styles.image}
            />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingTop:10,
        overflow: 'hidden',
        margin: 10,
        width: '45%', 
        alignItems: 'center',
        elevation: 5, // додаємо тінь для картки
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    image: {
        width: '80%',
        height: 150, 
        resizeMode: 'cover', 
    },
    title: {
        backgroundColor: '#fff',
        fontSize: 25,
        width: "100%",
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 5,
    }
});

export default CustomCard;
