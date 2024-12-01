import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { api } from '../../../../api/api';

export const CommentsDisplay = ({ comment }) => { 
    
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let fillStar = comment.rating
    let emptyStar = 5 - fillStar
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const data = await api.getUserById(comment.userId);
            setUserData(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUser();
      }, [comment.userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }
    return (
        <View style={styles.commentContainer}>
        <Image source={{
                uri: `data:image/png;base64,${userData.avatar.encodedImage}` 
             }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
          <Text style={styles.averageRating}>
                {fillStar}
                <Text>  </Text>
                <View style={styles.starsContainer}>
                {Array(fillStar)
                .fill()
                .map((_, index) => (
                    <FontAwesome key={`filled-${index}`} name="star" style={styles.starFilled} />
                ))}
                {Array(emptyStar)
                .fill()
                .map((_, index) => (
                    <FontAwesome key={`empty-${index}`} name="star-o" style={styles.starEmpty} />
                ))}
            </View>
            </Text>
          <Text style={styles.comment}>{comment.text}</Text>
        </View>
      </View>
    );

};

const styles = StyleSheet.create({
    commentContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    text: {
        width: 40,
        color: '#fff',
    },
    textContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    comment: {
      fontSize: 14,
      color: '#555',
      lineHeight: 18,
    },
    averageRating: {
        fontSize: 15,
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
        fontSize: 15,
        color: '#FFD700', 
        marginHorizontal: 2,
    },
    starHalf: {
        fontSize: 15,
        color: '#FFD700', 
        marginHorizontal: 2,
    },
    starEmpty: {
        fontSize: 15,
        color: '#C0C0C0', 
        marginHorizontal: 2,
    },
  });
