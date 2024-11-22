import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ImageDisplay = ({ imageUri }) => {
    
  return (
    <View style={styles.container}>
      <Image source={{ 
        uri: `data:image/png;base64,${imageUri.encodedImage}` 
       }} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 400, // Можна змінити залежно від ваших потреб
    borderRadius: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default ImageDisplay;