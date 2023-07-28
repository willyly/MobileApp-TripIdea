import axios from "axios";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, FlatList, Button } from "react-native";
import { Select, Center, FormControl, WarningOutlineIcon, CheckIcon, VStack } from 'native-base';
import { en, registerTranslation, useFormState, Form } from 'react-native-use-form';
import { HelperText, TextInput } from 'react-native-paper';
import ImagePicker, { MediaType, PhotoQuality, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AppButton from './AppButton';
import Alert from './Alert';
import Calendar from "./Calendar";
import SelectTimeInput from './SelectTimeInput';
import apis from '../services/apis';
import travelPlanDetail from '../services/apis/travelPlanDetail';

import { registerCustomIconType } from "@rneui/themed";
// import { BACKEND_URL } from '@env';
const BACKEND_URL = `http://192.168.59.206:3000`;


const TravelPlanDetailForm = ({ userId, travelPlanId, dayPlanId, whichDay, navigation, onUpdated, originLocation }: any) => {
    //console.log('originLocation', originLocation)
    registerTranslation('en', en);
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [haveStartTime, setHaveStartTime] = useState(false);

    const [isStartTimeVisible, setIsStartTimeVisible] = useState(false);
    const [isEndTimeVisible, setIsEndTimeVisible] = useState(false);
    const [haveEndTime, setHaveEndTime] = useState(false);

    const [imageResult, setImageResult] = useState<{ image: string, imageUri: string, data: object } | undefined>(undefined)

    const [countryValue, setCountryValue] = useState("");
    const [areaValue, setAreaValue] = useState("");
    const [cityValue, setCityValue] = useState("");
    const [viewCategoryValue, setViewCategoryValue] = useState("");
    const [transportationValue, setTransportationValue] = useState("");

    const [countryItems, setCountryItems] = useState([]);
    const [areaItems, setAreaItems] = useState([]);
    const [cityItems, setCityItems] = useState([]);

    const [originCountryValue, setOriginCountryValue] = useState("");
    const [originAreaItems, setOriginAreaItems] = useState([]);

    const [
        { errors, submit, formProps, hasErrors },
        { text },
    ] = useFormState(
        {
            travelPlanDayId: 0,
            countryId: '',
            areaId: '',
            cityId: '',
            locationName: '',
            locationImg: '',
            category: '',
            address: '',
            tel: '',
            startTime: '',
            endTime: '',
            transportation: '',
            notes: '',
        },
        {
            locale: 'en',
            onChange: (latestValues) => { },
            onSubmit: async (submittedValues) => {
                // console.log('submittedValues', submittedValues)
                // console.log('countryValue', countryValue)
                // console.log('areaValue', areaValue)
                // console.log('cityValue', cityValue)
                // console.log('type cityValue', typeof cityValue)

                submittedValues.travelPlanDayId = dayPlanId;
                submittedValues.countryId = countryValue;
                submittedValues.category = viewCategoryValue;
                submittedValues.transportation = transportationValue;
                submittedValues.startTime = selectedStartTime;
                submittedValues.endTime = selectedEndTime;
                // submittedValues.thumbnail = `public/travelPlan_thumbnalis/thumbnailFile-1679817189666-608433318.jpeg`;

                const formData = new FormData();
                // formData.append("travelPlanDayId", submittedValues.travelPlanDayId);
                formData.append("travelPlanDayId", dayPlanId);
                formData.append("countryId", submittedValues.countryId);
                formData.append("areaId", areaValue)
                formData.append("cityId", cityValue)
                formData.append("locationName", submittedValues.locationName);

                if (submittedValues.category == '') {
                    submittedValues.category = 'view';
                    formData.append("category", submittedValues.category);
                } else {
                    formData.append("category", submittedValues.category);
                }

                if (submittedValues.address == '') {
                    submittedValues.address = null;
                    formData.append("address", submittedValues.address);
                } else {
                    formData.append("address", submittedValues.address);
                }

                if (submittedValues.tel == '') {
                    submittedValues.tel = null;
                    formData.append("tel", submittedValues.tel);
                } else {
                    formData.append("tel", submittedValues.tel);
                }
                formData.append("startTime", submittedValues.startTime);
                formData.append("endTime", submittedValues.endTime);
                formData.append("transportation", submittedValues.transportation);
                if (submittedValues.notes == '') {
                    submittedValues.notes = null;
                    formData.append("notes", submittedValues.notes);
                } else {
                    formData.append("notes", submittedValues.notes);
                }
                if (imageResult?.data) {
                    formData.append("locationImgFile", imageResult.data);
                } else {
                    const ImageDefault = ({
                        data: {
                            uri: 'file:///data/user/0/com.awesomeproject/cache/rn_image_picker_lib_temp_a33380de-a7b2-4c04-af8e-9db1162c2a4b.jpg',
                            type: "image/jpeg",
                            name: "rn_image_picker_lib_temp_a33380de-a7b2-4c04-af8e-9db1162c2a4b.jpg",
                        }
                    })

                    formData.append("locationImgFile", ImageDefault.data);
                }

                // console.log('submittedValues', submittedValues)
                const postPlanDetail = await apis.travelPlanDetail.create(dayPlanId, formData);
                console.log('createDetail successful', postPlanDetail.data.id, postPlanDetail.data)
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

    let locationImage: string = `${BACKEND_URL}/public/travelPlan_thumbnalis/thumbnailFile-1679817189666-608433318.jpeg`;

    if (imageResult) {
        locationImage = imageResult.imageUri
    }

    const [originCountryName, setOriginCountryName] = useState('');
    const getOriginCountry = (originCountryId: any) => {

        useEffect(() => {
            (async () => {
                const have_detail = await apis.country.getOneCountry(originCountryId)
                setOriginCountryName(have_detail.chName)
            })()
        }, [])
    }

    console.log('originLocation.travelPlanDetail', originLocation)
    const checkDetail = () => {
        if (originLocation.travelPlanDetail.length != 0) {
            const indexNumber = originLocation.travelPlanDetail.length - 1;
            const originCountryId = originLocation.travelPlanDetail[indexNumber].countryId;
            getOriginCountry(originCountryId)

            return (
                <SelectInput
                    countryValue={countryValue || originCountryId} setCountryValue={setCountryValue}
                    areaValue={areaValue} setAreaValue={setAreaValue}
                    cityValue={cityValue} setCityValue={setCityValue}
                    countryItems={countryItems} setCountryItems={setCountryItems}
                    areaItems={areaItems} setAreaItems={setAreaItems}
                    cityItems={cityItems} setCityItems={setCityItems}
                    viewCategoryValue={viewCategoryValue} setViewCategoryValue={setViewCategoryValue}
                    transportationValue={transportationValue} setTransportationValue={setTransportationValue}
                />
            )
        } else {
            return (
                <SelectInput
                    countryValue={countryValue} setCountryValue={setCountryValue}
                    areaValue={areaValue} setAreaValue={setAreaValue}
                    cityValue={cityValue} setCityValue={setCityValue}
                    countryItems={countryItems} setCountryItems={setCountryItems}
                    areaItems={areaItems} setAreaItems={setAreaItems}
                    cityItems={cityItems} setCityItems={setCityItems}
                    viewCategoryValue={viewCategoryValue} setViewCategoryValue={setViewCategoryValue}
                    transportationValue={transportationValue} setTransportationValue={setTransportationValue}
                />
            )
        }
    }

    return (
        <View style={styles.container} >
            <View style={[styles.imgContainer, styles.elevation]}>
                <Image source={{
                    uri: locationImage
                }}
                    style={styles.thumbnail}
                />
            </View>
            <View style={styles.input}>
                <AppButton text={"景點照片"} onPress={openImagePicker} />
            </View>

            <Form {...formProps}>
                <TextInputWithError
                    style={styles.input}
                    mode="outlined"
                    {...text('locationName', {
                        required: true,
                        minLength: 1,
                        maxLength: 50,
                        label: "景點名稱"
                    })}
                />

                <View style={{ marginTop: -14 }}>
                    {checkDetail()}
                </View>

                <View style={[styles.input, { marginTop: -5 }]}>
                    <AppButton text='到逹時間' onPress={() => { setIsStartTimeVisible(!isStartTimeVisible) }} />
                    <SelectTimeInput
                        useStateSelect={selectedStartTime}
                        setUseStateSelect={setSelectedStartTime}
                        isTimeVisible={isStartTimeVisible}
                        setIsTimeVisible={setIsStartTimeVisible}
                        setHaveTime={setHaveStartTime}
                    />
                    <Text style={[styles.valueText, { marginTop: 20 }]}>到逹時間 : {selectedStartTime}</Text>
                </View>

                <View style={[styles.input, { marginTop: 20 }]}>
                    <AppButton text='離開時間' onPress={() => { setIsEndTimeVisible(!isEndTimeVisible) }} />
                    <SelectTimeInput
                        useStateSelect={selectedEndTime}
                        setUseStateSelect={setSelectedEndTime}
                        isTimeVisible={isEndTimeVisible}
                        setIsTimeVisible={setIsEndTimeVisible}
                        setHaveTime={setHaveEndTime}
                    />
                    <Text style={[styles.valueText, { marginTop: 20 }]}>離開時間 : {selectedEndTime}</Text>
                </View>

                <TextInputWithError
                    style={styles.input}
                    mode="outlined"
                    {...text('address', {
                        required: false,
                        label: "景點地址"
                    })}
                />

                <TextInputWithError
                    style={styles.input}
                    mode="outlined"
                    {...text('tel', {
                        required: false,
                        maxLength: 50,
                        label: "電話"
                    })}
                />

                <TextInputWithError
                    style={styles.input}
                    mode="outlined"
                    {...text('notes', {
                        required: false,
                        label: "備註"
                    })}
                />

                <View style={[styles.input, { marginTop: 20 }]}>
                    <Alert
                        callFrom={'detailForm'}
                        hasErrors={hasErrors}
                        submit={submit}
                        navigation={navigation}
                        successfulText={'景點新增成功'}
                        errorText={'景點新增失敗'}
                        haveStartTime={haveStartTime}
                        haveEndTime={haveEndTime}
                    />
                </View>
            </Form>
        </ View >
    )
}

const SelectInput = ({
    countryValue, setCountryValue,
    areaValue, setAreaValue,
    cityValue, setCityValue,
    countryItems, setCountryItems,
    areaItems, setAreaItems,
    cityItems, setCityItems,
    viewCategoryValue, setViewCategoryValue,
    transportationValue, setTransportationValue,
}: any) => {
    useEffect(() => {
        if (!countryItems || countryItems.length <= 0) {
            (async () => {
                const countryData = await apis.country.getAllCountry();
                setCountryItems(
                    countryData.map(({ chName, id }: any, index: any) => {
                        return (
                            <Select.Item key={index} label={chName} value={id} />
                        );
                    })
                );
            })();
        }
    }, []);

    useEffect(() => {
        if (countryValue) {
            (async () => {
                const areaData = await apis.country.getAllArea(countryValue);
                setAreaItems(
                    areaData.map(({ chName, id }: any, index: any) => {
                        return (
                            <Select.Item key={index} label={chName} value={id} />
                        )
                    })
                );
            })();
        }
    }, [countryValue]);

    useEffect(() => {
        if (areaValue) {
            (async () => {
                const cityData = await apis.country.getAllCity(areaValue);
                setCityItems(
                    cityData.map(({ chName, id }: any, index: any) => {
                        return (
                            <Select.Item key={index} label={chName} value={id} />
                        )
                    })
                );
            })();
        }
    }, [areaValue]);

    return (
        <View>
            <VStack style={styles.selectSection}>
                <View style={styles.selectInput}>
                    <Select
                        style={styles.selectText}
                        selectedValue={countryValue}
                        minWidth="350"
                        accessibilityLabel="國家"
                        placeholder="國家"

                        _selectedItem={{
                            endIcon: <CheckIcon size="5" />
                        }}
                        _light={{
                            bg: "white",
                            borderColor: "#EE8732",
                            width: 50,
                        }}
                        onValueChange={(itemValue) => {
                            // console.log('itemValue', itemValue)
                            setCountryValue(itemValue)
                        }}>
                        {countryItems}
                    </Select>
                </View>
            </VStack>

            <VStack style={styles.selectSection}>
                <View style={styles.selectInput}>
                    <Select
                        style={styles.selectText}
                        selectedValue={areaValue}
                        minWidth="170"
                        accessibilityLabel="地區"
                        placeholder="地區"
                        _selectedItem={{
                            endIcon: <CheckIcon size="5" />
                        }}
                        _light={{
                            bg: "white",
                            borderColor: "#EE8732",
                        }}
                        onValueChange={(itemValue) => {
                            // console.log('itemValue', itemValue)
                            setAreaValue(itemValue)
                        }}>
                        {areaItems}
                    </Select>
                </View>

                <View style={{
                    ...styles.selectInput,
                    display: cityItems?.length > 0 ? "flex" : "none"
                }} >
                    <Select
                        style={styles.selectText}
                        selectedValue={cityValue}
                        minWidth="170"
                        accessibilityLabel="城市"
                        placeholder="城市"
                        _selectedItem={{
                            endIcon: <CheckIcon size="5" />
                        }}
                        _light={{
                            bg: "white",
                            borderColor: "#EE8732",
                        }}
                        onValueChange={(itemValue) => {
                            // console.log('itemValue', itemValue)
                            setCityValue(itemValue)
                        }}>
                        {cityItems}
                    </Select>
                </View>
            </VStack>

            <VStack style={styles.selectSection}>
                <View style={styles.selectInput}>
                    <Select
                        style={styles.selectText}
                        selectedValue={viewCategoryValue}
                        minWidth="350"
                        accessibilityLabel="景點類型"
                        placeholder="景點類型"
                        _selectedItem={{
                            endIcon: <CheckIcon size="5" />
                        }}
                        _light={{
                            bg: "white",
                            borderColor: "#EE8732",
                            width: 50,
                        }}
                        onValueChange={(itemValue) => {
                            // console.log('itemValue', itemValue)
                            setViewCategoryValue(itemValue)
                        }}>
                        <Select.Item label="戶外" value='view' />
                        <Select.Item label="酒店" value='hotel' />
                        <Select.Item label="餐廳" value='restaurant' />
                        <Select.Item label="購物" value='shopping' />
                        <Select.Item label="溫泉" value='spa' />
                        <Select.Item label="海灘" value='beach' />
                        <Select.Item label="劇院" value='theater' />
                        <Select.Item label="機場" value='airport' />
                        <Select.Item label="其他" value='other' />
                    </Select>
                </View>
            </VStack>

            <VStack style={styles.selectSection}>
                <View style={styles.selectInput}>
                    <Select
                        style={styles.selectText}
                        selectedValue={transportationValue}
                        minWidth="350"
                        accessibilityLabel="前往交通"
                        placeholder="前往交通"
                        _selectedItem={{
                            endIcon: <CheckIcon size="5" />
                        }}
                        _light={{
                            bg: "white",
                            borderColor: "#EE8732",
                            width: 50,
                        }}
                        onValueChange={(itemValue) => {
                            // console.log('itemValue', itemValue)
                            setTransportationValue(itemValue)
                        }}>
                        <Select.Item label="步行" value='walking' />
                        <Select.Item label="巴士" value='bus' />
                        <Select.Item label="計程車" value='taxi' />
                        <Select.Item label="私家車" value='car' />
                        <Select.Item label="地鐵" value='subway' />
                        <Select.Item label="船" value='ship' />
                        <Select.Item label="游輪" value='ferry' />
                        <Select.Item label="飛機" value='airplane' />
                        <Select.Item label="直昇機" value='helicopter' />
                        <Select.Item label="其他" value='other' />
                    </Select>
                </View>
            </VStack>
        </View>
    )
    //}
    //else {
    //    return (
    //        <View>
    //            <VStack style={styles.selectSection}>
    //                <View style={styles.selectInput}>
    //                    <Select
    //                        style={styles.selectText}
    //                        selectedValue={countryValue}
    //                        minWidth="350"
    //                        accessibilityLabel="國家"
    //                        placeholder={originCountryName}

    //                        _selectedItem={{
    //                            endIcon: <CheckIcon size="5" />
    //                        }}
    //                        _light={{
    //                            bg: "white",
    //                            borderColor: "#EE8732",
    //                            width: 50,
    //                        }}
    //                        onValueChange={(originCountryId) => {
    //                            // console.log('itemValue', itemValue)
    //                            // setCountryValue(itemValue)
    //                            setOriginCountryValue(originCountryId)
    //                        }}>
    //                        {countryItems}
    //                    </Select>
    //                </View>
    //            </VStack>

    //            <VStack style={styles.selectSection}>
    //                <View style={styles.selectInput}>
    //                    <Select
    //                        style={styles.selectText}
    //                        selectedValue={areaValue}
    //                        minWidth="170"
    //                        accessibilityLabel="地區"
    //                        placeholder="地區"
    //                        _selectedItem={{
    //                            endIcon: <CheckIcon size="5" />
    //                        }}
    //                        _light={{
    //                            bg: "white",
    //                            borderColor: "#EE8732",
    //                        }}
    //                        onValueChange={(itemValue) => {
    //                            // console.log('itemValue', itemValue)
    //                            setAreaValue(itemValue)
    //                        }}>
    //                        {originAreaItems}
    //                    </Select>
    //                </View>

    //                <View style={styles.selectInput}>
    //                    <Select
    //                        style={styles.selectText}
    //                        selectedValue={cityValue}
    //                        minWidth="170"
    //                        accessibilityLabel="城市"
    //                        placeholder="城市"
    //                        _selectedItem={{
    //                            endIcon: <CheckIcon size="5" />
    //                        }}
    //                        _light={{
    //                            bg: "white",
    //                            borderColor: "#EE8732",
    //                        }}
    //                        onValueChange={(itemValue) => {
    //                            // console.log('itemValue', itemValue)
    //                            setCityValue(itemValue)
    //                        }}>
    //                        {cityItems}
    //                    </Select>
    //                </View>
    //            </VStack>

    //            {/* <VStack style={styles.selectSection}>
    //                <View style={styles.selectInput}>
    //                    <Select
    //                        style={styles.selectText}
    //                        selectedValue={viewCategoryValue}
    //                        minWidth="350"
    //                        accessibilityLabel="景點類型"
    //                        placeholder="景點類型"
    //                        _selectedItem={{
    //                            endIcon: <CheckIcon size="5" />
    //                        }}
    //                        _light={{
    //                            bg: "white",
    //                            borderColor: "#EE8732",
    //                            width: 50,
    //                        }}
    //                        onValueChange={(itemValue) => {
    //                            // console.log('itemValue', itemValue)
    //                            setViewCategoryValue(itemValue)
    //                        }}>
    //                        <Select.Item label="戶外" value='view' />
    //                        <Select.Item label="酒店" value='hotel' />
    //                        <Select.Item label="餐廳" value='restaurant' />
    //                        <Select.Item label="購物" value='shopping' />
    //                        <Select.Item label="溫泉" value='spa' />
    //                        <Select.Item label="海灘" value='beach' />
    //                        <Select.Item label="劇院" value='theater' />
    //                        <Select.Item label="機場" value='airport' />
    //                        <Select.Item label="其他" value='other' />
    //                    </Select>
    //                </View>
    //            </VStack>

    //            <VStack style={styles.selectSection}>
    //                <View style={styles.selectInput}>
    //                    <Select
    //                        style={styles.selectText}
    //                        selectedValue={transportationValue}
    //                        minWidth="350"
    //                        accessibilityLabel="前往交通"
    //                        placeholder="前往交通"
    //                        _selectedItem={{
    //                            endIcon: <CheckIcon size="5" />
    //                        }}
    //                        _light={{
    //                            bg: "white",
    //                            borderColor: "#EE8732",
    //                            width: 50,
    //                        }}
    //                        onValueChange={(itemValue) => {
    //                            // console.log('itemValue', itemValue)
    //                            setTransportationValue(itemValue)
    //                        }}>
    //                        <Select.Item label="步行" value='walking' />
    //                        <Select.Item label="巴士" value='bus' />
    //                        <Select.Item label="計程車" value='taxi' />
    //                        <Select.Item label="私家車" value='car' />
    //                        <Select.Item label="地鐵" value='subway' />
    //                        <Select.Item label="船" value='ship' />
    //                        <Select.Item label="游輪" value='ferry' />
    //                        <Select.Item label="飛機" value='airplane' />
    //                        <Select.Item label="直昇機" value='helicopter' />
    //                        <Select.Item label="其他" value='other' />
    //                    </Select>
    //                </View>
    //            </VStack> */}
    //        </View>
    //    )
    //}

    // return (
    //     <View>
    //         <VStack style={styles.selectSection}>
    //             <View style={styles.selectInput}>
    //                 <Select
    //                     style={styles.selectText}
    //                     selectedValue={countryValue}
    //                     minWidth="350"
    //                     accessibilityLabel="國家"
    //                     placeholder={originCountryName}

    //                     _selectedItem={{
    //                         endIcon: <CheckIcon size="5" />
    //                     }}
    //                     _light={{
    //                         bg: "white",
    //                         borderColor: "#EE8732",
    //                         width: 50,
    //                     }}
    //                     onValueChange={(itemValue) => {
    //                         // console.log('itemValue', itemValue)
    //                         setCountryValue(itemValue)
    //                     }}>
    //                     {countryItems}
    //                 </Select>
    //             </View>
    //         </VStack>

    //         <VStack style={styles.selectSection}>
    //             <View style={styles.selectInput}>
    //                 <Select
    //                     style={styles.selectText}
    //                     selectedValue={areaValue}
    //                     minWidth="170"
    //                     accessibilityLabel="地區"
    //                     placeholder="地區"
    //                     _selectedItem={{
    //                         endIcon: <CheckIcon size="5" />
    //                     }}
    //                     _light={{
    //                         bg: "white",
    //                         borderColor: "#EE8732",
    //                     }}
    //                     onValueChange={(itemValue) => {
    //                         // console.log('itemValue', itemValue)
    //                         setAreaValue(itemValue)
    //                     }}>
    //                     {areaItems}
    //                 </Select>
    //             </View>

    //             <View style={styles.selectInput}>
    //                 <Select
    //                     style={styles.selectText}
    //                     selectedValue={cityValue}
    //                     minWidth="170"
    //                     accessibilityLabel="城市"
    //                     placeholder="城市"
    //                     _selectedItem={{
    //                         endIcon: <CheckIcon size="5" />
    //                     }}
    //                     _light={{
    //                         bg: "white",
    //                         borderColor: "#EE8732",
    //                     }}
    //                     onValueChange={(itemValue) => {
    //                         // console.log('itemValue', itemValue)
    //                         setCityValue(itemValue)
    //                     }}>
    //                     {cityItems}
    //                 </Select>
    //             </View>
    //         </VStack>

    //         <VStack style={styles.selectSection}>
    //             <View style={styles.selectInput}>
    //                 <Select
    //                     style={styles.selectText}
    //                     selectedValue={viewCategoryValue}
    //                     minWidth="350"
    //                     accessibilityLabel="景點類型"
    //                     placeholder="景點類型"
    //                     _selectedItem={{
    //                         endIcon: <CheckIcon size="5" />
    //                     }}
    //                     _light={{
    //                         bg: "white",
    //                         borderColor: "#EE8732",
    //                         width: 50,
    //                     }}
    //                     onValueChange={(itemValue) => {
    //                         // console.log('itemValue', itemValue)
    //                         setViewCategoryValue(itemValue)
    //                     }}>
    //                     <Select.Item label="戶外" value='view' />
    //                     <Select.Item label="酒店" value='hotel' />
    //                     <Select.Item label="餐廳" value='restaurant' />
    //                     <Select.Item label="購物" value='shopping' />
    //                     <Select.Item label="溫泉" value='spa' />
    //                     <Select.Item label="海灘" value='beach' />
    //                     <Select.Item label="劇院" value='theater' />
    //                     <Select.Item label="其他" value='other' />
    //                 </Select>
    //             </View>
    //         </VStack>

    //         <VStack style={styles.selectSection}>
    //             <View style={styles.selectInput}>
    //                 <Select
    //                     style={styles.selectText}
    //                     selectedValue={transportationValue}
    //                     minWidth="350"
    //                     accessibilityLabel="前往交通"
    //                     placeholder="前往交通"
    //                     _selectedItem={{
    //                         endIcon: <CheckIcon size="5" />
    //                     }}
    //                     _light={{
    //                         bg: "white",
    //                         borderColor: "#EE8732",
    //                         width: 50,
    //                     }}
    //                     onValueChange={(itemValue) => {
    //                         // console.log('itemValue', itemValue)
    //                         setTransportationValue(itemValue)
    //                     }}>
    //                     <Select.Item label="步行" value='walking' />
    //                     <Select.Item label="巴士" value='bus' />
    //                     <Select.Item label="地鐵" value='subway' />
    //                     <Select.Item label="計程車" value='taxi' />
    //                     <Select.Item label="私家車" value='car' />
    //                     <Select.Item label="船" value='ship' />
    //                     <Select.Item label="游輪" value='ferry' />
    //                     <Select.Item label="直昇機" value='helicopter' />
    //                     <Select.Item label="其他" value='other' />
    //                 </Select>
    //             </View>
    //         </VStack>
    //     </View>
    // )
};

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
        // borderWidth: 1,
        // borderColor: 'red',
        width: 470,
        position: 'relative',
        alignSelf: 'center',
    },
    imgContainer: {
        width: 440,
        height: 260,
        marginBottom: 25,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 35,
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
    selectSection: {
        height: 90,
        alignSelf: 'center',
        flexDirection: 'row',
        width: 350,
    },
    selectInput: {
        // borderWidth: 1,
        // borderColor: 'blue',
        // width: 135,
        marginRight: 10
    },
    selectText: {
        fontSize: 16,
        color: 'black',
        letterSpacing: 2,
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
})

export default TravelPlanDetailForm