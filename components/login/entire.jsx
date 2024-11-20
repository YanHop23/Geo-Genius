import {React, useState} from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert, RefreshControlComponent } from "react-native";
import {state} from './../../state';
import { useNavigation } from '@react-navigation/native';
import { api } from "../../api/api";

const EntireScreen = ({ setUserId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation();


    const handleLogin = async () => {
        if (email && password) {
            const result = {
                email: email,
                password: password
            }
            try {
                await api.validateLogin(result);
                const userData = await api.getUserByEmail(email)                
                Alert.alert('Успішно!', `${userData.firstName}, ви Увійшли!`);
                console.log(userData);
                
                navigation.navigate('home', { userId: userData.id } );
            } catch (error) {
                console.log(error);
                
                Alert.alert('Помилка', 'Не вдалося зареєструвати користувача');
            }
        } else {
            Alert.alert('Помилка', 'Будь ласка, заповніть всі поля.');
        }
    };
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Вхід до акаунту</Text>
            <TextInput
                style={styles.input}
                placeholder="Електронна пошта"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Увійти" onPress={handleLogin} />
        </View>
    );
}

export default EntireScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#f9f9f9',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
    },
  });
  