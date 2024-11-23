import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {View, StyleSheet, Image, Text, Button, Platform, Linking} from 'react-native';
import * as Location from 'expo-location';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MapBackground from './mapBackground';
import {state} from '../../state'
import { CustomBtn } from '../customcomponents/customBtn';
import { api } from '../../api/api';
import Rating from './bottomSheet/Comments/Rating';
import ImageDisplay from './bottomSheet/Image/imageComponent';
import { RouteBtn } from '../customcomponents/buttonRoute';
import { CommentsDisplay } from './bottomSheet/Comments/Comment';

const Map = ({route})=> {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [directionLat, setDirectionLat] = useState(0);
    const [directionLng, setDirectionLng] = useState(0);
    const [titlePlace, setTitlePlace] = useState('');
    const [descriptionPlace, setDescriptionPlace] = useState('');
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(()=>['25%', '90%'], []);
    const categoryId = route.params?.category;
    const [images, setImages] = useState([]);
    const [places, setPlaces] = useState([]);
    const [commenst, setCommenst] = useState([]);
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
    const getComment = async (placeId) => {
        try {
            const commentsData = await api.getCommentByPlaceId(placeId);
            const imagessData = await api.getImagesByPlaceId(placeId);
            setCommenst(commentsData);
            setImages(imagessData)
            
            
        } catch (error) {
            console.error('Failed to update comments:', error);
        }
    }
    const handleClosePress = () =>{
        bottomSheetRef.current?.close();
        setIsVisible(false)
        setImages([])
        setCommenst([])

    } ;
    const handleOpenPress = (index, id) =>{
        getComment(id)
        let markerPlace=places.find((place)=> place.id == id); 
        setTitlePlace(markerPlace.name);
        setDescriptionPlace(markerPlace.description)
        setIsVisible(true)
        bottomSheetRef.current?.snapToIndex(index)
        
        setDirectionLat(markerPlace.latitude)
        setDirectionLng(markerPlace.longitude)
    } ;
    
    

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
                categoryId={categoryId}
                getPlaceByCategoryId={api.getPlaceByCategoryId}
            />
            {
                isVisible ?
                <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={() => {
                    setIsVisible(false)
                    setImages([])
                    setCommenst([])
                }}
                >
                <BottomSheetScrollView style={styles.contentContainer}>
                    <Text style={styles.title}>{titlePlace}</Text>
                    <Rating commenst={commenst}/>
                    <Text>{descriptionPlace}</Text>
                    <RouteBtn title='Переглянути маршрут' onPress={onDirectionButton}/>      
                    <Text style={styles.textSub}>Фото:</Text>
                    <ImageDisplay imageUri={images}/>
                    <Text style={styles.textSub}>Відгуки:</Text>
                    
                    {
                        commenst.map((comment, index) => (
                            <CommentsDisplay key={index} comment={comment}/>
                        ))
                    }
                    <Text style={styles.textSub1}>Відгуки:</Text>
                </BottomSheetScrollView>
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
        padding: 20,
      },
    title: {
        fontFamily: 'Roboto',
        fontSize: 25,
        fontWeight: '600',
        letterSpacing: 0,
        lineHeight: 24,
    },
    textSub: {
        fontSize: 16, 
        fontWeight: '500',
        letterSpacing: 0, 
        lineHeight: 24, 
    },
    textSub1: {
        fontSize: 16, 
        fontWeight: '500',
        letterSpacing: 0, 
        lineHeight: 24,
        color: '#fff',
    },
      image: {
        width: "80%",
        height: "80%",
    },
});

export default Map;