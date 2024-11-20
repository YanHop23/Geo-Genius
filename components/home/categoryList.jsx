import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomCard from '../customcomponents/CustomCard';

const CategoryList = ({ categoryTable, changeCategory }) => {
    const navigation = useNavigation(); // Отримуємо навігаційний об'єкт

    const handleCategoryPress = (categoryId) => {
        changeCategory(categoryId);
        navigation.navigate('map', { category: categoryId });
        
        
    };

    const renderCategoryItem = ({ item }) => (
        <CustomCard
            key={item.id} 
            title={item.name} 
            imageUrl={item.imageUrl} // Зображення береться з бази даних
            onPress={() => handleCategoryPress(item.id)} 
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose category</Text>
            <FlatList 
                data={categoryTable} // Джерело даних
                renderItem={renderCategoryItem} // Функція рендеру кожного елементу
                keyExtractor={item => item.id.toString()} // Унікальний ключ для кожного елементу
                numColumns={2} // Вказуємо, що хочемо два стовпці
                contentContainerStyle={styles.listContainer} // Додаткові стилі для контейнера списку
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
        marginBottom: 20, // Зменшили відступ для кращого вигляду
    },
    listContainer: {
        flexGrow: 1, // щоб список займав весь доступний простір
        alignItems: 'center', // Вирівнюємо елементи по центру
    },
});

export default CategoryList;
