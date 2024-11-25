import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

export const Carusel = ({ images }) => {


    const renderCategoryItem = ({ item }) => (
        <View style={styles.item}> 
            <Image source={{ 
            uri: `data:image/png;base64,${item.encodedImage}` 
            }} style={styles.image} resizeMode="cover"/>
        </View>
    );

    return (
        <View style={styles.container}>
            <BottomSheetFlatList 
                data={images}
                renderItem={renderCategoryItem}
                horizontal
                contentContainerStyle={styles.listContainer} 
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item : { 
        flexDirection : 'row' , 
        alignItems : 'center' , 
        padding : 16 , 
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "500",
        marginBottom: 20, 
    },
    listContainer: {
        flexGrow: 1, 
        alignItems: 'center', 
    },
    card: {
        borderRadius: 10,
        backgroundColor: "#fff"
    },
    image: {
        width : 400, 
        height : 400, 
        marginRight : 16 ,
    },
});

