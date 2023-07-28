/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import Config from "react-native-config";
import React, { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store';

import { AppNavigator } from './navigators/AppNavigator';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';


export default function App() {

  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AppNavigator />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </ReduxProvider>
  )
}


// useEffect(() => {
//   fetch('http://localhost:3000/users')
//     .then(resp => resp.json())
//     .then(res => {
//       // console.log('data', data)
//       setData(res)
//     })
//     .catch(err => {
//       console.log(err);
//     })
// }, [])

// const [data, setData] = useState([])

{/* {data.map((user: any) => (
        <SafeAreaView>
          <Text>{user.email}</Text>
          <Text>{user.password}</Text>
        </SafeAreaView>
      ))
      } */}




{/* <NavigationContainer>
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Profile" component={UserProfile} />
  </Stack.Navigator>
</NavigationContainer > */}


