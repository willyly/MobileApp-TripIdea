import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHeart as farfaHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from "zod";

// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;


library.add(fasHeart, farfaHeart)

const travelPlanLikeSchema = z.object({
    id: z.number(),
    likeUserId: z.number(),
    travelPlanId: z.number(),
    createdAt: z.string(),
    updatedAt: z.date(),
})

type TravelPlanLike = z.infer<typeof travelPlanLikeSchema>;

const LikeButton = ({ travelPlanId, likeCount, setLikeCount, userId, setVisible }: any) => {
    const [myLike, setMyLike] = useState<TravelPlanLike | null>(null);

    useEffect(() => {
        (async () => {
            let access_token = await AsyncStorage.getItem('access_token');
            const res = await fetch(`${BACKEND_URL}/plan-likes/${travelPlanId}`, {

                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });

            if (res.status != 200) {
                return setMyLike(null);
            }

            const data = await res.json();
            const parsedData = Array.isArray(data) ? data : [data];

            const myLike = parsedData
                .filter(({ likeUserId }: TravelPlanLike) => likeUserId == userId)[0];

            setMyLike(myLike);
        })();
    }, []);

    const handleLike = async () => {
        try {
            let access_token = await AsyncStorage.getItem('access_token');
            if (myLike?.id) {

                setLikeCount(likeCount - 1);
                // setVisible(false)
                await axios.delete(`${BACKEND_URL}/plan-likes/${myLike?.id}`, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    }
                });
                console.log('unlike successful')

                setMyLike(null);
            } else {
                setLikeCount(likeCount + 1);

                const res = await axios.post(`${BACKEND_URL}/plan-likes`, {
                    "likeUserId": userId,
                    "travelPlanId": travelPlanId,
                }, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    }
                }
                );

                console.log('like successful')

                if (res.status == 201) {
                    setMyLike(res.data);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.likeIconSection}>
            <TouchableOpacity onPress={handleLike}>
                <Text style={styles.likeIcon}>
                    {
                        myLike?.id ?
                            <FontAwesomeIcon icon={fasHeart} color={"#EE8732"} size={32} /> :
                            <FontAwesomeIcon icon={farfaHeart} color={"#EE8732"} size={32} />
                    }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    likeIconSection: {
        position: 'absolute',
        top: 10,
        right: 13,
        width: 50,
        height: 50,
        backgroundColor: "white",
        borderRadius: 40,
    },
    likeIcon: {
        position: 'absolute',
        top: 10,
        right: 9,
    },
})

export default LikeButton