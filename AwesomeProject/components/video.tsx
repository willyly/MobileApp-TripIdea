import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import Video from 'react-native-video';


// const video = ["../assets/bgs/video.mp4"]

const BackgroundVideo: FunctionComponent<any> = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <Video source={require("../assets/bgs/video.mp4")}
                ref={(ref) => {
                    props.WelcomeVideo.player = ref
                }}
                onBuffer={props.WelcomeVideo.onBuffer}
                onError={props.WelcomeVideo.videoError}
                style={styles.backgroundVideo}
                repeat={true} //loop
                resizeMode={"cover"}
            />
        </View>
    )
}

export default BackgroundVideo

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});