import React, { FC, FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Dimensions, useWindowDimensions, Alert, SafeAreaView, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../navigators/AppStack";
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import { Button as RneuiButton } from '@rneui/themed'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faAngleLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from "native-base";
import { Box, Center, CheckIcon, FormControl, Select } from 'native-base';

//components
import { RegisterTab } from "./LoginScreenTab/RegisterTab";
import { LoginTab } from "./LoginScreenTab/LoginTab";
import { colors } from "../components/Colors";
import { registerThunk } from "../redux/user/thunk/registerThunk";
import { useAppDispatch } from "../redux/store";
import { Controller, useForm } from "react-hook-form";
import RegularButton from "../components/RegularButton";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

export interface LoginScreenProps {

}

export const LoginScreen: FC<StackScreenProps<StackNavigatorParamList, "login">> =
    ({ route, navigation }) => {
        const [Email, setEmail] = useState('');
        const [Password, setPassword] = useState('');
        const [Nickname, setNickname] = useState('');
        const [SelfIntroduction, setSelfIntroduction] = useState('');
        const dispatch = useAppDispatch();
        const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
            defaultValues: {
                email: Email,
                password: Password,
                nickname: Nickname,
                selfIntroduction: SelfIntroduction
            }
        });
        const layout = useWindowDimensions();
        const [index, setIndex] = useState(0);
        const [routes] = useState([
            { key: 'login', title: '登入' },
            { key: 'register', title: '註冊' },
        ]);


        // Text Input ---------------------
        const renderScene = ({ route }: any) => {
            switch (route.key) {
                case 'login':
                    return (
                        // <ScrollView>
                        <View>
                            <LoginTab />
                        </View>
                        // </ScrollView>
                    );

                case 'register':
                    return (
                        <ScrollView>
                            <View>
                                <RegisterTab />
                            </View>
                        </ScrollView>

                    );
            }
        }

        // Tab Bar ---------------------
        const renderTabBar = (props: any) => (
            <TabBar {...props}
                // tabStyle={({ route }: { route: any }) => ({
                //     backgroundColor:
                //         route.key === 'login' ? `${colors.secondOrg}` : `${colors.blue}`,
                //     borderRadius: 15,
                //     margin: 30,
                //     marginBottom: 20
                // })}
                // tabStyle={{
                //     backgroundColor: `${colors.secondOrg}`, borderRadius: 15, margin: 30, marginBottom: 20
                // }}
                labelStyle={{ letterSpacing: 2 }}
                // indicatorStyle={{ height: 0 }}  // hide order line****
                //ios

                // indicatorStyle={{ backgroundColor: `${colors.primary}`, height: 5, borderRadius: 3, width: 85, left: 37 }}
                // style={{
                //     backgroundColor: "#full-color-hex-code",  // hide default Tab Bar Color****
                //     borderRadius: 10  // hide default Tab Bar Color****
                // }}

                //ad
                indicatorStyle={{ backgroundColor: `${colors.primary}`, height: 5, borderRadius: 3, width: 200, left: 0 }}

                style={{
                    backgroundColor: 'white',
                }}
                activeColor={"#202224"}
                inactiveColor={`${colors.lightGrey}`}
            />
        )

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{
                    position: 'absolute'
                }}>
                    <Image
                        style={styles.bgImage}
                        source={require('../assets/bgs/bg.png')}
                    />
                </View>

                <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                    <View style={styles.backButtonRow}>
                        <RneuiButton
                            // color={colors.primary}
                            type="clear"
                            onPress={() => navigation.goBack()}
                            buttonStyle={styles.backButton}
                        ><FontAwesomeIcon icon={faAngleLeft} color={colors.lightGrey} size={20} />
                        </RneuiButton>
                    </View>
                </View>

                {/* Logo */}
                <View style={styles.imageRow}>
                    <Image
                        source={require('../assets/logo/logo_loginPage.png')}
                        style={styles.image}
                    // resizeMode="cover"
                    />
                </View>

                {/* ios */}
                {/* <View style={{
                    flex: 1,
                    borderRadius: 20,
                    margin: 20,
                    backgroundColor: `${colors.white}`,
                    // backgroundColor: `${colors.third}`,
                    paddingTop: 25,
                    shadowColor: `${colors.third}`,
                    shadowOffset: {
                        width: 0.5,
                        height: 1,
                    },
                    shadowOpacity: 0.5
                }}> */}

                {/* ad */}
                <View style={{
                    flex: 1,
                    borderRadius: 20,
                    margin: 20,
                    backgroundColor: `${colors.white}`,
                    paddingTop: 25,
                    borderStyle: 'dashed',
                    borderWidth: 3,
                    borderColor: `${colors.primary}`,
                }}>
                    {/* <TabView style={styles.iosTabView} */}
                    <TabView style={styles.adTabView}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        renderTabBar={renderTabBar}
                    />
                </View>

                <View style={{ paddingHorizontal: 35, paddingTop: 20 }}>
                    <Text style={styles.text}>
                        繼續即代表你已閱讀及明白有關註冊的《條款及細則》，《私隱政策聲明》及《收集個人資料聲明》，並同意接受其約束。
                    </Text>
                </View>
                {/* <RegularButton
                    btnText="To Home Tab"
                    onPress={() => navigation.navigate('homeTab')}
                /> */}
            </SafeAreaView >
        )
    }

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: -10
    },
    title: {
        fontSize: 30,
        // fontWeight: 'bold',
    },
    input: {
        borderWidth: 2,
        borderColor: `${colors.primary}`,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: 300,
    },
    error: {
        color: 'red',
        margin: 5
    },
    button: {
        marginBottom: 15,
    },
    backButton: {
        width: "65%",
        borderRadius: 10
    },
    backButtonRow: {
        marginTop: 20,
        flexDirection: "row",
        height: 40
    },
    imageRow: {
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
        marginTop: '-10%',
        // marginTop: '-18%',
    },
    bgImage: {
        ...StyleSheet.absoluteFillObject,
        width: 500,
        height: 500,
    },
    text: {
        textAlign: 'center',
        fontSize: 10,
        marginBottom: 10,
        color: `${colors.lightGrey}`
    },
    // iosTabView: {
    //     margin: 15,
    //     marginTop: -20,
    // },
    adTabView: {
        margin: 15,
        marginTop: -20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

});





