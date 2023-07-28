import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '../../redux/store';
import { registerThunk } from '../../redux/user/thunk/registerThunk';
import RegularButton from '../../components/RegularButton';
import { Box, Center, CheckIcon, FormControl, Select } from 'native-base';
import { colors } from '../../components/Colors';
import { useNavigation } from '@react-navigation/native';

export const RegisterTab = () => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Nickname, setNickname] = useState('');
    const [SelfIntroduction, setSelfIntroduction] = useState('');

    const [service, setService] = React.useState("");
    const navigation = useNavigation();
    // 傳 遞 給 Redux Thunk
    const dispatch = useAppDispatch();
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: Email,
            password: Password,
            nickname: Nickname,
            selfIntroduction: SelfIntroduction
        }
    });

    const registerButton = async (data: any) => {
        try {
            dispatch(registerThunk(data));
            console.log(data);
            if (data) {
                // navigation.navigate('login')
                Alert.alert('成功註冊')
            }
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
                    <Box alignItems="center" style={{ marginTop: 10 }}>
                        <FormControl isRequired >
                            <FormControl.Label >電子郵箱</FormControl.Label>
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
                    pattern: /^\S+@\S+$/i
                }}
                defaultValue=""
            />
            {errors.email && errors.email.type === 'required' && (
                <Text style={styles.error}>郵件是必需的</Text>
            )}
            {errors.email && errors.email.type === 'pattern' && (
                <Text style={styles.error}>無效的郵件</Text>
            )}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Box alignItems="center" style={{ marginTop: 10 }}>
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
            {errors.password && errors.password.type === 'required' && (
                <Text style={styles.error}>密碼是必需的</Text>
            )}
            {errors.password && errors.password.type === 'minLength' && (
                <Text style={styles.error}>密碼至少應包含 8 個字符</Text>
            )}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Box alignItems="center" style={{ marginTop: 10 }}>
                        <FormControl>
                            <FormControl.Label>用戶名稱</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                placeholder="用戶名稱"
                                autoCapitalize="none"
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        </FormControl>
                    </Box>
                )}
                name="nickname"
                rules={{ required: true }}
                defaultValue=""
            />

            {/* <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Box alignItems="center">
                        <FormControl>
                            <FormControl.Label>自我介紹</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                placeholder="自我介紹"
                                autoCapitalize="none"
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        </FormControl>
                    </Box>
                )}
                name="selfIntroduction"
                rules={{ required: true }}
                defaultValue=""
            /> */}

            <Center>
                <Box alignItems="center" style={{ marginBottom: 10 }}>
                    {/* <Select selectedValue={service} minWidth="300" accessibilityLabel="Choose Service" placeholder="性別" _selectedItem={{
                        bg: `${colors.primary}`,
                    }} mt={4} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label="男" value="M" />
                        <Select.Item label="女" value="F" />
                        <Select.Item label="不適用" value="X" />
                    </Select> */}
                </Box>
            </Center>

            <RegularButton
                btnText={'註冊'}
                onPress={handleSubmit(registerButton)} />
        </View>
    );
};

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
});

