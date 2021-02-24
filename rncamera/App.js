import React, { PureComponent } from 'react';
import { Alert, AppRegistry, StyleSheet, Text, Dimensions, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

const charwidth = Dimensions.get('window').width;
const charheight = Dimensions.get('window').height;


const bar = ({route}) => {
  const navigation = useNavigation()
  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode =>{
      if(barcode.data.length ==13){
        Alert.alert(barcode.data);
        route.params.rnw.postMessage(e.data);
        navigation.navigate('Home')
      }
    });
    
  };
  

  return (
    <View style={{flex:1, flexDirection:'column',backgroundColor:'black'}} >
      <View style={{width:charwidth,height:charheight, justifyContent:'center',alignItems:'center',}}>
      
      <RNCamera ratio={'2:3'}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      style={{
        height: charheight/7,
        width:charwidth/1.5,
        borderColor:'red',
        alignItems:'center',
        justifyContent:'center',
      }}
      zoom={1}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}
       > 
          <View style={{ width:charwidth/1.5, borderWidth:2, borderColor:'red'}}></View>
        
       </RNCamera>
       
       </View>
       
    </View >
  );
}

const HomeScreen = () => {
  const navigation = useNavigation()
  return (
      <View style={{width:charwidth,height:charheight}}>
          <TouchableOpacity style={{width:charwidth,height:charheight}}>
          <WebView
              ref={wv => { rnw = wv }}
              onMessage={(event) => {
                  rec = event.nativeEvent.data;
                  if(rec.length==5){
                      navigation.navigate('bar', { rnw: rnw });
                      Alert.alert("click")
                  }
                  else{
                      rnw.postMessage("app!");
                      Alert.alert("app!");
                  }
                  ;
              }}
              source={{ uri: 'http://ip0139.cafe24.com/' }}
          ></WebView>
          </TouchableOpacity>
          </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="bar" component={bar} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
export default App;