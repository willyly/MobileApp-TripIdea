import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import DatePicker from 'react-native-modern-datepicker';
import AppButton from './AppButton';

const SelectTimeInput = ({ useStateSelect, setUseStateSelect, isTimeVisible, setIsTimeVisible, setHaveTime }: any) => {

    return (
        <View>
            {isTimeVisible && <View >
                <DatePicker
                    mode="time"
                    minuteInterval={3}
                    onTimeChange={(selectedTime) => {
                        setUseStateSelect(selectedTime)
                        setHaveTime(true)
                        setIsTimeVisible(false);
                    }}
                    options={{
                        textHeaderColor: '#FFA25B',
                        textDefaultColor: '#FFA25B',
                        selectedTextColor: '#fff',
                        mainColor: '#F4722B',
                        textSecondaryColor: '#D6C7A1',
                        borderColor: '#FFA25B',
                    }}
                    style={styles.container}
                />
            </View>
            }
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        width: 350,
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#EE8732",
    },
})

export default SelectTimeInput