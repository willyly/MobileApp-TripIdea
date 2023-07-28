import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import RNLocalize from "react-native-localize";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { StackNavigatorParamList } from "../navigators/AppStack";
import SearchInputCom from '../components/SearchInputCom'
import CreateButton from '../components/CreateButton'
import TravelPlanDetailCard from '../components/TravelPlanDetailCard';
import LikeButton from '../components/LikeButton';
import apis from '../services/apis';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getUsersThunk } from '../redux/user/thunk/getUsersThunk';
import { UserResponse } from '../redux/user/helper/userResponse';
import { setTargetUser } from '../redux/user/userSlice';

const PlanCover = ({ plans, userId, planAuthorId, navigation, likeCount, setLikeCount }: any) => {
    // console.log('planCover', plans)
    // const getSelfUserResult = useAppSelector<UserResponse | undefined>((state) => state.user.getSelfUserResult);
    // const getUserResult = useAppSelector<UserResponse | undefined>((state) => state.user.getUserResult);
    // const getUsersResult = useAppSelector<UserResponse | undefined>((state) => state.user.getUsersResult);

    // *******************************
    useEffect(() => {
        // console.log(plans[0].authorId);
        // console.log(plans[0].name);
        // console.log(plans[0].name);
        console.log('plans', plans);
        // console.log({ userId });
    }, [])
    // *******************************

    const dispatch = useAppDispatch();

    const havePlans = () => {
        try {
            if (plans.length > 0) {
                const thumbnailImg = plans[0].thumbnail.split("-");

                const checkLanguage = (str: any) => {
                    const languageCode = RNLocalize.getLocales()[0]?.languageCode;

                    if (/^[\u4e00-\u9fa5]+$/.test(str)) {
                        return 'Chinese'
                    } else {
                        for (let alphabet of str) {
                            if (/^[\u4e00-\u9fa5]+$/.test(alphabet)) {
                                return 'Mixed';
                            }
                        }
                        return 'English';
                    }
                }
                const checkTitle = checkLanguage(plans[0].name)

                const titleResult = () => {
                    switch (true) {
                        case ((checkTitle == 'English' && plans[0].name.length >= 16)):
                            let planTitleEng = `${plans[0].name.substring(0, 15)} ...`;
                            return <Text style={styles.planTitleEng}>{planTitleEng}</Text>
                            break;
                        default:
                            return <Text style={styles.planTitleCh}>{plans[0].name}</Text>
                    }
                }

                const likeButtonStyle = () => {
                    if (userId == planAuthorId) {
                        return (
                            <View style={styles.likeSectionIsAuthor}>
                                <Text style={styles.likeCountIsAuthor}>
                                    <FontAwesomeIcon icon={fasHeart} color={"#EE8732"} />
                                    {likeCount}
                                </Text>

                                <LikeButton travelPlanId={plans[0].id}
                                    navigation={navigation}
                                    likeCount={likeCount}
                                    setLikeCount={setLikeCount}
                                    userId={userId} />
                            </View>
                        )
                    } else {
                        return (
                            <View style={styles.likeSectionNotAuthor}>
                                <Text style={styles.likeCountNotAuthor}>
                                    <FontAwesomeIcon icon={fasHeart} color={"#EE8732"} />
                                    {likeCount}
                                </Text>

                                <LikeButton travelPlanId={plans[0].id}
                                    navigation={navigation}
                                    likeCount={likeCount}
                                    setLikeCount={setLikeCount}
                                    userId={userId} />
                            </View>
                        )
                    }
                }

                return (
                    <View>
                        <Image
                            source={{
                                uri: apis.travelPlans.getPlanThumbnail(thumbnailImg),
                            }}
                            style={styles.planImage}
                        />

                        <View>{likeButtonStyle()}</View>

                        <Text numberOfLines={1} style={styles.planTitleContainer}>{titleResult()}</Text>

                        <View style={styles.authorSection}>
                            <TouchableOpacity onPress={() => {
                                dispatch(setTargetUser(
                                    // userId
                                    plans[0].authorId
                                ))
                                // console.log('getSelfUserResult:', userId);
                                navigation.navigate("othersUserProfile", { authorId: plans[0].authorId })
                            }}>
                                {/* , { travelPlanId: travelPlan.id } */}
                                <Image
                                    source={{
                                        uri: apis.travelPlans.getPlanThumbnail(thumbnailImg),
                                    }}
                                    style={styles.authorIcon}
                                />
                            </TouchableOpacity>
                            <Text style={styles.authorName}>作者: {plans[0].userNickname}</Text>
                        </View>
                    </View >
                )
            } else {
                return (
                    <View>
                        <Text style={styles.nullResultTab}>查無此結果</Text>
                    </View>
                )
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.planContainer}>
            <View>{havePlans()}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    planContainer: {
        position: 'relative',
    },
    planImage: {
        width: 500,
        height: 270,
    },
    planTitleContainer: {
        position: 'absolute',
        width: 430,
        bottom: 5,
        paddingLeft: 10,
        fontSize: 40,
        fontWeight: 'bold',
        color: "white",
        overflow: 'hidden',
    },
    planTitleCh: {
        letterSpacing: 7,
    },
    planTitleEng: {
        letterSpacing: 2,
    },
    likeSectionIsAuthor: {
        position: 'absolute',
        bottom: 5,
        right: 8,
        width: 80,
        height: 70,
    },
    likeCountIsAuthor: {
        // borderWidth: 1,
        // borderColor: 'blue',
        position: 'absolute',
        top: -20,
        width: 80,
        height: 20,
        paddingLeft: 8,
        textAlign: 'center',
        color: "white",
        letterSpacing: 13,
    },
    likeSectionNotAuthor: {
        // borderWidth: 1,
        // borderColor: 'blue',
        position: 'absolute',
        bottom: 180,
        right: 8,
        width: 80,
        height: 85,
    },
    likeCountNotAuthor: {
        // borderWidth: 1,
        // borderColor: 'blue',
        position: 'absolute',
        bottom: 0,
        width: 80,
        height: 20,
        paddingLeft: 9,
        textAlign: 'center',
        color: "white",
        letterSpacing: 13,
    },
    authorSection: {
        position: 'absolute',
        bottom: 50,
        width: 400,
        height: 60,
        margin: 18,
        flexDirection: 'row',
    },
    authorName: {
        height: 20,
        position: 'absolute',
        bottom: 7,
        left: 70,
        color: "white",
        letterSpacing: 3,
    },
    authorIcon: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: '#EE8732',
        borderRadius: 100,
    },
    nullResultTab: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: "#EE8732",
        borderColor: 'transparent',
        borderRadius: 5,
        paddingVertical: 10,
        width: 440,
        alignSelf: 'center',
    }
})

export default PlanCover;