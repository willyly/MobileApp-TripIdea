import React, { FunctionComponent, useState } from "react";
import styled from "styled-components/native";

import {
    GestureResponderEvent,
    StyleProp,
    TextStyle,
    ViewStyle,
    View,
    Alert,
    Text,
    StyleSheet,
} from "react-native";

import { Stack, Modal, FormControl, Input } from "native-base";
import { Button } from '@rneui/themed';

//components
import { colors } from "./Colors"

//types
interface ButtonProps {
    btnStyles?: StyleProp<ViewStyle>;
    onPress: ((event: any) => void) | undefined;
    textStyles?: StyleProp<TextStyle>;
    btnText?: string;
    widthOption?: 'oneThird' | 'half' | 'full';
}

const ButtonView = styled.TouchableOpacity`
    margin: 10px auto;
`

const RegularButton: FunctionComponent<ButtonProps> = (props) => {

    return (
        <View>
            <ButtonView>
                <Button
                    onPress={props.onPress}
                    title={props.btnText ?? ""}
                    buttonStyle={{
                        backgroundColor: "#EE8732",
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 15,
                        paddingVertical: 10,
                        width: 300,
                    }}
                />
            </ButtonView >
        </View >
    )
};

export default RegularButton
