import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Animated } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
// <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
import { StackNavigatorParamList } from "../navigators/AppStack";

const PreviousButton = ({ navigation, onUpdated }: any) => {
    const goBack = () => {
        // navigation.goBack();
        navigation.navigate('我的行程', { onUpdated })
    }

    return (
        <TouchableOpacity style={styles.buttonSection}
            onPress={goBack}
        >
            <View style={styles.previousIcon}>
                <FontAwesomeIcon icon={faArrowLeft} size={32} color={"white"} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonSection: {
        width: 45,
        height: 45,
        backgroundColor: '#EE8732',
        borderRadius: 5,
    },
    previousIcon: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 34,
        height: 34,
        margin: 7,
    },
})
export default PreviousButton