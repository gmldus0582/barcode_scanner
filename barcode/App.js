import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';


onSuccess = e => {
  Linking.openURL(e.data).catch(err =>
    console.error('An error occured', err)
  );
  }
  const HomeScreen = () => {
    const navigation = useNavigation()
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Seonoh Home Screen</Text>
        <Button
          title='Go detail screen'
          onPress={() => navigation.navigate('Details')} />
      </View>
    );
  }

  const DetailsScreen = () => {
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }



  export default App;

   