import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { api } from './../../api/api';
import { useNavigation } from '@react-navigation/native';


const RegistrationComponent = ({ setUserId }) => {
  const navigation = useNavigation();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [number, setNumber] = useState(0)
  const [validate, setValidate] = useState(true);

  const handleRegister = async () => {

    if (firstname && lastname && nickName && email && password && age) {
      const userData = {
        firstName: firstname,
        lastName: lastname,
        nickname: nickName,
        age: parseInt(age),
        email: email,
        password: password,
      };

      // console.log(userData);
      try {
        
        const result = await api.registerUser(userData);
        Alert.alert('Успішно!', `${firstname}, ви зареєструвалися!`);
        setUserId(result.id);
        navigation.navigate('home', { userId: result.id } );
      } catch (error) {
        console.log(error);
        
        Alert.alert('Помилка', 'Не вдалося зареєструвати користувача');
      }
    } else {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі поля.');
    }
  };
  const handleLogin = () => {
    console.log('tetst');
    
  }
  if(validate) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      <TextInput
        style={styles.input}
        placeholder="Ім'я"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Прізвище"
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Вигадайте нікнейм"
        value={nickName}
        onChangeText={setNickName}
      />
      <TextInput
        style={styles.input}
        placeholder="Вік"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
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
      <Button title="Зареєструватися" onPress={handleRegister} />
    </View>
  );

} else {
return(
    <View style={styles.container}>
    <Text style={styles.title}>Підтвердження електронної адреси </Text>
    <TextInput
    style={styles.input}
    placeholder="Введіть номер з пошти"
    value={email}
        onChangeText={setNumber}
        keyboardType="number-pad"
        autoCapitalize="none"
        />
    <Button title="Увійти" onPress={handleLogin} /> : 
</View>
);
}
};

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
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default RegistrationComponent;
