import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AppButton from './AppButton'

import apis from '../services/apis';

const Alert = ({ callFrom, submit, hasErrors, haveStartDate, haveEndDate, haveStartTime, haveEndTime, successfulText, errorText, travelPlanId }: any) => {
    // console.log('alert callFrom', callFrom)
    const [isAlert, setIsAlert] = useState(false);
    const [isError, setIsError] = useState(false);

    const actionButton = () => {
        switch (callFrom) {
            case (callFrom = 'planForm'):
                const startSetTimeout = () => {
                    console.log({ hasErrors, haveStartDate, haveEndDate })
                    if (hasErrors == false && haveStartDate == true && haveEndDate == true) {
                        setIsAlert(true);
                        setTimeout(async () => {
                            setIsAlert(false);
                            await submit()
                        }, 2000);
                    } else {
                        setIsError(true);
                        setTimeout(() => {
                            setIsError(false);
                        }, 2000);
                    }
                };
                return (
                    <View>
                        <AppButton text={'提交'} onPress={startSetTimeout} />
                    </View>
                )
                break;
            case (callFrom = 'patchPlanForm'):
                const patchSetTimeout = () => {
                    console.log({ hasErrors, haveStartDate, haveEndDate })
                    // if (hasErrors == false && haveStartDate == true && haveEndDate == true) {
                    setIsAlert(true);
                    setTimeout(async () => {
                        setIsAlert(false);
                        await submit()
                    }, 2000);
                    // } else {
                    //     setIsError(true);
                    //     setTimeout(() => {
                    //         setIsError(false);
                    //     }, 2000);
                    // }
                };
                return (
                    <View>
                        <AppButton text={'提交'} onPress={patchSetTimeout} />
                    </View>
                )
            case (callFrom = 'detailForm'):
                const detailSetTimeout = () => {
                    console.log({ hasErrors, haveStartTime, haveEndTime })
                    if (hasErrors == false && haveStartTime == true && haveEndTime == true) {
                        setIsAlert(true);
                        setTimeout(async () => {
                            setIsAlert(false);
                            await submit()
                        }, 2000);
                    } else {
                        setIsError(true);
                        setTimeout(() => {
                            setIsError(false);
                        }, 2000);
                    }
                };
                return (
                    <View>
                        <AppButton text={'提交'} onPress={detailSetTimeout} />
                    </View>
                )
                break;
            default:
                <View style={[styles.errorAlert, styles.elevation]}>
                    <Image
                        source={require('../assets/error.gif')}
                        style={{ width: 140, height: 140, marginTop: 30, alignSelf: 'center' }}
                    />
                    <Text style={styles.errorText}>{errorText}</Text>
                </View>
                break;
        }
    }



    return (
        <View style={{ position: 'relative' }}>
            <View>
                {actionButton()}
            </View>

            <View>
                {isAlert && <View style={[styles.alert, styles.elevation]}>
                    <Image
                        source={require('../assets/done.gif')}
                        style={{ width: 200, height: 200, alignSelf: 'center' }}
                    />
                    <Text style={styles.alertText}>{successfulText}</Text>
                </View>
                }

                {isError && <View style={[styles.errorAlert, styles.elevation]}>
                    <Image
                        source={require('../assets/error.gif')}
                        style={{ width: 140, height: 140, marginTop: 30, alignSelf: 'center' }}
                    />
                    <Text style={styles.errorText}>{errorText}</Text>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    alert: {
        width: 300,
        position: 'absolute',
        bottom: 230,
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
    errorAlert: {
        width: 300,
        height: 260,
        position: 'absolute',
        bottom: 230,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    errorText: {
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#ff6347",
    },
    elevation: {
        shadowColor: '#000',
        elevation: 10,
    },
});

export default Alert