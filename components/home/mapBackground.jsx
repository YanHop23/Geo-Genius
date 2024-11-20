import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {View, StyleSheet, Image, Text, Button, Platform, Linking} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const MapBackground = ({
    location,
    handleClosePress,
    handleOpenPress,
    places,
    category,
})=> {

  if (!location) {
    return <View style={styles.container}><Text>Loading map...</Text></View>;
  }

  return (
        <MapView
            style={styles.map}
            initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            showsUserLocation
            showsMyLocationButton
            onPress={handleClosePress}
        >
            {              
                places
                .filter(place => place.category == category) // Фільтруємо місця за категорією
                .map((place, index) => (
                  <Marker
                    key={index}
                    coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                    title={place.name}
                    onPress={() => handleOpenPress(1, place.id)}
                  />
                ))
            }

        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
      },
});

export default MapBackground;