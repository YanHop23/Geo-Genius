import React, { useState } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Іконки для зірок

const Rating = ({commenst}) => {

    if (commenst.length == 0) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
        let halfRating = 0
        commenst.forEach(comment => {
            halfRating += comment.rating
        });
        halfRating=halfRating / commenst.length
        let fillStar = Math.floor(halfRating)
        let emptyStar = 5 - fillStar

        return (
            <View style={styles.container}>
            <Text style={styles.averageRating}>
                {halfRating.toFixed(1)}
                <Text>  </Text>
                <View style={styles.starsContainer}>
                {Array(fillStar)
                .fill()
                .map((_, index) => (
                    <FontAwesome key={`filled-${index}`} name="star" style={styles.starFilled} />
                ))}
                {Array(Math.round(emptyStar))
                .fill()
                .map((_, index) => (
                    <FontAwesome key={`empty-${index}`} name="star-o" style={styles.starEmpty} />
                ))}
            </View>
            </Text>
            <Text style={styles.numberOfRatings}>
                Кількість оцінок: {commenst.length}
            </Text>
            
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    averageRating: {
        fontSize: 23,
        fontWeight: '600',
        marginBottom: 5,
    },
    numberOfRatings: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    starFilled: {
        fontSize: 20,
        color: '#FFD700', // Жовтий
        marginHorizontal: 2,
    },
    starHalf: {
        fontSize: 20,
        color: '#FFD700', // Жовтий
        marginHorizontal: 2,
    },
    starEmpty: {
        fontSize: 20,
        color: '#C0C0C0', // Сірий
        marginHorizontal: 2,
    },
});

export default Rating;
