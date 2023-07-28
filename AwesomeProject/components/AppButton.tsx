import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from '@rneui/themed';

const AppButton = ({ text, onPress }: any) => {
    return (
        <View style={{ alignSelf: 'center' }}>
            <Button
                title={text}
                onPress={onPress}
                buttonStyle={{
                    backgroundColor: "#EE8732",
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 5,
                    paddingVertical: 10,
                    width: 350,
                }}>
            </Button>
        </View>
    )
}

export default AppButton