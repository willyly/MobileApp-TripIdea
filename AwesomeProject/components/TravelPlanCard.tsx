import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import LikeButton from "../components/LikeButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { z } from "zod";
import RNLocalize from "react-native-localize";

import apis from '../services/apis';
import { useAppSelector } from "../redux/store";
import { UserResponse } from "../redux/user/helper/userResponse";

const travelPlanSchema = z.object({
    id: z.number(),
    authorId: z.number(),
    name: z.string(),
    referencePlanId: z.number(),
    startDay: z.string(),
    endDay: z.string(),
    thumbnail: z.string(),
    thumbnailImg: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

type TravelPlan = z.infer<typeof travelPlanSchema>;

const Plan = ({ travelPlan, navigation, status, userId, onUpdated }: any) => {
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

    const thumbnailImg = travelPlan.thumbnail.split("-");
    const [likeCount, setLikeCount] = useState(travelPlan.likes.length);
    const [visible, setVisible] = useState(true)
    const checkTitle = checkLanguage(travelPlan.name)

    const titleResult = () => {
        switch (true) {
            case ((checkTitle == 'English' && travelPlan.name.length >= 16)):
                let planTitleEng = `${travelPlan.name.substring(0, 12)} ...`;
                return <Text style={styles.planTitleEng}>{planTitleEng}</Text>
                break;
            default:
                return <Text style={styles.planTitleCh}>{travelPlan.name}</Text>
        }
    }

    const navigateToDetail = () => {
        navigation.navigate("planDetail", { onUpdated, travelPlanId: travelPlan.id });
    };

    const cardContainer = () => {
        return (
            <View style={styles.planContainer}>
                <Image
                    source={{
                        uri: apis.travelPlans.getPlanThumbnail(thumbnailImg),
                    }}
                    style={styles.planImage}
                />

                <View>
                    <LikeButton travelPlanId={travelPlan.id}
                        navigation={navigation}
                        likeCount={likeCount}
                        setLikeCount={setLikeCount}
                        setVisible={setVisible}
                        userId={userId} />

                    <Text style={styles.likeCount}>
                        <FontAwesomeIcon icon={fasHeart} color={"#EE8732"} />
                        {likeCount}
                    </Text>
                </View>

                <Text numberOfLines={1} style={styles.planTitleContainer}>{titleResult()}</Text>

                <View style={styles.authorSection}>
                    <Text style={styles.authorName}>作者: {travelPlan.userNickname}</Text>
                </View>
            </View>
        )
    }

    if (status == 'hit') {
        // console.log('travelPlan', travelPlan.id)
        return (
            // <View style={styles.iosContainer}>
            <View style={styles.adContainer}>
                <TouchableOpacity style={styles.adTouchableStyle} onPress={navigateToDetail}>
                    {visible && <View>
                        {cardContainer()}
                    </View>}
                </TouchableOpacity>
            </View>
        );
    } else if (status == 'share') {
        // <View style={styles.iosContainer}>
        //     <TouchableOpacity style={styles.iosTouchableStyle} onPress={navigateToDetail}>
        <View style={styles.adContainer}>
            <TouchableOpacity style={styles.adTouchableStyle} onPress={navigateToDetail}>
                <View>
                    {cardContainer()}
                </View>
            </TouchableOpacity>
        </View>
    } else if (status == 'searchScreen') {
        // <View style={styles.iosContainer}>
        //     <TouchableOpacity style={styles.iosTouchableStyle} onPress={navigateToDetail}>
        <View style={styles.adContainer}>
            <TouchableOpacity style={styles.adTouchableStyle} onPress={navigateToDetail}>
                <View>
                    {cardContainer()}
                </View>
            </TouchableOpacity>
        </View>
    }
    return (
        // <View style={styles.iosContainer}>
        //     <TouchableOpacity style={styles.iosTouchableStyle} onPress={navigateToDetail}>
        <View style={styles.adContainer}>
            <TouchableOpacity style={styles.adTouchableStyle} onPress={navigateToDetail}>
                <View>
                    {cardContainer()}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Cards = ({ plans, navigation, status, userId, onUpdated }: any) => {
    // console.log('card plan', plans)
    return (
        <View>
            {
                Array.isArray(plans) ? plans.map((plan, i) => (
                    <Plan key={i} travelPlan={plan} navigation={navigation} status={status} userId={userId} onUpdated={onUpdated} />
                )) : <Text>Loading Card</Text>
            }
        </View>
    );
};

const TravelPlanCard = ({ navigation, status, userId, searchRequest, onUpdated }: any) => {
    const [plans, setPlans] = useState([]);
    const [version, setVersion] = useState(0);

    useEffect(() => {
        (async () => {
            switch (status) {
                case "hit":
                    const data = await apis.travelPlans.getHitPlans(searchRequest);
                    setPlans(data);
                    break;
                case "share":
                    setPlans(await apis.travelPlans.getSharedPlans(userId, searchRequest));
                    break;
                case "myself":
                    setPlans(await apis.travelPlans.getMyPlans(userId, searchRequest));
                    break;
            }
        })();
    }, [searchRequest, version]);

    const haveResult = () => {
        // console.log('plans', plans)
        try {
            if (plans.length == 0) {
                return (
                    <View>
                        <Text style={styles.nullResultTab}>查無此結果</Text>
                    </View>
                )
            } else {
                return (
                    <Cards plans={plans}
                        status={status}
                        userId={userId}
                        navigation={navigation}
                        onUpdated={onUpdated} />
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View>{haveResult()}</View>
    );
}

const styles = StyleSheet.create({
    adContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 5,
        margin: 10,
    },
    adTouchableStyle: {
        elevation: 12,
        shadowColor: "#000",
        width: 440,
        height: 200,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
    },
    iosContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 17,
        marginRight: 17
        // padding: 7,
        // margin: 5,
        // margin: 10,
    },
    iosTouchableStyle: {
        elevation: 12,
        shadowColor: "#000",
        height: 200,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
    },
    planContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    planImage: {
        position: 'absolute',
        // width: '100%',
        width: 440,
        height: 200,
        borderRadius: 20,
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
    likeCount: {
        // borderWidth: 1,
        // borderColor: 'red',
        color: "white",
        letterSpacing: 3,
        position: 'absolute',
        right: 21,
        top: 65,
    },
    authorSection: {
        position: 'absolute',
        bottom: 50,
        width: 400,
        margin: 10,
        flexDirection: 'row',
    },
    authorName: {
        paddingRight: 15,
        color: "white",
        letterSpacing: 3,
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
    },

})

export default TravelPlanCard