import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {View, StyleSheet, Image, Text, Button, Platform, Linking} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MapBackground from './mapBackground';
import {state} from '../../state'
import CategoryList from './categoryList';
// import { fetchImageData, getImage } from '../../api/ImageApi';
import { CustomBtn } from '../customcomponents/customBtn';

const Map = ({route})=> {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [directionLat, setDirectionLat] = useState(0);
    const [directionLng, setDirectionLng] = useState(0);
    const [titlePlace, setTitlePlace] = useState('');
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(()=>['25%', '90%'], []);
    const category = route.params?.category;
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        async function getImage() {
        const uri = await fetchImageData();
        setImageUri(uri);
        }

        getImage();
    }, []);
    const handleClosePress = () =>{
        bottomSheetRef.current?.close();
        setIsVisible(false)
    } ;
    const handleOpenPress = (index, id) =>{
        let markerPlace=state.LocationTable.find((place)=> place.id == id); 
        setTitlePlace(markerPlace.name);
        setIsVisible(true)
        bottomSheetRef.current?.snapToIndex(index)
        
        setDirectionLat(markerPlace.latitude)
        setDirectionLng(markerPlace.longitude)
    } ;
    
    const changeCategory = (index) => {
        setCategory(index)
    }

    const onDirectionButton = () => {

        
        // Перевіряємо, чи платформа Android
        if (Platform.OS === 'android') {
        const userLat = location.latitude;
        const userLng = location.longitude;
        const scheme = 'google.navigation:q=';
        const destinationLatLng = `${directionLat},${directionLng}`;
        const userLatLng = `${userLat},${userLng}`;
        const url = `${scheme}${destinationLatLng}&origin=${userLatLng}`;
        
        Linking.openURL(url);
        } else {
        console.warn("Ця функція доступна лише на Android");
        }
    };


    useEffect(() => {
        (async () => {
        // Запит дозволу на доступ до геолокації
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        
        // Отримання поточної геолокації
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        setIsVisible(false);
        })();
    }, []);

    if (!location) {
        return <View style={styles.container}><Text>Loading map...</Text></View>;
    }
    return (
        
        
            
        <GestureHandlerRootView style={{ flex: 1 }}>
            
            <View style={styles.container}>
            
            <MapBackground 
                location={location} 
                handleClosePress={handleClosePress}
                handleOpenPress={handleOpenPress}
                places={state.LocationTable}
                category={category}
            />
            {
                isVisible ?
                <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={() => setIsVisible(false)}
                >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>{titlePlace}</Text>
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                    />
                <CustomBtn title='Переглянути маршрут' onPress={onDirectionButton} width={300}/>
                </BottomSheetView>
                </BottomSheet>
                :<></>
            }
            </View>
    
        </GestureHandlerRootView>
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
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
});

export default Map;