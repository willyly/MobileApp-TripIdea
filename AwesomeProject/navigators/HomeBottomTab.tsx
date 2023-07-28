import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import {
    HomeScreen,
    ProfileScreen,
    ShareScreen,
    HitPlanScreen,
    ProfileScreenProps,
} from "../screens";

//component
import { colors } from "../components/Colors"

export type TabNavigatorParamList = {
    我的行程: any
    達人推薦: any
    與我共用: any
    profile: ProfileScreenProps
    otherUsersProfile: any
}

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export const HomeBottomTab = ({ navigation }: any) => {
    return (

        <Tab.Navigator
            initialRouteName="我的行程"
            screenOptions={{ //create tab style
                tabBarStyle: styles.tabBar,
            }}
        >

            {/* --------------------- HomeScreen---------------------  */}
            {/* <Tab.Screen name="home" component={(props: any) => <HomeScreen {...props} parentNav={navigation} />} /> */}
            {/* <Tab.Screen name="home" component={HomeScreen} */}
            <Tab.Screen name="我的行程" component={HomeScreen}
                options={{
                    // tabBarBadge: 3,
                    tabBarLabel: '',    // hide name
                    headerShown: false,
                    // headerStyle: {
                    //     backgroundColor: `${colors.primary}`,
                    // },
                    // headerTintColor: '#fff',
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 14 }}>

                            <Image
                                source={require('../assets/tab-icons/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? `${colors.primary}` : `${colors.secondary}`
                                }}
                            />

                            <Text
                                style={{
                                    color: focused ? `${colors.primary}` : `${colors.secondary}`, fontSize: 12
                                }}>我的行程
                            </Text>
                        </View>
                    ),
                }}
            />

            {/* --------------------- LocationScreen---------------------  */}
            <Tab.Screen name="達人推薦" component={HitPlanScreen}
                options={{
                    tabBarLabel: '',    // hide name
                    headerShown: false,
                    // headerStyle: {
                    //     backgroundColor: `${colors.primary}`,
                    // },
                    // headerTintColor: '#fff',
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 14 }}>

                            <Image
                                source={require('../assets/tab-icons/reward.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? `${colors.primary}` : `${colors.secondary}`
                                }}
                            />

                            <Text
                                style={{
                                    color: focused ? `${colors.primary}` : `${colors.secondary}`, fontSize: 12
                                }}>達人推薦
                            </Text>
                        </View>
                    ),
                }} />

            {/* --------------------- ExchangeScreen---------------------  */}
            <Tab.Screen name="與我共用" component={ShareScreen}
                options={{
                    tabBarLabel: '',    // hide name
                    headerShown: false,
                    // headerStyle: {
                    //     backgroundColor: `${colors.primary}`,
                    // },
                    // headerTintColor: '#fff',
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 14 }}>

                            <Image
                                source={require('../assets/tab-icons/share.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? `${colors.primary}` : `${colors.secondary}`
                                }}
                            />

                            <Text
                                style={{
                                    color: focused ? `${colors.primary}` : `${colors.secondary}`, fontSize: 12
                                }}>與我共用
                            </Text>
                        </View>
                    ),
                }} />

            {/* --------------------------ProfileScreen--------------------- */}
            <Tab.Screen name="profile" component={ProfileScreen}
                options={{
                    // tabBarBadge: 3,
                    headerShown: false, // HeaderBar
                    tabBarLabel: '',    // hide name
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 14 }}>

                            <Image
                                source={require('../assets/tab-icons/profile.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? `${colors.primary}` : `${colors.secondary}`
                                }}
                            />

                            <Text
                                style={{
                                    color: focused ? `${colors.primary}` : `${colors.secondary}`, fontSize: 12
                                }}>個人檔案
                            </Text>

                        </View>
                    ),
                }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: '10%',
        // borderRadius: 20,
        // marginHorizontal: 20,
        // marginBottom: 20,
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    }
});
