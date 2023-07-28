import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { en, registerTranslation, useFormState, Form } from 'react-native-use-form'
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

const SearchInputCom = ({ defaultValue, setSearchRequest, refresh }: any) => {
    const [visible, setVisible] = useState(false)

    registerTranslation('en', en)

    const [
        { submit, formProps, values, setValues },
        { name },
    ] = useFormState(
        {
            name: defaultValue,
        },
        {
            locale: 'en',
            onSubmit: async (submittedValues) => {
                setSearchRequest(submittedValues.name);
                setVisible(true);
            }
        });

    const handleCancelButton = () => {
        refresh();
    }

    return (
        <View style={styles.container} >
            <Form {...formProps}>
                <InputWithError
                    // defaultValue={defaultValue}
                    mode="outlined"
                    {...name('name', {
                        required: false,
                        minLength: 0,
                        maxLength: 50,
                        label: "請輸入想查詢的資料"
                    })}
                />

                <View style={styles.cancelButtonSection}>
                    {visible && <TouchableOpacity style={styles.cancelButton} onPress={handleCancelButton}>
                        <Text style={styles.cancelIcon}>
                            {<FontAwesomeIcon icon={faXmark} color={"white"} size={32} style={{ height: 50 }} />}
                        </Text>
                    </TouchableOpacity>}
                </View>

                <TouchableOpacity style={styles.searchButton} onPress={() => { submit() }}>
                    <Text style={styles.searchIcon}>
                        {<FontAwesomeIcon icon={faMagnifyingGlass} color={"white"} size={32} />}
                    </Text>
                </TouchableOpacity>
            </Form>
        </View>
    )

}

function InputWithError({ value, ...rest }:
    React.ComponentProps<typeof TextInput>) {

    // const clear = value
    // console.log('value', value)
    return (
        <View style={styles.iosInput}>
            {/* <View style={styles.androidInput}> */}
            <TextInput {...rest}

                // clearButtonMode="always"
                // defaultValue={rest.defaultValue}
                outlineColor="#EE8732"
                activeOutlineColor="#EE8732"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: 'red',
        position: 'relative',
        alignSelf: 'center',
        marginTop: 10,
        width: 440,
        height: 70,
    },
    androidInput: {
        width: 380,
    },
    iosInput: {
        width: 350,
    },
    searchButton: {
        position: 'absolute',
        top: 6,
        right: 0,
        width: 48,
        height: 50,
        backgroundColor: '#EE8732',
        borderRadius: 5,
    },
    searchIcon: {
        position: 'absolute',
        top: 8,
        left: 8,
    },
    cancelButtonSection: {
        position: 'absolute',
        top: 13,
        right: 67,
    },
    cancelButton: {
        width: 33,
        height: 35,
        backgroundColor: '#EE8732',
        borderRadius: 5,
    },
    cancelIcon: {
        position: 'absolute',
        top: 2,
        left: 1,
    }
})

export default SearchInputCom

