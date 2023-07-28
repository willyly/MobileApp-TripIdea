import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootState, useAppSelector } from "../redux/store";
import { WelcomeScreen, WelcomeScreenProps } from "../screens";
import LoginScreen from "../screens/LoginScreen";
import { PlanDetailScreen } from "../screens/PlanDetailScreen";
import { HomeBottomTab } from "./HomeBottomTab";
import { CreatePlanScreen } from "../screens/CreatePlanScreen";
import { OthersUserScreen } from "../screens/OthersUserScreen";
import { SearchScreen } from "../screens/SearchScreen"
import { CreateDetailScreen } from "../screens/CreateDetailScreen";
import { PlanLocationScreen } from "../screens/PlanLocationScreen";
import { ProfileEditScreen } from "../screens/ProfileEditScreen";

export type StackNavigatorParamList = {
    // before login
    welcome: WelcomeScreenProps
    login: any

    // after login
    homeTab: any

    planDetail: any

    createPlan: any

    othersUserProfile: any

    profileEditor: any

    searchScreen: any

    createDetail: any

    locationDetail: any
}

const Stack = createNativeStackNavigator<StackNavigatorParamList>();


export const AppStack = () => {
    // global state for login boolean
    const isLoggedIn = useAppSelector<boolean>((state) => state.user.isLoggedIn);

    return (
        <Stack.Navigator initialRouteName="welcome" screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <Stack.Group>
                    <Stack.Screen name="welcome" component={WelcomeScreen} />
                    <Stack.Screen name="login" component={LoginScreen}
                    // options={{ title: "Login/Register", headerShown: true }}
                    />
                </Stack.Group>
            ) : (
                <Stack.Group>
                    <Stack.Screen name="homeTab" component={HomeBottomTab} options={{ headerShown: false }} />
                </Stack.Group>
            )}
            <Stack.Group>
                <Stack.Screen name="planDetail" component={PlanDetailScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="createPlan" component={CreatePlanScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="othersUserProfile" component={OthersUserScreen} />
                <Stack.Screen name="searchScreen" component={SearchScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="createDetail" component={CreateDetailScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="locationDetail" component={PlanLocationScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="profileEditor" component={ProfileEditScreen} />
            </Stack.Group>

        </Stack.Navigator>
    )
}