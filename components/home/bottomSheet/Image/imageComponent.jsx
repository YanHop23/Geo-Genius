import React from 'react';
import { View, Image, Text, StyleSheet,ActivityIndicator } from 'react-native';

const ImageDisplay = ({ imageUri }) => {
  if (imageUri.length == 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;

    
  } else {
    return (
      <View style={styles.container}>
        <Image source={{ 
          uri: `data:image/png;base64,${imageUri[0].encodedImage}` 
         }} style={styles.image} resizeMode="cover" />
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  image: {
    width: 400,
    height: 400, // Можна змінити залежно від ваших потреб
    borderRadius: 10,
  },

});

export default ImageDisplay;
