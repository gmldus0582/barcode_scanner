import React from 'react';
import { Alert, Dimensions, View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

const charwidth = Dimensions.get('window').width;
const charheight = Dimensions.get('window').height;


const bar = ({ route }) => {
  const navigation = useNavigation()
  var data = new Array();
  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => {
      data = barcode.data.split("");
      if (data[0] == 'w' || data[0] == 'W') {
        //Alert.alert(barcode.data);
        route.params.rnw.postMessage(barcode.data);
        navigation.navigate('Home')
      }
      else if (data[0] == 'A' || data[0] == 'a') {
        //Alert.alert(barcode.data);
        route.params.rnw.postMessage(barcode.data);
        navigation.navigate('Home')
      }
      else {
        for (var i = 0; i <= 9; i++) {
          if (Number(data[0]) == i) {
            //Alert.alert(barcode.data);
            route.params.rnw.postMessage(barcode.data);
            navigation.navigate('Home')
          }
        }
      }

    });

  };


  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }} >
      <View style={{ width: charwidth, height: charheight, justifyContent: 'center', alignItems: 'center', }}>
        <Text>스캔해주세요!</Text>
        <RNCamera ratio={'2:3'}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          style={{
            height: charheight / 7,
            width: charwidth / 1.5,
            borderColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          zoom={0.8}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}
        >
          <View style={{ width: charwidth / 1.5, borderWidth: 2, borderColor: 'red' }}></View>

        </RNCamera>

      </View>

    </View >
  );
}
var rnw;
var rec;
const HomeScreen = () => {
  const navigation = useNavigation()
  
  return (
    <View style={{ width: charwidth, height: charheight }}>
      
      <WebView
        ref={wv => { rnw = wv }}
        onMessage={(event) => {
          rec = event.nativeEvent.data;
          if (rec.length == 5) {
            navigation.navigate('bar', { rnw: rnw });
          }
          else {
            rnw.postMessage("app!");
            Alert.alert("app!");
          }
          ;
        }}
        source={{ uri: 'http://ip0139.cafe24.com/' }}
      ></WebView>
   
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