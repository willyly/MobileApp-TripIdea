import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
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

import { z } from "zod";
import RNLocalize from "react-native-localize";
import AppButton from "./AppButton";

import apis from '../services/apis';

const Location = ({ location, navigation, planAuthorId, planId, day }: any) => {
    // console.log('13 plan', location)
    const category = location.category;
    const transportation = location.transportation;
    const startTime = location.startTime;
    const endTime = location.endTime;

    const haveAddress = () => {
        if (location.address != 'null') {
            const address = location.address;
            return (
                <Text style={styles.locationAddressText}>
                    <Text style={{ fontWeight: 'bold' }}>地址: </Text>
                    {address}
                </Text>
            )
        }
    }

    const haveNotes = () => {
        if (location.notes != "null") {
            const notes = location.notes;
            return (
                <Text style={styles.locationNotesText}>
                    <Text style={{ fontWeight: 'bold' }}>備註: </Text>
                    {notes}
                </Text>
            )
        }
    }
    // console.log('transportation', transportation)

    const locationImg = location.locationImg.split("-");

    const cardContainer = () => {
        return (
            <View style={styles.locationContainer}>
                <View style={styles.leftBar}>
                    <View style={[styles.bigDot, { margin: 8 }]}></View>
                    <View style={[styles.smallDot, { margin: 23 }]}></View>

                    <ViewCategory view={category} />

                    <View style={[styles.smallDot, { margin: 28 }]}></View>
                </View>
                <View style={styles.arriveTimeContainer}>
                    <Text style={styles.arriveTime}>{startTime}到達</Text>
                    <Transportation transportation={transportation} />
                </View>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => { navigation.navigate("locationDetail", { locationId: location.id, planAuthorId, planId }) }}>
                    <View style={styles.locationCard}>
                        {/* <View style={[styles.locationCard, styles.elevation]}> */}
                        <Image
                            source={{
                                uri: apis.travelPlanDetail.getLocationImg(locationImg),
                            }}
                            style={styles.locationImage}
                        />

                        <View style={styles.locationTextContainer}>
                            <Text style={styles.locationNameText} numberOfLines={3} >{location.locationName}</Text>
                            <Text style={styles.locationLeaveText}>{endTime}離開</Text>
                            <View>{haveAddress()}</View>
                            <View>{haveNotes()}</View>
                        </View>
                    </View>
                </TouchableOpacity >
            </View >
        )
    }

    return (
        <View>
            {cardContainer()}
        </View>
    );
}

const ViewCategory = ({ view }: any) => {
    switch (view) {
        case (view = 'view'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faMountainSun} color={"white"} size={17} />
                </View>
            )
            break;
        case (view = 'hotel'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faBed} color={"white"} size={17} />
                </View>
            )
            break;
        case (view = 'restaurant'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faUtensils} color={"white"} size={17} />
                </View>
            )
            break;
        case (view = 'shopping'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faBagShopping} color={"white"} size={17} />
                </View>
            )
            break;
        case (view = 'spa'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faHotTubPerson} color={"white"} size={17} />
                </View>
            )
            break;
        case (view = 'beach'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faUmbrellaBeach} color={"white"} size={17} />
                </View>
            )
            break;
        case (view = 'theater'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faMasksTheater} color={"white"} size={17} />
                </View>
            )
            break;
        case (view = 'airport'):
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faPlaneDeparture} color={"white"} size={17} />
                </View>
            )
            break;
        default:
            return (
                <View style={styles.viewIconSerction}>
                    <FontAwesomeIcon style={styles.viewIcon} icon={faMountainSun} color={"white"} size={17} />
                </View>
            )
            break;
    }
}

const Transportation = ({ transportation }: any) => {
    switch (transportation) {
        case (transportation = 'walking'):
            return (
                <FontAwesomeIcon icon={faPersonWalking} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        case (transportation = 'bus'):
            return (
                <FontAwesomeIcon icon={faBus} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        case (transportation = 'taxi'):
            return (
                <FontAwesomeIcon icon={faTaxi} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        case (transportation = 'car'):
            return (
                <FontAwesomeIcon icon={faCar} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        case (transportation = 'subway'):
            return (
                <FontAwesomeIcon icon={faTrainSubway} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        case (transportation = 'ship'):
            return (
                <FontAwesomeIcon icon={faShip} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        case (transportation = 'ferry'):
            return (
                <FontAwesomeIcon icon={faFerry} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        case (transportation = 'airplane'):
            return (
                <FontAwesomeIcon icon={faPlaneUp} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        case (transportation = 'helicopter'):
            return (
                <FontAwesomeIcon icon={faHelicopter} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
        default:
            return (
                <FontAwesomeIcon icon={faTruckPlane} color={"#EE8732"} size={19} style={{ marginLeft: 5, marginTop: 2 }} />
            )
            break;
    }
}

const Cards = ({ locations, navigation, planAuthorId, planId, day }: any) => {
    return (
        <View>
            {
                (locations as []).map((location, i) => (
                    <Location key={i} location={location} navigation={navigation} planAuthorId={planAuthorId} planId={planId} day={day} />
                ))
            }
        </View>
    );
};

const TravelPlanDetailCard = ({ navigation, planId, planAuthorId, day, userId }: any) => {
    // console.log('location card planId', planId)
    // console.log('location card day', day)
    const [plans, setPlans] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const data = await apis.travelPlanDetail.getDayDetail(planId, day);
            setPlans(data);
        })();
    }, []);

    const haveResult = () => {
        try {
            if (plans.travelPlanDetail.length > 0) {
                return (<Cards locations={plans.travelPlanDetail}
                    day={day}
                    userId={userId}
                    planAuthorId={planAuthorId}
                    planId={planId}
                    navigation={navigation} />)
            }
        } catch (e) {
            // console.log('from travelPlanDetailCard', e);
            <View>
                <Text style={styles.nullResultTab}>未有景點</Text>
            </View>
        }
    }

    return (
        <View>{haveResult()}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    locationContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
        position: 'relative',
        width: 467,
        height: 160,
        marginTop: 10,
    },
    leftBar: {
        // borderWidth: 1,
        // borderColor: 'blue',
        width: 40,
        height: 170,
        marginLeft: 6,
    },
    viewIconSerction: {
        width: 33,
        height: 33,
        marginTop: 3,
        backgroundColor: '#EE8732',
        borderRadius: 20,
        alignSelf: 'center',
    },
    viewIcon: {
        width: 35,
        height: 35,
        marginTop: 7,
        marginLeft: 8,
    },
    bigDot: {
        width: 8,
        height: 8,
        backgroundColor: '#c3c3c3',
        borderRadius: 5,
        alignSelf: 'center',
    },
    smallDot: {
        width: 6,
        height: 6,
        backgroundColor: '#EE8732',
        borderRadius: 3,
        alignSelf: 'center',
    },
    arriveTimeContainer: {
        // borderWidth: 1,
        // borderColor: 'yellow',
        position: 'absolute',
        top: 5,
        width: 410,
        right: 7,
        paddingLeft: 5,
        flexDirection: 'row',
    },
    arriveTime: {
        letterSpacing: 2,
        fontWeight: 'bold',
        color: "#757575",
    },
    touchableStyle: {
        // borderWidth: 1,
        // borderColor: 'orange',
        elevation: 10,
        shadowColor: '#000',
        position: 'absolute',
        bottom: 8,
        right: 7,
        width: 410,
        height: 117,
        borderRadius: 20,
    },
    locationCard: {
        // borderWidth: 1,
        // borderColor: 'green',
        backgroundColor: 'white',
        width: 410,
        height: 117,
        borderRadius: 10,
    },
    elevation: {
        shadowColor: '#000',
        elevation: 10,
    },
    locationImage: {
        position: 'absolute',
        left: 0,
        width: 200,
        height: 117,
        // borderRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    locationTextContainer: {
        position: 'absolute',
        right: 4,
        width: 205,
        height: 95,
        top: 10,
        paddingLeft: 7,
        overflow: 'hidden',
    },
    locationNameText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        letterSpacing: 2,
    },
    locationLeaveText: {
        marginTop: 5,
        fontWeight: 'bold',
        color: "#757575",
        letterSpacing: 2,
    },
    locationAddressText: {
        // borderWidth: 1,
        // borderColor: 'green',
        width: 195,
        height: 40,
        marginTop: 5,
        fontSize: 13,
        color: "#757575",
        overflow: 'hidden',
    },
    locationNotesText: {
        // borderWidth: 1,
        // borderColor: 'green',
        width: 195,
        height: 40,
        marginTop: 5,
        fontSize: 13,
        color: "#757575",
        overflow: 'hidden',
    },
    authorLikeSection: {
        position: 'absolute',
        bottom: 50,
        width: 400,
        margin: 10,
        flexDirection: 'row',
    },
    likeCount: {
        color: "white",
        letterSpacing: 3,
    },
    authorName: {
        paddingRight: 15,
        color: "white",
        letterSpacing: 3,
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

export default TravelPlanDetailCard