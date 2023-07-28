import React, { FC, useState, useEffect } from 'react';
import { ScrollView } from "native-base";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { StackScreenProps } from "@react-navigation/stack";
import RNLocalize from "react-native-localize";
import { StackNavigatorParamList } from "../navigators/AppStack";
import SearchInputCom from '../components/SearchInputCom';
import CreateButton from '../components/CreateButton';
import TravelPlanDetailCard from '../components/TravelPlanDetailCard';
import PlanCover from '../components/TravelPlanDetail_planCover';
import OptionList from '../components/OptionList';
import PreviousButton from '../components/PreviousButton';

import apis from '../services/apis';
import AppButton from '../components/AppButton';
import { findPlansCreatedByUserThunk } from '../redux/travelPlan/thunk/findPlansCreatedByUserThunk';
import { getSelfUserThunk } from '../redux/user/thunk/getSelfUserThunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { UserResponse } from '../redux/user/helper/userResponse';

export const PlanDetailScreen: FC<StackScreenProps<StackNavigatorParamList, "planDetail">> =
    ({ route, navigation }) => {

        const getSelfUserResult = useAppSelector<UserResponse | undefined>((state) => state.user.getSelfUserResult);
        const dispatch = useAppDispatch();

        // console.log('getSelfUserResultId: ', getSelfUserResult?.id)
        // console.log('id', userId);
        // const userId = 5;
        const userId = getSelfUserResult?.id

        //從 Thunk(fetch API) > userSlice 既 addCase > 之後 Frontend 透過 dispatch 拎返 Result , 否則 undefined ,所以要 set 個 useEffect 監聽住。 
        useEffect(() => {
            // console.log('getSelfUserResult: ', getSelfUserResult)
            dispatch(getSelfUserThunk());
            dispatch(findPlansCreatedByUserThunk());
        }, []);

        const travelPlanId = (route.params ?? {})['travelPlanId'];

        const [version, setVersion] = useState(0);
        const [plans, setPlans] = useState<any>([]);
        const [planAuthorId, setPlanAuthorId] = useState(Number)
        const [likeCount, setLikeCount] = useState(Number);
        const [totalDays, setTotalDays] = useState(Number);

        useEffect(() => {
            (async () => {
                const data = await apis.travelPlans.getOnePlans(travelPlanId);
                setPlans(data);
                setLikeCount(data[0].likes.length);
                setTotalDays(data[0].TotalDays);
                setPlanAuthorId(data[0].authorId);
                setLikeCount(data[0].planLikes)
            })();
        }, [version]);

        //if user is author
        const optionButton = () => {
            if (userId == planAuthorId) {
                return (
                    <OptionList key={`option-list-${version}`}
                        callFrom={'editPlan'}
                        userId={userId}
                        navigation={navigation}
                        travelPlanId={travelPlanId}
                        planAuthorId={planAuthorId}
                        optionsText={['編輯行程', '刪除行程']}
                        toWhere={'我的行程'}
                        onUpdated={() => setVersion(version + 1)} />
                )
            }
        }

        const header = () => {
            return (
                <PlanCover
                    plans={plans}
                    userId={userId}
                    planAuthorId={planAuthorId}
                    navigation={navigation}
                    // likeCount={plans && plans[0] ? plans[0].likes.length : 0}
                    likeCount={likeCount}
                    setLikeCount={setLikeCount}
                />
            )
        }

        console.log('detail totalDays', totalDays)

        const [tabIndex, setTabIndex] = useState(0);

        const tabs = [];

        for (let x = 1; x < totalDays + 1; x++) {
            const tabValue = { key: `tab${x}`, title: `第${x}日` }
            tabs.push(tabValue)
        }

        const EasyTab = ({ day }: any) => {
            // console.log('day', day)
            return (
                <Tab day={day}
                    planAuthorId={planAuthorId}
                    planId={travelPlanId}
                    navigation={navigation}
                    userId={userId}
                    onUpdated={() => setVersion(version + 1)} />
            );
        };
        const renderScene = SceneMap((new Array(totalDays))
            .fill(null)
            .map((_, index) => index)
            .reduce((obj: any, index) => {
                obj[`tab${index + 1}`] = () => <EasyTab day={`${index + 1}`} />;
                return obj;
            }, {})
        );

        const renderTabBar = (props: any) => {
            return (
                <TabBar
                    {...props}
                    scrollEnabled
                    indicatorStyle={{ backgroundColor: 'white', height: 5, borderRadius: 3 }}
                    tabStyle={{ height: 55, width: 130 }}
                    labelStyle={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 2 }}
                    style={{ backgroundColor: '#EE8732' }}
                />
            );
        };



        return (
            <SafeAreaView style={{ flex: 1, position: 'relative' }}>
                <View style={styles.previousButton}>
                    <PreviousButton navigation={navigation} onUpdated={(route.params ?? {})["onUpdated"]} />
                </View>

                <View style={styles.optionList}>
                    {optionButton()}
                </View>

                <View>{header()}</View>

                <TabView
                    style={{ flex: 1 }}
                    navigationState={{ index: tabIndex, routes: tabs }}
                    renderScene={renderScene}
                    onIndexChange={setTabIndex}
                    renderTabBar={renderTabBar}
                />
            </SafeAreaView>
        )
    }


const Tab = ({ navigation, day, userId, planId, planAuthorId, onUpdated }: any) => {
    const [dayPlanId, setDayPlanId] = useState(Number);
    const [getLocationDetail, setGetLocationDetail] = useState('');
    const [version, setVersion] = useState(0);
    const [searchRequest, setSearchRequest] = useState('');

    useEffect(() => {
        (async () => {
            const data = await apis.travelPlanDetail.getDayDetail(planId, day);
            setDayPlanId(data.id)
            setGetLocationDetail(data)
        })();
    }, []);

    //if user is author
    const addLocationButton = () => {
        if (userId == planAuthorId) {
            if (getLocationDetail != '') {
                let originLocation = getLocationDetail;

                return (
                    <View style={{ marginBottom: 20 }}>
                        <AppButton text={'新增景點'}
                            onPress={() => {
                                navigation.navigate('createDetail',
                                    {
                                        travelPlanId: planId,
                                        dayPlanId,
                                        planDay: day,
                                        onUpdated,
                                        originLocation
                                    })
                            }} />
                    </View>
                )
            }
        } else {
            return (
                <View>
                    <Text style={styles.nullResultTab}>日程完結</Text>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>

            <ScrollView style={{ flex: 1 }}>
                <View style={styles.travelPlanCardContainer}>
                    <TravelPlanDetailCard
                        planId={planId}
                        planAuthorId={planAuthorId}
                        navigation={navigation}
                        day={day}
                        userId={userId} />

                </View>
                <View style={styles.createButtonContainer}>
                    {addLocationButton()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    travelPlanCardContainer: {
        flex: 0.7,
    },
    createButtonContainer: {
        marginTop: 20
    },
    previousButton: {
        position: 'absolute',
        zIndex: 5,
        top: 20,
        left: 20,
    },
    optionList: {
        position: 'absolute',
        zIndex: 5,
        top: 20,
        right: 20,
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