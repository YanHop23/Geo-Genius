import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Іконки для зірок

const Rating = ({commenst}) => {

    let halfRating = 0
    commenst.forEach(comment => {
        halfRating += comment.rating
    });
    halfRating=halfRating / commenst.length
    
    
    return (
        <View style={styles.container}>
        <Text style={styles.averageRating}>
            Середня оцінка: {halfRating.toFixed(1)}
        </Text>
        <Text style={styles.numberOfRatings}>
            Кількість оцінок: {commenst.length}
        </Text>
        {/* <View style={styles.starsContainer}>
            {stars
            .fill()
            .map((_, index) => (
                <FontAwesome key={`filled-${index}`} name="star" style={styles.starFilled} />
            ))}
            {2 === 1 && (
            <FontAwesome name="star-half" style={styles.starHalf} />
            )}
            {Array(3)
            .fill()
            .map((_, index) => (
                <FontAwesome key={`empty-${index}`} name="star-o" style={styles.starEmpty} />
            ))}
        </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    averageRating: {
        fontSize: 18,
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
        fontSize: 24,
        color: '#FFD700', // Жовтий
        marginHorizontal: 2,
    },
    starHalf: {
        fontSize: 24,
        color: '#FFD700', // Жовтий
        marginHorizontal: 2,
    },
    starEmpty: {
        fontSize: 24,
        color: '#C0C0C0', // Сірий
        marginHorizontal: 2,
    },
});

export default Rating;
