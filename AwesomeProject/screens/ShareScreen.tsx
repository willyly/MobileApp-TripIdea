import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

//components
import styled from "styled-components/native";
import { Container } from "../components/Shared";
import { colors } from "../components/Colors"
import { TabNavigatorParamList } from "../navigators/HomeBottomTab";
import TravelPlanCard from "../components/TravelPlanCard"
import CreateButton from '../components/CreateButton'
import { Button as RneuiButton } from "@rneui/themed";
import { setTargetUser } from "../redux/user/userSlice";
import SearchInputCom from '../components/SearchInputCom'
import { useAppDispatch, useAppSelector } from "../redux/store";
import { UserResponse } from "../redux/user/helper/userResponse";
import { getSelfUserThunk } from "../redux/user/thunk/getSelfUserThunk";
import { getUserThunk } from "../redux/user/thunk/getUserThunk";
import { findPlansCreatedByUserThunk } from "../redux/travelPlan/thunk/findPlansCreatedByUserThunk";


export const ShareScreen: FC<
    BottomTabScreenProps<TabNavigatorParamList, "與我共用">
> = ({ route, navigation }) => {

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

    const [tabIndex, setTabIndex] = useState(0);

    const tabs = [
        // { key: 'tab1', title: '我的行程' },
        // { key: 'tab2', title: '達人推薦' },
        { key: 'tab3', title: '與我共用' },
    ];

    const EasyTab = ({ status }: any) => {
        // console.log('status', status)
        return (
            <Tab status={status}
                navigation={navigation}
                userId={userId} />
        );
    };

    const renderScene = SceneMap({
        // tab1: () => <EasyTab status="myself" />,
        // tab2: () => <EasyTab status="hit" />,
        tab3: () => <EasyTab status="share" />,
    });

    const renderTabBar = (props: any) => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'white', height: 5, borderRadius: 3 }}
                tabStyle={{ height: 65 }}
                labelStyle={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 2 }}
                style={{ backgroundColor: '#EE8732' }}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <TabView
                style={{ flex: 1 }}
                navigationState={{ index: tabIndex, routes: tabs }}
                renderScene={renderScene}
                onIndexChange={setTabIndex}
                renderTabBar={renderTabBar}
            />
            <View style={styles.createButtonContainer}>
                <CreateButton navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

const Tab = ({ navigation, status, userId }: any) => {
    const [version, setVersion] = useState(0);
    const [searchRequest, setSearchRequest] = useState('');

    const refresh = () => {
        setSearchRequest('');
        setVersion(version + 1);
    };

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <View style={styles.searchInput}>
                <SearchInputCom key={`search-${version}`}
                    defaultValue={searchRequest}
                    setSearchRequest={setSearchRequest}
                    refresh={refresh}
                    status={status} />
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={styles.travelPlanCardContainer}>
                    <TravelPlanCard key={`cards-${version}`}
                        navigation={navigation}
                        status={status}
                        userId={userId}
                        refresh={refresh}
                        searchRequest={searchRequest}
                        onUpdated={() => setVersion(version + 1)} />
                </View>

            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    previousButtonContainer: {
        flex: 0.3,
        marginTop: 20
    },
    travelPlanCardContainer: {
        minHeight: 800,
    },
    createButtonContainer: {
        position: 'absolute',
        right: 25,
        bottom: 25,
    },
    searchInput: {
        elevation: 10,
        shadowColor: '#000',
        backgroundColor: '#f2f2f2',
    }
})
