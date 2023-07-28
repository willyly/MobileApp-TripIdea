import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { en, registerTranslation, useFormState, Form } from 'react-native-use-form'
import { HelperText, TextInput } from 'react-native-paper';
import ImagePicker, { MediaType, PhotoQuality, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TabNavigatorParamList } from "../navigators/HomeBottomTab";
import AppButton from './AppButton';
import Alert from './Alert';
import Calendar from "./Calendar";

import apis from '../services/apis';


const PatchPlanForm = ({ userId, navigation, travelPlanId, onUpdated }: any) => {
    console.log('planForm userId', userId)
    console.log('patchForm travelPlanId', travelPlanId)
    registerTranslation('en', en)
    const [plans, setPlans] = useState<any>([]);
    const [planAuthorId, setPlanAuthorId] = useState(Number);
    const [planName, setPlanName] = useState('');
    const [planThumbnalis, setPlanThumbnalis] = useState('');
    const [planStartDay, setPlanStartDay] = useState('');
    const [planEndDay, setPlanEndDay] = useState('');

    useEffect(() => {
        (async () => {
            const data = await apis.travelPlans.getOnePlans(travelPlanId);
            setPlans(data);
            setPlanAuthorId(data[0].authorId);
            setPlanName(data[0].name);

            const thumbnalisSplit = data[0].thumbnail.split("-");
            setPlanThumbnalis(thumbnalisSplit[0]);

            const startDaySplit = data[0].startDay.split('T');
            setPlanStartDay(startDaySplit[0]);

            const endDaySplit = data[0].endDay.split('T');
            setPlanEndDay(endDaySplit[0])
        })();
    }, []);

    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [haveStartDate, setHaveStartDate] = useState(false);

    const [isStartDateVisible, setIsStartDateVisible] = useState(false);
    const [isEndDateVisible, setIsEndDateVisible] = useState(false);
    const [haveEndDate, setHaveEndDate] = useState(false);

    const haveNewStartDate = () => {
        if (selectedStartDate != '') {
            return <Text style={[styles.valueText, { marginTop: 20 }]}> 出發日期 : {selectedStartDate}</Text>
        } else {
            return <Text style={[styles.valueText, { marginTop: 20 }]}>出發日期 : {planStartDay}</Text>
        }
    }

    const haveNewEndDate = () => {
        if (selectedEndDate != '') {
            return <Text style={[styles.valueText, { marginTop: 20 }]}> 出發日期 : {selectedEndDate}</Text>
        } else {
            return <Text style={[styles.valueText, { marginTop: 20 }]}>出發日期 : {planEndDay}</Text>
        }
    }

    const [imageResult, setImageResult] = useState<{ image: string, imageUri: string, data: object } | undefined>(undefined)

    const [
        { errors, submit, formProps, hasErrors },
        { name },
    ] = useFormState(
        {
            authorId: 0,
            referencePlanId: null,
            name: '',
            startDay: '',
            endDay: '',
            thumbnail: '',
        },
        {
            locale: 'en',
            onSubmit: async (submittedValues) => {
                submittedValues.authorId = userId;
                submittedValues.referencePlanId = null;

                const formData = new FormData();
                formData.append("authorId", submittedValues.authorId);
                if (!submittedValues.name) {
                    submittedValues.name = planName;
                    formData.append("name", submittedValues.name);
                } else {
                    formData.append("name", submittedValues.name);
                }

                if (submittedValues.referencePlanId) {
                    formData.append("referencePlanId", submittedValues.referencePlanId);
                }

                if (!selectedStartDate) {
                    submittedValues.startDay = planStartDay;
                    formData.append("startDay", planStartDay);
                } else {
                    submittedValues.startDay = selectedStartDate;
                    formData.append("startDay", submittedValues.startDay);
                }

                if (!selectedEndDate) {
                    submittedValues.endDay = planEndDay;
                    formData.append("endDay", planEndDay);
                } else {
                    submittedValues.endDay = selectedEndDate;
                    formData.append("endDay", submittedValues.endDay);
                }

                if (imageResult?.data) {
                    formData.append("thumbnailFile", imageResult.data);
                }
                // console.log('submittedValues', submittedValues)
                await apis.travelPlans.updatePlan(travelPlanId, formData);
                console.log('update successful')

                navigation.navigate('planDetail', { travelPlanId });
                onUpdated && onUpdated();
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


    const [isAlert, setIsAlert] = useState(false);
    const [isError, setIsError] = useState(false);

    if (userId == planAuthorId) {
        const dataName = plans[0].name;
        const dataThumbnalis = plans[0].thumbnail.split("-");
        let thumbnailImage = apis.travelPlans.getPlanThumbnail(dataThumbnalis)

        if (imageResult) {
            thumbnailImage = imageResult.imageUri
        }

        return (
            <View style={styles.container}>
                <View style={[styles.imgContainer, styles.elevation]}>
                    <Image
                        source={{
                            uri: thumbnailImage,
                        }}
                        style={styles.thumbnail}
                    />
                </View>
                <View style={styles.input}>
                    <AppButton text={"行程封面"} onPress={openImagePicker} />
                </View>

                <Form {...formProps}>
                    <View style={{ position: 'relative' }}>
                        <Text style={styles.patchFormHeader}>行程名稱</Text>
                        <TextInputWithError
                            defaultValue={dataName}
                            style={styles.input}
                            mode="outlined"
                            {...name('name', {
                                required: true,
                                minLength: 1,
                                maxLength: 50,
                            })}
                        />
                    </View>

                    <View style={[styles.input, { marginTop: -12 }]}>
                        <AppButton text='出發日期' onPress={() => { setIsStartDateVisible(!isStartDateVisible) }} />
                        <Calendar
                            useStateSelect={selectedStartDate}
                            setUseStateSelect={setSelectedStartDate}
                            isDateVisible={isStartDateVisible}
                            setIsDateVisible={setIsStartDateVisible}
                            setHaveDate={setHaveStartDate}
                        />
                        <View>{haveNewStartDate()}</View>
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
                        <View>{haveNewEndDate()}</View>
                    </View>

                    <View style={[styles.input, { marginTop: 20 }]}>
                        <Alert
                            callFrom={'patchPlanForm'}
                            hasErrors={hasErrors}
                            submit={submit}
                            travelPlanId={travelPlanId}
                            haveStartDate={haveStartDate}
                            haveEndDate={haveEndDate}
                            successfulText={'行程完成'}
                            errorText={'請輸入完整資料'}
                        />
                    </View>
                </Form >
            </ View >
        )
    }

    return (
        <View>
            <Text>對下userId</Text>
        </View>
    );
}


function TextInputWithError({ errorMessage, ...rest }: React.ComponentProps<typeof TextInput> & { errorMessage?: string }) {
    const [planName, setPlanName] = useState(rest.defaultValue)
    errorMessage = `請輸入行程名稱`

    return (
        <View style={styles.input}>
            <TextInput {...rest}
                value={planName}
                onChange={e => { setPlanName(e.target.value) }}
                defaultValue={rest.defaultValue}
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
    patchFormHeader: {
        position: 'absolute',
        top: 3,
        left: 50,
        fontSize: 14,
        color: "#EE8732",
    }
});

export default PatchPlanForm