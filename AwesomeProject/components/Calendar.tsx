import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import DatePicker from 'react-native-modern-datepicker';
import AppButton from './AppButton';

const Calendar = ({ useStateSelect, setUseStateSelect, isDateVisible, setIsDateVisible, setHaveDate }: any) => {
    const CalendarInput = (date: string, state: any) => {
        console.log({ date })
        console.log('isDateVisible:', isDateVisible);

        return (
            <DatePicker
                // current="2020-07-13"
                // selected="2020-07-23"
                onSelectedChange={date => {
                    state(date);
                    setHaveDate(true)
                    setTimeout(() => {
                        setIsDateVisible(false);
                    }, 300);
                }}
                options={{
                    textHeaderColor: '#FFA25B',
                    textDefaultColor: '#FFA25B',
                    selectedTextColor: '#fff',
                    mainColor: '#F4722B',
                    textSecondaryColor: '#D6C7A1',
                    borderColor: '#FFA25B',
                }}
                mode="calendar"
                minuteInterval={30}
                style={{ borderWidth: 1, borderColor: '#FFA25B', borderRadius: 20 }}
            />
        );
    };

    return (
        <View style={styles.input}>
            {isDateVisible &&
                <View>{CalendarInput(useStateSelect, setUseStateSelect)}</View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 15,
        // width: 300,
        // alignSelf: 'center',
        // margin: 20,
        // position: 'absolute',
        // top: 230
    },
    valueText: {
        fontSize: 16,
        color: 'black',
        borderWidth: 1,
        borderColor: "#EE8732",
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 13,
        paddingLeft: 15,
        marginTop: 10,
        marginBottom: 10,
    }
})

export default Calendar

