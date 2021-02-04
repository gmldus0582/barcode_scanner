import React, { Component } from 'react';
import { View, Text, Button,Dimensions, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';



const charwidth = Dimensions.get('window').width;
const charheight= Dimensions.get('window').height;

const HomeScreen = () => {
  const navigation = useNavigation()
  return (
        <WebView
        
        onMessage={(event)=>navigation.navigate('Details')}
        source={{uri: 'http://ip0139.cafe24.com/'}}
        style={{marginTop: 20}}
         
      />
  );
}

function DetailsScreen() {
  onSuccess = e => {
    console.log(e)
  }
  return (
    
    <QRCodeScanner
      onRead={this.onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
    />
    
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;

