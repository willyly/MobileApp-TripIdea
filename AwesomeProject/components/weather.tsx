import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = 'your_api_key';
const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`;

const WeatherScreen = () => {
    const [city, setCity] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        axios.get(API_ENDPOINT)
            .then(response => {
                setCity(response.data.name);
                setTemperature(response.data.main.temp);
                setDescription(response.data.weather[0].description);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{city}</Text>
            <Text style={styles.subtitle}>{description}</Text>
            <Text style={styles.temp}>{temperature} K</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 16,
    },
    temp: {
        fontSize: 24,
    },
});

export default WeatherScreen;
