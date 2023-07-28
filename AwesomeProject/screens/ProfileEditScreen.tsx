import React, { FC, FunctionComponent, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import { Divider, Actionsheet, useDisclose, Center, Button, Box, ScrollView } from "native-base";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabNavigatorParamList } from "../navigators/HomeBottomTab";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RegularButton from "../components/RegularButton";
import { Button as RneuiButton } from '@rneui/themed'
import { logout } from "../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import ImagePicker, { MediaType, PhotoQuality, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../navigators/AppStack";
import { colors } from "../components/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { BACKEND_URL } from '@env';
// const BACKEND_URL = `http://192.168.59.206:3000`;

export const ProfileEditScreen: FC<StackScreenProps<StackNavigatorParamList, "profileEditor">> =
    ({ route, navigation }) => {

        const [imageResult, setImageResult] = useState<{ image: string, imageUri: string, data: object } | undefined>(undefined)

        const openImagePicker = () => {
            const options = {
                mediaType: 'photo' as MediaType,
                maxWidth: 2300,
                maxHeight: 2300,
                quality: 1 as PhotoQuality,
            };

            const ImagePicker = require('react-native-image-picker')
            ImagePicker.launchImageLibrary(options, (response: { didCancel: any; errorMessage: any; assets: number | any; }) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets) {
                    console.log('response', typeof response.assets[0].fileName)
                    console.log('response', response)
                    let image: string = response.assets[0].fileName
                    let imageUri: string = response.assets[0].uri

                    setImageResult({
                        image,
                        imageUri,
                        data: {
                            uri: response.assets[0].uri,
                            type: response.assets[0].type,
                            name: response.assets[0].fileName,
                        }
                    });
                }
            });
        };

        let thumbnailImage: string = `${BACKEND_URL}/public/travelPlan_thumbnalis/thumbnailFile-1679817189666-608433318.jpeg`;

        if (imageResult) {
            thumbnailImage = imageResult.imageUri
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={{
                    position: 'absolute'
                }}>
                    <Image
                        style={styles.bgImage}
                        source={require('../assets/bgs/bg.png')}
                    />
                </View>

                <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                    <View style={styles.backButtonRow}>
                        <View>
                            <RneuiButton
                                // color={colors.primary}
                                onPress={() => navigation.goBack()}
                                type="clear"
                            ><FontAwesomeIcon icon={faAngleLeft} color={colors.lightGrey} size={30} />
                            </RneuiButton>
                        </View>
                    </View>
                </View>

                <View style={styles.imageContainer}>
                    <View style={styles.imageRow}>

                        <TouchableOpacity onPress={openImagePicker}>
                            <Image
                                source={{
                                    uri: thumbnailImage
                                }}
                                style={styles.image}
                            />
                            {/* <Image
                            source={{ uri: 'https://picsum.photos/id/236/200/300' }}
                            style={styles.image}
                        /> */}
                        </TouchableOpacity>
                    </View>

                    <View>

                    </View>

                </View>
            </SafeAreaView>
        )
    }

const styles = StyleSheet.create({
    imageContainer: {
        // alignItems: 'center',
        marginTop: 20,
    },
    backButtonRow: {
        marginTop: 20,
        flexDirection: "row",
        height: 40
    },
    backButton: {
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 10,
    },
    imageRow: {
        alignItems: 'center',
        // position: 'absolute',
        // left: 130
    },
    titleRow: {
        alignItems: "center",
    },
    metricRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        margin: 20
    },
    buttonRow: {
        marginTop: 10,
        marginBottom: 40,
        margin: 30,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        width: 140,
        borderRadius: 10,
    },
    image: {
        width: 130,
        height: 130,
        borderWidth: 2, //image solid
        borderColor: colors.green,
        borderRadius: 100,
        marginBottom: 20,
        marginTop: '-8%',
    },
    userTitle: {
        fontSize: 25,
        // fontWeight: 'bold',
        // marginBottom: 10,
    },
    userSubtitle: {
        color: colors.lightGrey
        // marginBottom: 10,
    },
    title: {
        fontSize: 25,
        // fontWeight: 'bold',
        // marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: colors.lightGrey,
    },
    email: {
        fontSize: 18,
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
    },
    planText: {
        fontSize: 20
    },
    tabView: {
        // margin: 15,
        marginTop: -30
    },
    bgImage: {
        ...StyleSheet.absoluteFillObject,
        width: 500,
        height: 500,
    }
})