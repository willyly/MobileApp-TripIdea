import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from "native-base";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../navigators/AppStack";
import TravelPlanForm from '../components/TravelPlanForm';
import PatchPlanForm from '../components/PeatchPlanForm';
import { getSelfUserThunk } from '../redux/user/thunk/getSelfUserThunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { UserResponse } from '../redux/user/helper/userResponse';
import { findPlansCreatedByUserThunk } from '../redux/travelPlan/thunk/findPlansCreatedByUserThunk';

export const CreatePlanScreen: FC<StackScreenProps<StackNavigatorParamList, "createPlan">> =
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

        const travelPlanId = (route.params ?? {})['travelPlanId'];
        console.log('planForm route', route)
        // console.log('planForm travelPlanId', travelPlanId)
        const action = () => {
            if (!route.params) {
                return <TravelPlanForm navigation={navigation} />
                // return <TravelPlanForm userId={userId} navigation={navigation} />
            } else {
                return <PatchPlanForm
                    // return <PatchPlanForm userId={userId}
                    navigation={navigation}
                    travelPlanId={travelPlanId}
                    onUpdated={route.params["onUpdated"]} />
            }
        }

        return (
            <SafeAreaView style={{ flex: 1, position: 'relative' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.form}>
                        {action()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

const styles = StyleSheet.create({
    form: {
        alignSelf: 'center',
    },
})