import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMountainSun } from '@fortawesome/free-solid-svg-icons/faMountainSun';
import { faBed } from '@fortawesome/free-solid-svg-icons/faBed';
import { faUtensils } from '@fortawesome/free-solid-svg-icons/faUtensils';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping';
import { faHotel } from '@fortawesome/free-solid-svg-icons/faHotel';
import { faHotTubPerson } from '@fortawesome/free-solid-svg-icons/faHotTubPerson';
import { faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons/faUmbrellaBeach';
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons/faMasksTheater';
import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons/faMartiniGlassCitrus';
import { faPersonSwimming } from '@fortawesome/free-solid-svg-icons/faPersonSwimming';
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons/faPersonHiking';
import { faBasketball } from '@fortawesome/free-solid-svg-icons/faBasketball';
import { faBaseball } from '@fortawesome/free-solid-svg-icons/faBaseball';
import { faPersonSkiingNordic } from '@fortawesome/free-solid-svg-icons/faPersonSkiingNordic';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons/faPlaneDeparture';
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons/faPlaneArrival';
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons/faTrainSubway';
import { faCar } from '@fortawesome/free-solid-svg-icons/faCar';
import { faTaxi } from '@fortawesome/free-solid-svg-icons/faTaxi';
import { faBus } from '@fortawesome/free-solid-svg-icons/faBus';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons/faPersonWalking';
import { faShip } from '@fortawesome/free-solid-svg-icons/faShip';
import { faFerry } from '@fortawesome/free-solid-svg-icons/faFerry';
import { faPlaneUp } from '@fortawesome/free-solid-svg-icons/faPlaneUp';
import { faHelicopter } from '@fortawesome/free-solid-svg-icons/faHelicopter';
import { faTruckPlane } from '@fortawesome/free-solid-svg-icons/faTruckPlane';
import { StackNavigatorParamList } from "../navigators/AppStack";
import { StackScreenProps } from "@react-navigation/stack";
import OptionList from '../components/OptionList';
import PreviousButton from '../components/PreviousButton';

import apis from '../services/apis';
import AppButton from '../components/AppButton';


export const PlanLocationScreen: FC<StackScreenProps<StackNavigatorParamList, "locationDetail">> =
    ({ route, navigation }) => {
        // console.log({ route })

        const userId = 5;
        const locationId = (route.params ?? {})['locationId'];
        const planAuthorId = (route.params ?? {})['planAuthorId'];
        const planId = (route.params ?? {})['planId'];

        const [version, setVersion] = useState(0);
        const [location, setLocation] = useState<any>([]);
        const [locationImg, setLocationImg] = useState([]);
        const [locationTitle, setLocationTitle] = useState('');
        const [locationAddress, setLocationAddress] = useState('');
        const [countryName, setCountryName] = useState('');
        const [areaName, setAreaName] = useState('');
        const [cityName, setCityName] = useState('');
        const [locationCategory, setLocationCategory] = useState('');
        const [locationStartTime, setLocationStartTime] = useState('');
        const [locationEndTime, setLocationEndTime] = useState('');
        const [transportation, setTransportation] = useState('');
        const [locationTel, setLocationTel] = useState('');
        const [locationNotes, setLocationNotes] = useState('');

        useEffect(() => {
            (async () => {
                const data = await apis.travelPlanDetail.getLocationDetail(locationId);
                setLocation(data);
                setLocationImg(data.locationImg.split("-"));
                setLocationTitle(data.locationName);
                setLocationAddress(data.address);
                setLocationCategory(data.category);
                setLocationStartTime(data.startTime);
                setLocationEndTime(data.endTime);
                setTransportation(data.transportation);
                setLocationTel(data.tel);
                setLocationNotes(data.notes);
                const countryId = data.countryId;
                const areaId = data?.areaId;
                const cityId = data?.cityId;

                const locationDetail = await apis.country.getOneCountry(countryId);
                setCountryName(locationDetail.chName);

                const areaDetail = await apis.country.getOneArea(areaId)
                setAreaName(areaDetail.chName);

                const cityDetail = await apis.country.getOneCity(cityId)
                setCityName(cityDetail.chName);
            })();
        }, [version]);

        //if user is author
        const optionButton = () => {
            if (userId == planAuthorId) {
                return (
                    <OptionList key={`option-list-${version}`}
                        callFrom={'editLocation'}
                        userId={userId}
                        navigation={navigation}
                        locationPlanId={locationId}
                        planAuthorId={planAuthorId}
                        optionsText={['編輯景點', '刪除景點']}
                        toWhere={'planDetail'}
                        travelPlanId={planId}
                        onUpdated={() => setVersion(version + 1)} />
                )
            }
        }

        return (
            <SafeAreaView style={{ flex: 1, position: 'relative' }}>
                <Image
                    source={{
                        uri: apis.travelPlanDetail.getLocationImg(locationImg)
                    }}
                    style={styles.locationImage}
                />

                <View style={styles.previousButton}>
                    <PreviousButton navigation={navigation} onUpdated={(route.params ?? {})["onUpdated"]} />
                </View>

                <View style={styles.optionList}>
                    {optionButton()}
                </View>

                <View style={styles.titleBar}>
                    <ViewCategory view={locationCategory} />
                    <Text style={styles.titleText}>{locationTitle}</Text>
                </View>

                <ScrollView style={{ flex: 1 }}>

                    <View style={styles.addressCountries}>
                        {/* <Text style={styles.text}></Text> */}
                        <Text numberOfLines={5} style={styles.addressText}>地址: {locationAddress !== 'null' ? locationAddress : '未有資訊'}</Text>
                    </View>

                    <View style={styles.countryCountries}>
                        <Text style={styles.countryText}>國家: {countryName}</Text>
                        <Text style={styles.countryText}>地區: {areaName}</Text>
                        <View style={{
                            ...styles.countryText,
                            display: cityName?.length > 0 ? "flex" : "none"
                        }}>
                            <Text style={styles.countryText}>城市: {cityName}</Text>
                        </View>
                    </View>

                    <View style={styles.timeCountries}>
                        <Text style={styles.timeText}>到逹時間: {locationStartTime}</Text>
                        <Text style={styles.timeText}>離開時間: {locationEndTime}</Text>
                    </View>

                    <View style={styles.transportationCountries}>
                        <Text style={styles.transportationText}>前往交通:
                            {transportation !== 'null' ? <Transportation transportation={transportation} /> : '未有資訊'}
                        </Text>
                    </View>

                    <View style={styles.telCountries}>
                        <Text style={styles.telText}>電話: {locationTel !== 'null' ? locationTel : '未有資訊'}</Text>
                    </View>

                    <View style={styles.notesCountrues}>
                        <Text style={styles.notesText}>備註:  {locationNotes !== 'null' ? locationNotes : '未有資訊'}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

const ViewCategory = ({ view }: any) => {
    switch (view) {
        case (view = 'view'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faMountainSun} color={"white"} size={28} />
                </View>
            )
            break;
        case (view = 'hotel'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faBed} color={"white"} size={28} />
                </View>
            )
            break;
        case (view = 'restaurant'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faUtensils} color={"white"} size={28} />
                </View>
            )
            break;
        case (view = 'shopping'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faBagShopping} color={"white"} size={28} />
                </View>
            )
            break;
        case (view = 'spa'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faHotTubPerson} color={"white"} size={28} />
                </View>
            )
            break;
        case (view = 'beach'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faUmbrellaBeach} color={"white"} size={28} />
                </View>
            )
            break;
        case (view = 'theater'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faMasksTheater} color={"white"} size={28} />
                </View>
            )
            break;
        case (view = 'airport'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faPlaneDeparture} color={"white"} size={28} />
                </View>
            )
            break;
        default:
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faMountainSun} color={"white"} size={28} />
                </View>
            )
            break;
    }
}

const Transportation = ({ transportation }: any) => {
    switch (transportation) {
        case (transportation = 'walking'):
            return (
                <FontAwesomeIcon icon={faPersonWalking} color={"#EE8732"} size={25} style={styles.transportationIcon} F />
            )
            break;
        case (transportation = 'bus'):
            return (
                <FontAwesomeIcon icon={faBus} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
        case (transportation = 'taxi'):
            return (
                <FontAwesomeIcon icon={faTaxi} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
        case (transportation = 'car'):
            return (
                <FontAwesomeIcon icon={faCar} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
        case (transportation = 'subway'):
            return (
                <FontAwesomeIcon icon={faTrainSubway} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
        case (transportation = 'ship'):
            return (
                <FontAwesomeIcon icon={faShip} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
        case (transportation = 'ferry'):
            return (
                <FontAwesomeIcon icon={faFerry} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
        case (transportation = 'airplane'):
            return (
                <FontAwesomeIcon icon={faPlaneUp} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
        case (transportation = 'helicopter'):
            return (
                <FontAwesomeIcon icon={faHelicopter} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
        default:
            return (
                <FontAwesomeIcon icon={faTruckPlane} color={"#EE8732"} size={25} style={styles.transportationIcon} />
            )
            break;
    }
}

const styles = StyleSheet.create({
    locationImage: {
        width: 500,
        height: 270,
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
    titleBar: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 480,
        height: 60,
        backgroundColor: "#EE8732",
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
    },
    viewIconSerction: {
        marginRight: -15,
    },
    viewIcon: {

    },
    titleText: {
        // borderWidth: 1,
        // borderColor: 'red',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 30,
        overflow: 'hidden',
        letterSpacing: 5,
    },
    addressCountries: {
        borderWidth: 1,
        borderColor: "#EE8732",
        borderRadius: 10,
        width: 370,
        minHeight: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        overflow: 'hidden',
        marginTop: 20,
    },
    addressText: {
        // borderWidth: 1,
        // borderColor: "#EE8732",
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        width: 340,
        textAlign: 'center',
        alignSelf: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        width: 40,
    },
    countryCountries: {
        borderWidth: 1,
        borderColor: "#EE8732",
        borderRadius: 10,
        width: 370,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        marginTop: 20,
    },
    countryText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        width: 340,
        textAlign: 'center',
        alignSelf: 'center',
    },
    timeCountries: {
        borderWidth: 1,
        borderColor: "#EE8732",
        borderRadius: 10,
        width: 370,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        marginTop: 20,
    },
    timeText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        width: 340,
        textAlign: 'center',
        alignSelf: 'center',
    },
    transportationCountries: {
        borderWidth: 1,
        borderColor: "#EE8732",
        borderRadius: 10,
        width: 370,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        marginTop: 20,
    },
    transportationText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        width: 340,
        textAlign: 'center',
        alignSelf: 'center',
    },
    transportationIcon: {
        borderWidth: 1,
        borderColor: "#EE8732",
        width: 30,
        height: 30,
        marginLeft: 15,
        marginTop: 10
    },
    telCountries: {
        borderWidth: 1,
        borderColor: "#EE8732",
        borderRadius: 10,
        width: 370,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        marginTop: 20,
    },
    telText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        width: 340,
        textAlign: 'center',
        alignSelf: 'center',
    },
    notesCountrues: {
        borderWidth: 1,
        borderColor: "#EE8732",
        borderRadius: 10,
        width: 370,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 20,
    },
    notesText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        width: 340,
        textAlign: 'center',
        alignSelf: 'center',
    },
})