import React, { Component,useRef } from 'react';
import { View, Text, Button,Dimensions, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';



const charwidth = Dimensions.get('window').width;
const charheight= Dimensions.get('window').height;


const NewHome = () => {
  const navigation = useNavigation()

  return(
    <View>
      <TouchableOpacity onPress={navigation.navigate('Home',{bar:'안녕'})}>
      </TouchableOpacity>
      </View>
  )
}


const HomeScreen = ({route}) => {
  const navigation = useNavigation()

  useEffect(()=>{
    if(route.params.bar == '안녕'){
      Alert.alert('안녕')
    }else{
      Alert.alert(route.params.bar)
      this.rnwebview.postMessage(route.params.bar);
    }
     },[route])

  return (
        <WebView
        ref = {wv =>{this.rnwebview = wv}}
        onMessage={(event)=>navigation.navigate('Details',{wb:rnwebview})}
        source={{uri: 'http://ip0139.cafe24.com/'}}
        style={{marginTop: 20}}
         
      />

      
  );
}

function DetailsScreen({route}) {
  const navigation = useNavigation();
  onSuccess = e => {
    navigation.navigate('Home',{bar:e.data});
  };
  return (
    
    <QRCodeScanner
      // onSuccess={(event)=>{ Linking.openURL(event.data)}}
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
    />
    
  );
  
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="newhome" headerMode={'none'}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="newhome" component={NewHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;

