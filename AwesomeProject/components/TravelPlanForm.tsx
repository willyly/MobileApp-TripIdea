import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { en, registerTranslation, useFormState, Form } from 'react-native-use-form'
import { HelperText, TextInput } from 'react-native-paper';
import ImagePicker, { MediaType, PhotoQuality, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TabNavigatorParamList } from "../navigators/HomeBottomTab";
import AppButton from './AppButton';
import Alert from './Alert';
import Calendar from "./Calendar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apis from '../services/apis';

// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;


const TravelPlanForm = ({ userId, navigation, TabNavigatorParamList, }: any) => {
    // console.log('navigation', navigation)
    // console.log('TabNavigatorParamList', TabNavigatorParamList)

    registerTranslation('en', en)
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [haveStartDate, setHaveStartDate] = useState(false);

    const [isStartDateVisible, setIsStartDateVisible] = useState(false);
    const [isEndDateVisible, setIsEndDateVisible] = useState(false);
    const [haveEndDate, setHaveEndDate] = useState(false);

    const [imageResult, setImageResult] = useState<{ image: string, imageUri: string, data: object } | undefined>(undefined)

    const [
        { errors, submit, formProps, hasErrors },
        { name },
    ] = useFormState(
        {
            referencePlanId: null,
            name: '',
            startDay: '',
            endDay: '',
            thumbnail: '',
        },
        {
            locale: 'en',
            onChange: (latestValues) => { },
            onSubmit: async (submittedValues) => {
                // console.log('submittedValues', submittedValues)
                // submittedValues.authorId = 0;
                submittedValues.referencePlanId = null;
                submittedValues.startDay = selectedStartDate;
                submittedValues.endDay = selectedEndDate;
                submittedValues.thumbnail = `public/travelPlan_thumbnalis/thumbnailFile-1679817189666-608433318.jpeg`;

                const formData = new FormData();
                // formData.append("authorId", submittedValues.authorId);
                formData.append("name", submittedValues.name);
                if (submittedValues.referencePlanId) {
                    formData.append("referencePlanId", submittedValues.referencePlanId);
                }
                formData.append("startDay", submittedValues.startDay);
                formData.append("endDay", submittedValues.endDay);
                if (imageResult?.data) {
                    formData.append("thumbnailFile", imageResult.data);
                } else {
                    const ImageDefault = ({
                        data: {
                            uri: 'file:///data/user/0/com.awesomeproject/cache/rn_image_picker_lib_temp_a33380de-a7b2-4c04-af8e-9db1162c2a4b.jpg',
                            type: "image/jpeg",
                            name: "rn_image_picker_lib_temp_a33380de-a7b2-4c04-af8e-9db1162c2a4b.jpg",
                        }
                    })
                    formData.append("thumbnailFile", ImageDefault.data);
                }

                const postPlan = await apis.travelPlans.create(formData);

                console.log('createPlan successful', postPlan.id, postPlan)
                navigation.navigate('planDetail', { travelPlanId: postPlan.id });
            },
        }
    );

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo' as MediaType,
            maxWidth: 2300,
            maxHeight: 2300,
            quality: 1 as PhotoQuality,
        };

        const ImagePicker = require('react-native-image-picker')
        ImagePicker.launchImageLibrary(options, (response: { didCancel: any; errorMessage: any; assets: number | any; }) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets) {
                console.log('response', typeof response.assets[0].fileName)
                console.log('response', response)
                let image: string = response.assets[0].fileName
                let imageUri: string = response.assets[0].uri

                setImageResult({
                    image,
                    imageUri,
                    data: {
                        uri: response.assets[0].uri,
                        type: response.assets[0].type,
                        name: response.assets[0].fileName,
                    }
                });
            }
        });
    };

    let thumbnailImage: string = `${BACKEND_URL}/public/travelPlan_thumbnalis/thumbnailFile-1679817189666-608433318.jpeg`;

    if (imageResult) {
        thumbnailImage = imageResult.imageUri
    }

    const [isAlert, setIsAlert] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
        < View style={styles.container} >

            <View style={[styles.imgContainer, styles.elevation]}>
                <Image
                    source={{
                        uri: thumbnailImage
                    }}
                    style={styles.thumbnail}
                />
            </View>
            <View style={styles.input}>
                <AppButton text={"行程封面"} onPress={openImagePicker} />
            </View>

            <Form {...formProps}>
                <TextInputWithError
                    style={styles.input}
                    mode="outlined"
                    {...name('name', {
                        required: true,
                        minLength: 1,
                        maxLength: 50,
                        label: "行程名稱"
                    })}
                />

                <View style={[styles.input, { marginTop: -12 }]}>
                    <AppButton text='出發日期' onPress={() => { setIsStartDateVisible(!isStartDateVisible) }} />
                    <Calendar
                        useStateSelect={selectedStartDate}
                        setUseStateSelect={setSelectedStartDate}
                        isDateVisible={isStartDateVisible}
                        setIsDateVisible={setIsStartDateVisible}
                        setHaveDate={setHaveStartDate}
                    />
                    <Text style={[styles.valueText, { marginTop: 20 }]}>出發日期 : {selectedStartDate}</Text>
                </View>

                <View style={[styles.input, { marginTop: 20 }]}>
                    <AppButton text='回程日期' onPress={() => { setIsEndDateVisible(!isEndDateVisible) }} />
                    <Calendar
                        useStateSelect={selectedEndDate}
                        setUseStateSelect={setSelectedEndDate}
                        isDateVisible={isEndDateVisible}
                        setIsDateVisible={setIsEndDateVisible}
                        setHaveDate={setHaveEndDate}
                    />
                    <Text style={[styles.valueText, { marginTop: 20 }]}>回程日期 : {selectedEndDate}</Text>
                </View>

                <View style={[styles.input, { marginTop: 20 }]}>
                    <Alert
                        callFrom={'planForm'}
                        hasErrors={hasErrors}
                        submit={submit}
                        haveStartDate={haveStartDate}
                        haveEndDate={haveEndDate}
                        successfulText={'行程完成'}
                        errorText={'請輸入完整資料'}
                    />
                </View>
            </Form>
        </ View >
    )
}



function TextInputWithError({ errorMessage, ...rest }: React.ComponentProps<typeof TextInput> & { errorMessage?: string }) {
    errorMessage = `請輸入${rest.label}`

    return (
        <View style={styles.input}>
            <TextInput {...rest}
                outlineColor="#EE8732"
                activeOutlineColor="#EE8732"
            />
            <HelperText type="error" visible={rest.error}>
                {errorMessage || ' '}
            </HelperText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignSelf: 'center',
        marginTop: 35,
    },
    imgContainer: {
        width: 440,
        height: 260,
        marginBottom: 25,
        borderRadius: 20,
    },
    thumbnail: {
        width: 440,
        height: 250,
        marginBottom: 15,
        borderRadius: 20,
    },
    input: {
        width: 350,
        alignSelf: 'center',
        margin: 10,
    },
    valueText: {
        fontSize: 16,
        color: 'black',
        borderWidth: 1,
        borderColor: "#EE8732",
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 13,
        paddingLeft: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    elevation: {
        shadowColor: '#000',
        elevation: 15,
    },
});


export default TravelPlanForm