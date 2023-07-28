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
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { BACKEND_URL } from '@env';


//components
import { Container } from "../components/Shared";
import { colors } from "../components/Colors"
// import { UserComponent } from "../components/UserComponent";

//redux Thunk
import { getUsersThunk } from "../redux/user/thunk/getUsersThunk";
import { useSelector } from 'react-redux'
import { getSelfUserThunk } from "../redux/user/thunk/getSelfUserThunk";
import { UserResponse } from '../redux/user/helper/userResponse'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faAngleLeft, faBars, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getUserThunk } from "../redux/user/thunk/getUserThunk";
import { userFollowThunk } from "../redux/user/thunk/userFollowThunk";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { findPlansCreatedByUserThunk } from "../redux/travelPlan/thunk/findPlansCreatedByUserThunk";
import { TravelPlan } from "../redux/travelPlan/helper/TravelPlanResponse";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../navigators/AppStack";
import { TabBar, TabView } from "react-native-tab-view";


export const OthersUserScreen: FC<StackScreenProps<StackNavigatorParamList, "othersUserProfile">> =
    ({ route, navigation }) => {

        // useEffect(() => {
        //     console.log(route.params.authorId);
        // },
        //     [])

        const dimension = useWindowDimensions();

        const access_token = useAppSelector<string | undefined>((state) => state.user.access_token);
        const getUsersResult = useAppSelector<any | undefined>((state) => state.user.getUsersResult);
        const getSelfUserResult = useAppSelector<UserResponse | undefined>((state) => state.user.getSelfUserResult);
        const getUserResult = useAppSelector<UserResponse | undefined>((state) => state.user.getUserResult);
        const targetUserId = useAppSelector<number | undefined>((state) => state.user.targetUserId);
        const travelPlans = useAppSelector<Array<TravelPlan>>((state) => state.travelPlan.userSelfCreatedPlans);

        const getPlanElement = getUserResult?.createPlans
        console.log('getPlanElement', getPlanElement);

        // console.log('getUserResult', getUserResult?.createPlans);

        // console.log('travelPlans', travelPlans);

        const { isOpen, onOpen, onClose } = useDisclose();

        const dispatch = useAppDispatch();

        const [imageResult, setImageResult] = useState<{ image: string, imageUri: string, data: object } | undefined>(undefined)
        const [isSelfUser, setIsSelfUser] = useState<boolean>(false);

        const layout = useWindowDimensions();
        const [index, setIndex] = useState(0);
        const [routes] = useState([
            { key: 'plan', title: '行程' },
        ]);

        const renderScene = ({ route }: any) => {
            switch (route.key) {
                case 'plan':
                    return (
                        <View style={{ flex: 1 }}>
                            <ScrollView >

                                {
                                    getPlanElement?.map((plan) => {
                                        console.log('plan', plan);
                                        return (
                                            <View style={styles.iosContainer}>
                                                <TouchableOpacity
                                                    style={styles.iosTouchableStyle}
                                                    onPress={() => {
                                                        navigation.navigate("planDetail" as any, { travelPlanId: plan.id })
                                                    }}>
                                                    <View style={styles.planContainer}>
                                                        <Image
                                                            source={{
                                                                uri: `${BACKEND_URL}/${plan.thumbnail}`,
                                                            }}
                                                            style={styles.planImage}
                                                        />

                                                        <View style={styles.authorLikeSection}>
                                                            <Text style={styles.likeCount}>
                                                                <FontAwesomeIcon icon={fasHeart} color={"#EE8732"} />
                                                            </Text>
                                                        </View>

                                                        <Text numberOfLines={1} style={styles.planTitleContainer}>{plan.name}</Text>

                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    )
            }
        }

        // Tab Bar ---------------------
        const renderTabBar = (props: any) => (
            <TabBar {...props}

                labelStyle={{ letterSpacing: 5 }}
                // indicatorStyle={{ height: 0 }}  // hide order line****
                indicatorStyle={{ backgroundColor: `${colors.secondOrg}`, height: 5, borderRadius: 3, width: '85%', left: 28 }}
                style={{
                    backgroundColor: "#full-color-hex-code",  // hide default Tab Bar Color****
                }}
                activeColor={"black"}
                // activeColor={`${colors.primary}`}
                inactiveColor={`${colors.lightGrey}`}
            />
        )

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
        // let thumbnailImage: string = `http://192.168.59.206:3000/public/travelPlan_thumbnalis/thumbnailFile-1679817189666-608433318.jpeg`;

        if (imageResult) {
            thumbnailImage = imageResult.imageUri
        }

        useEffect(() => {
            console.log('targetUserId: ', targetUserId)
            // 如在navigation.navigate轉頁至此Profile Screen時指明user id，從server找出該user
            if (targetUserId) {
                dispatch(getUserThunk({ userId: targetUserId }));
            }
        }, [targetUserId]);

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
                        <RneuiButton
                            // color={colors.primary}
                            type="clear"
                            onPress={() => navigation.goBack()}
                            buttonStyle={styles.backButton}
                        ><FontAwesomeIcon icon={faAngleLeft} color={colors.lightGrey} size={20} /></RneuiButton>
                    </View>
                </View>

                <View style={styles.imageContainer}>
                    {/* 1. image row */}
                    <View style={styles.imageRow}>

                        <View>
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
                        </View>
                    </View>
                </View>

                {/* 2. title row - name, self intro */}
                <View style={styles.titleRow}>
                    <Text style={styles.userTitle}>
                        {getUserResult?.nickname}
                    </Text>

                    {/* userSubtitle */}
                    <Text style={styles.userSubtitle}>
                        {getUserResult?.selfIntroduction}
                    </Text>
                </View>

                {/* 3. metric row - followers, following users, created plans */}
                <View style={styles.metricRow}>

                    {/* 3a. followers */}
                    <View style={{ width: dimension.width / 3, ...styles.titleRow }}>

                        <Text style={styles.title}>
                            {getUserResult?.createPlans.length}
                        </Text>

                        <Text style={styles.subtitle}>
                            行程
                        </Text>
                    </View>

                    <Divider style={{ width: 1, height: '90%' }} />

                    {/* 3b. following users */}
                    <View style={{ width: dimension.width / 3, ...styles.titleRow }}>

                        <Text style={styles.title}>
                            {getUserResult?.followers.length}
                        </Text>

                        <Text style={styles.subtitle}>
                            追蹤中
                        </Text>
                    </View>

                    <Divider style={{ width: 1, height: '90%' }} />

                    {/* 3c. created plans */}
                    <View style={{ width: dimension.width / 3, ...styles.titleRow }}>

                        <Text style={styles.title}>
                            {getUserResult?.followings.length}
                        </Text>

                        <Text style={styles.subtitle}>
                            追蹤人數
                        </Text>
                    </View>
                </View>

                {/* 4. follow button row */}
                <View style={styles.buttonRow}>
                    <RneuiButton
                        color={colors.primary}
                        onPress={() => {
                            if (targetUserId) {
                                dispatch(userFollowThunk(targetUserId))
                            }
                        }}
                        buttonStyle={styles.button}>
                        <Text style={{
                            color: "white"
                        }}>追蹤</Text>
                        <FontAwesomeIcon icon={faAdd} color={colors.white} size={15} />
                    </RneuiButton>
                </View>

                <TabView style={styles.tabView}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />

            </SafeAreaView >
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
    },
    planCard: {

    },

    // mini travel plan card
    iosContainer: {
        flex: 1,
        justifyContent: 'space-between',
        // marginBottom: 10,
        marginLeft: 17,
        marginRight: 17,
        marginTop: 10
    },
    iosTouchableStyle: {
        elevation: 12,
        shadowColor: "#000",
        paddingBottom: 10,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
    },
    planContainer: {
        position: 'relative',
        // width: '100%',
        // height: 200,
        // backgroundColor: 'white',
        // borderRadius: 20,
    },
    planImage: {
        // position: 'absolute',
        // width: '100%',
        // width: 440,
        height: 120,
        borderRadius: 15,
    },
    planTitleContainer: {
        position: 'absolute',
        // width: 430,
        bottom: 5,
        paddingLeft: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
        overflow: 'hidden',
    },
    authorLikeSection: {
        position: 'absolute',
        bottom: 30,
        width: 400,
        margin: 10,
        flexDirection: 'row',
    },
    likeCount: {
        color: "white",
        letterSpacing: 3,
    },
    authorName: {
        paddingRight: 10,
        color: "white",
        letterSpacing: 3,
    },
});

