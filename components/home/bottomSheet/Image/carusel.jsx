import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

export const Carusel = ({ images, setScrollEnabled }) => {
    const renderCategoryItem = ({ item }) => (
        <View style={styles.item}>
            <Image
                source={{
                    uri: `data:image/png;base64,${item.encodedImage}`,
                }}
                style={styles.image}
                resizeMode="cover"
            />
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
                onTouchStart={() => setScrollEnabled(false)} 
                onTouchEnd={() => setScrollEnabled(true)} 
                onMomentumScrollBegin={() => setScrollEnabled(false)} 
                onMomentumScrollEnd={() => setScrollEnabled(true)} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    listContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 300, 
        width: 340,
        borderRadius: 10,
    },
});
