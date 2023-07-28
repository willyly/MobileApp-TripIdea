import React, { FC, useState, useEffect } from 'react';
import { ScrollView } from "native-base";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../navigators/AppStack";
import TravelPlanDetailForm from '../components/TravelPlanDetailFrom';
import { findPlansCreatedByUserThunk } from '../redux/travelPlan/thunk/findPlansCreatedByUserThunk';
import { getSelfUserThunk } from '../redux/user/thunk/getSelfUserThunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { UserResponse } from '../redux/user/helper/userResponse';

export const CreateDetailScreen: FC<StackScreenProps<StackNavigatorParamList, "createDetail">> =
    ({ route, navigation }) => {
        const getSelfUserResult = useAppSelector<UserResponse | undefined>((state) => state.user.getSelfUserResult);
        const dispatch = useAppDispatch();

        // console.log('getSelfUserResultId: ', getSelfUserResult?.id)
        // console.log('id', userId);
        // const userId = 5;
        const userId = getSelfUserResult?.id

        useEffect(() => {
            // console.log('getSelfUserResult: ', getSelfUserResult)
            dispatch(getSelfUserThunk());
            dispatch(findPlansCreatedByUserThunk());
        }, []);
        // console.log({ route })

        const travelPlanId = (route.params ?? {})['travelPlanId'];
        const dayPlanId = (route.params ?? {})['dayPlanId'];
        const whichDay = (route.params ?? {})['planDay'];
        const onUpdated = (route.params ?? {})['onUpdated'];
        const originLocation = (route.params ?? {})['originLocation'];

        return (
            <SafeAreaView style={{ flex: 1, position: 'relative' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.form}>
                        <TravelPlanDetailForm
                            userId={userId}
                            travelPlanId={travelPlanId}
                            dayPlanId={dayPlanId}
                            whichDay={whichDay}
                            navigation={navigation}
                            onUpdated={onUpdated}
                            originLocation={originLocation}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

const styles = StyleSheet.create({
    form: {
        alignSelf: 'center',
    },
})