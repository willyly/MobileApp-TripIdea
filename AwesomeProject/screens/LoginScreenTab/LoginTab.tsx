import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '../../redux/store';
import RegularButton from '../../components/RegularButton';
import { loginThunk } from '../../redux/user/thunk/loginThunk';
import { Box, Divider, FormControl } from 'native-base';
import { colors } from '../../components/Colors';



export const LoginTab = () => {
    const [Email, setEmail] = useState('willy@willy');
    const [Password, setPassword] = useState('11111111');
    // const [Email, setEmail] = useState('');
    // const [Password, setPassword] = useState('');

    // 傳 遞 給 Redux Thunk
    const dispatch = useAppDispatch();

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: Email,
            password: Password,
        }
    });

    const [loginSuccess, setLoginSuccess] = useState(false);

    // useEffect(() => {
    //     // Check if login was successful
    //     if (isSubmitting) {
    //         if (loginSuccess) {
    //             console.log('Login successful');
    //         } else {
    //             Alert.alert('無效的電子郵件或密碼');
    //         }
    //     }
    // }, [isSubmitting, loginSuccess]);

    const loginButton = async (data: any) => {
        try {
            dispatch(loginThunk(data));
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}></Text>

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Box alignItems="center" style={{ marginTop: 20 }}>
                        <FormControl isRequired>
                            <FormControl.Label color="black">電子郵箱</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                placeholder="電子郵箱"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        </FormControl>
                    </Box>
                )}
                name="email"
                rules={{
                    required: true,
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                    }
                }}
                defaultValue=""
            />

            {errors.email?.type === 'required' && (
                <Text style={styles.error}>郵件是必需的</Text>
            )}
            {errors.email?.type === 'pattern' && (
                <Text style={styles.error}>無效的郵件地址</Text>
            )}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Box alignItems="center" style={{ marginTop: 10, marginBottom: 15 }}>
                        <FormControl isRequired>
                            <FormControl.Label>密碼</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                placeholder="密碼"
                                autoCapitalize="none"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        </FormControl>
                    </Box>
                )}
                name="password"
                rules={{ required: true, minLength: 8 }}
                defaultValue=""
            />

            {errors.password?.type === 'required' && (
                <Text style={styles.error}>密碼是必需的</Text>
            )}
            {errors.password?.type === 'minLength' && (
                <Text style={styles.error}>密碼至少應包含 8 個字符</Text>
            )}

            <RegularButton
                btnText={'登入'} onPress={handleSubmit((data) => {
                    if (data.password.length < 8) {
                        setLoginSuccess(false);
                    } else {
                        setLoginSuccess(true);
                    }
                    loginButton(data)
                })} />

            {/* <View style={{ flexDirection: "row" }}>
                <Divider style={{ width: 20, height: 1, borderRadius: 10, backgroundColor: `${colors.lightGrey}`, marginTop: 13 }} />
                <Text style={styles.subText}>
                    或以下登錄
                </Text>
                <Divider style={{ width: 20, height: 1, borderRadius: 10, backgroundColor: `${colors.lightGrey}`, marginTop: 13 }} />
            </View> */}

        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: -10
    },
    title: {
        fontSize: 30,
        //     fontWeight: 'bold',
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
    subText: {
        fontSize: 15,
        color: `${colors.lightGrey}`,
        margin: 5,
    },
})