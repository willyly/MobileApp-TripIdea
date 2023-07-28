import React, { useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Animated } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus'



const CreateButton = ({ navigation }: any) => {
    const [animationCompleted, setAnimationCompleted] = useState(true);
    const [rotate, setRotate] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        setRotate(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setRotate(false);
            setAnimationCompleted(true);
            animation.setValue(0);
        });
    };

    const rotateInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const onPressOutFunction = () => {
        if (animationCompleted) {
            navigation.navigate("createPlan");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPressIn={() => { startAnimation() }}
                disabled={rotate}
                onPressOut={onPressOutFunction}
            >
                <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
                    <Text style={{ backgroundColor: 'white', borderRadius: 50 }}><FontAwesomeIcon icon={faCirclePlus} color={"#EE8732"} size={80} /></Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        elevation: 12,
        shadowColor: "#000",
        borderRadius: 50,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
    },
});

export default CreateButton