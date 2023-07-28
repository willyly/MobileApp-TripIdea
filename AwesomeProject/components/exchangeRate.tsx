import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const API_ENDPOINT = 'https://v6.exchangerate-api.com/v6/79e9c7e2497e1f1f9dabfa5c/latest/USD';

const ExchangeRatesScreen = () => {
    const [baseCurrency, setBaseCurrency] = useState('HKD');
    const [conversionCurrency, setConversionCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(Number);

    useEffect(() => {
        const getExchangeRate = async () => {
            const response = await axios.get(API_ENDPOINT);
            console.log("tttttttttttttttttttttttt", response.data)
            const rates = response.data.conversion_rates;
            const conversionRate = rates[conversionCurrency] / rates[baseCurrency];
            setExchangeRate(conversionRate);
        }

        getExchangeRate();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>1 {baseCurrency} equals</Text>
            <Text style={styles.subtitle}>{exchangeRate} {conversionCurrency}</Text>
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
    },
});

export default ExchangeRatesScreen;
