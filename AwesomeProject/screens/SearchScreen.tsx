import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../navigators/AppStack";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAppDispatch, useAppSelector } from "../redux/store";
import TravelPlanCard from "../components/TravelPlanCard"
import SearchInputCom from '../components/SearchInputCom'
import { findPlansCreatedByUserThunk } from '../redux/travelPlan/thunk/findPlansCreatedByUserThunk';
import { getSelfUserThunk } from '../redux/user/thunk/getSelfUserThunk';
import { UserResponse } from '../redux/user/helper/userResponse';

export const SearchScreen: FC<StackScreenProps<StackNavigatorParamList, "searchScreen">> =
    ({ route, navigation }) => {
        // console.log('search navigation', navigation)
        // console.log(route.params.status)
        console.log(route)

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

        const [refresh, setRefresh] = useState(false)
        const [searchData, setSearchData] = useState([])
        const [status, setStatus] = useState('')
        //  setStatus(route.params.status)
        // searchScreen
        console.log(status)

        return (
            <SafeAreaView style={{ flex: 1, position: 'relative' }}>
                <SearchInputCom navigation={navigation} setState={setSearchData} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.travelPlanCardContainer}>
                        <TravelPlanCard navigation={navigation} refresh={refresh} status={status} userId={userId} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

const styles = StyleSheet.create({
    previousButtonContainer: {
        flex: 0.3,
        marginTop: 20
    },
    travelPlanCardContainer: {
        flex: 0.7,
    },
    createButtonContainer: {
        position: 'absolute',
        right: 25,
        bottom: 25,
    },

})