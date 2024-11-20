import { reloadAppAsync } from "expo";
import {React, useState, useEffect} from "react";
import { Text, View, StyleSheet, Image, Button, ActivityIndicator } from "react-native";
import { api } from "../../api/api";

export default function PeofileTab({ userId }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const data = await api.getUserById(userId);
            setUserData(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUser();
      }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.profileImage}
                    source={{ 
                        uri: `data:image/png;base64,${userData.avatar.encodedImage}` 
                    }}
                />
                <Text style={styles.nameText}>{userData.firstName} {userData.lastName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.text}>Nickname: {userData.nickname}</Text>
                <Text style={styles.text}>Email: {userData.email}</Text>
                <Text style={styles.text}>Age: {userData.age}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    infoContainer: {
        width: '100%',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
