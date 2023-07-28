import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Divider, Actionsheet, useDisclose, Center, Button, Box } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import Alert from './Alert';
import apis from '../services/apis';

const OptionList = ({
    callFrom,
    userId,
    onUpdated,
    navigation,
    optionsText,
    travelPlanId,
    locationPlanId,
    toWhere,
    planAuthorId,
}: any) => {
    // console.log('optionList travelPlanId', travelPlanId)
    const [visible, setVisible] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleList = () => {
        setVisible(true)
        if (visible) {
            setVisible(false)
        }
    }

    const callFromWhere = (deleteText: string, toWhere: string) => {
        switch (callFrom) {
            case (callFrom = 'editPlan'):
                const startPlanSetTimeout = () => {
                    setIsAlert(true);
                    setTimeout(async () => {
                        setIsAlert(false);
                        apis.travelPlans.deletePlan(travelPlanId)
                        if (callFrom = 'editPlan')
                            navigation.navigate(toWhere)
                        onUpdated && onUpdated();
                    }, 2000);
                };
                return (
                    <TouchableOpacity style={styles.options} onPress={startPlanSetTimeout}>
                        <Text style={styles.optionsText}>{deleteText}</Text>
                    </TouchableOpacity>
                )
                break;
            case (callFrom = 'editLocation'):
                const startLocationSetTimeout = () => {
                    console.log('??????????????????????????????????????????????????????????????????')
                    setIsAlert(true);
                    setTimeout(async () => {
                        setIsAlert(false);
                        apis.travelPlanDetail.deleteDetail(locationPlanId)
                        navigation.navigate(toWhere, travelPlanId)
                        onUpdated && onUpdated();
                    }, 2000)
                };
                return (
                    <TouchableOpacity style={styles.options} onPress={startLocationSetTimeout}>
                        <Text style={styles.optionsText}>{deleteText}</Text>
                    </TouchableOpacity>
                )
                break;
        }
    }




    const option = () => {
        let editText = optionsText[0];
        let deleteText = optionsText[1];

        switch (true) {
            case (userId == planAuthorId):
                return (
                    <View>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('createPlan', { onUpdated, travelPlanId: travelPlanId }) }}
                            style={[styles.options, {
                                borderBottomWidth: 2,
                                borderBottomColor: '#EE8732',
                            }]} >
                            <Text style={styles.optionsText}>{editText}</Text>
                        </TouchableOpacity>

                        <View>{callFromWhere(deleteText, toWhere)}</View>

                        <View>
                            {isAlert && <View style={[styles.alert, styles.elevation]}>
                                <Image
                                    source={require('../assets/done.gif')}
                                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                                />
                                <Text style={styles.alertText}>刪除成功</Text>
                            </View>
                            }
                        </View>
                    </View>
                )
                break;
        }
    }

    return (
        <View style={{ position: 'relative' }}>
            <View>
                <TouchableOpacity style={styles.buttonSection}
                    onPress={handleList}>
                    <View style={styles.barIcon}>
                        <FontAwesomeIcon icon={faBars} size={32} color={"white"} />
                    </View>
                </TouchableOpacity>
            </View>

            {visible && <View style={[styles.optionContainer, styles.elevation]}>
                <View style={styles.optionHeader}>
                    <Text style={styles.optionHeaderText}>請選擇</Text>
                </View>
                <View>{option()}</View>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonSection: {
        width: 45,
        height: 45,
        backgroundColor: '#EE8732',
        borderRadius: 5,
    },
    barIcon: {
        width: 34,
        height: 34,
        margin: 6,
    },
    optionContainer: {
        position: 'absolute',
        top: 400,
        right: 65,
        width: 300,
        minHeight: 60,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    optionHeader: {
        width: 300,
        height: 55,
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#EE8732',
    },
    optionHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#757575",
        textAlign: 'center',
        marginTop: 10,
    },
    options: {
        width: 300,
        height: 50,
        alignSelf: 'center',
    },
    optionsText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#757575",
        textAlign: 'center',
        marginTop: 10,
    },
    elevation: {
        shadowColor: '#000',
        elevation: 10,
    },
    alert: {
        width: 300,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    alertText: {
        alignSelf: 'center',
        marginBottom: 25,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#EE8732",
    },
})

export default OptionList
