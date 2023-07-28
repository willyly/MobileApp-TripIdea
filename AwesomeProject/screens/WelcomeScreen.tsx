
import React, { FC, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../navigators/AppStack";

//components
import { colors } from "../components/Colors"
import { Container } from "../components/Shared";
import styled from "styled-components/native";
import RegularButton from "../components/RegularButton";
import BackgroundVideo from "../components/Video";
import { Image, StyleSheet, View } from "react-native";
import { BottomSheet } from "@rneui/themed/dist/BottomSheet";
import { Center, Heading, Text } from "native-base";
import { RegularText } from "../components/Texts/RegularText";
import { SmallText } from "../components/Texts/SmallText";

export interface WelcomeScreenProps {

}

export const WelcomeScreen: FC<StackScreenProps<StackNavigatorParamList, "welcome">> =
    ({ route, navigation }) => {
        // route.params are props
        // console.log(route.params)
        return (

            // Backgroud-Video
            <SafeAreaView style={{ flex: 1 }}>
                <WelcomeContainer style={styles.position}>
                    <TopSection>
                        <BackgroundVideo WelcomeVideo={""} />
                    </TopSection>
                </WelcomeContainer >

                {/* Logo */}
                <View style={styles.imageRow}>
                    <View style={styles.iosAbsolute}>
                        {/* <View style={styles.androidAbsolute}> */}
                        <Image
                            source={require('../assets/logo/logo.png')}
                            style={styles.image}
                        />
                    </View>
                </View>

                <View>
                    <RegularText textStyle={{ position: 'absolute', bottom: 210, left: 45, width: '55%', fontWeight: 'bold' }}>
                        Best way to find your {" "}
                        <RegularText textStyle={{ color: `${colors.primary}` }}>Trip Plan</RegularText>
                    </RegularText>

                    <SmallText textStyle={{ position: 'absolute', bottom: 165, left: 45, width: '55%' }}>
                        Through others user travel plan to get idea and save if user like it.
                    </SmallText>
                </View>

                {/* Start Buttom */}
                {/* ios */}
                {/* <ButtonSection > */}
                {/* ad */}
                <ButtonSection style={{ marginBottom: -50 }}>
                    <RegularButton
                        btnText={'Get Started'}
                        textStyles={{
                            fontWeight: 'bold'
                        }}
                        onPress={() => navigation.navigate("login", {})} />
                    {/* <RegularButton btnText={'Google'} onPress={() => { }} />
                    <RegularButton btnText={'Sign up'} onPress={() => { }} /> */}
                </ButtonSection>
            </SafeAreaView >
        )
    }


const WelcomeContainer = styled(Container)`
/* background-color: ${colors.primary}; */
    justify-content: space-between;
`

const TopSection = styled.View`
    width: 100%;
    flex:1;
`

const ButtonSection = styled.View`
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: -20px
`

const styles = StyleSheet.create({
    position: {
        position: 'relative'
    },
    iosAbsolute: {
        position: 'absolute',
        bottom: 450
    },
    androidAbsolute: {
        position: 'absolute',
        bottom: 550,
    },
    imageRow: {
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 250,
    },
    text: {
        position: 'absolute',
    }
});

