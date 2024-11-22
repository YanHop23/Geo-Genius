import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {View, StyleSheet, Image, Text, Button, Platform, Linking} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { api } from '../../api/api';

const MapBackground = ({
    location,
    handleClosePress,
    handleOpenPress,
    categoryId,
    
})=> {
  const [places, setPlaces] = useState([]);
  //беремо місця за ід категорії
  const getPlace = async () => {

    try {
      const placesData = await api.getPlaceByCategoryId(categoryId);
      setPlaces(placesData);
    } catch (error) {
      console.error('Failed to update places:', error);
    }
  }
  if (places.length === 0) {
    getPlace();
  }
  
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
                .map((place, index) => (
                  <Marker
                    key={index}
                    coordinate={{ latitude: parseFloat(place.latitude), longitude: parseFloat(place.longitude) }}
                    title={place.name}
                    onPress={() => handleOpenPress(1, parseFloat(place.id))}
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