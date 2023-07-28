import React from 'react';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
// import LottieView = require('lottie-react-native'); // otherwise you have "esModuleInterop": false

export default class BasicExample extends React.PureComponent {
    render() {
        return (
            <LottieView
                source={require('../assets/83407-done.json')}
                autoPlay
                loop
            />
        );
    }
}