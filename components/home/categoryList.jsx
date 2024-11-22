import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomCard from '../customcomponents/CustomCard';

const CategoryList = ({ categoryTable, changeCategory }) => {
    const navigation = useNavigation(); 

    const handleCategoryPress = (categoryId) => {
        changeCategory(categoryId);
        navigation.navigate('map', { category: categoryId });
        
        
    };

    const renderCategoryItem = ({ item }) => (
        <CustomCard
            key={item.id} 
            title={item.name} 
            imageUrl={item.imageUrl} 
            onPress={() => handleCategoryPress(item.id)} 
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Виберіть категорію</Text>
            <FlatList 
                data={categoryTable}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id.toString()} 
                numColumns={2} 
                contentContainerStyle={styles.listContainer} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: "#fff"
    },
});

export default CategoryList;
