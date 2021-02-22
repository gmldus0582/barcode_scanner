/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Text,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



var rnw;
var rec;

function NewBarcode({ route }) {
    const navigation = useNavigation()
    //Alert.alert('new')
    onSuccess = e => {
        //Alert.alert(e.data)
        route.params.rnw.postMessage(e.data);
        navigation.navigate('Home')

    };
  return (
      <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch}
          showMarker={true}
          customMarker={
              <View style={styles.case}>
                  <View style={styles.caseIn} />
              </View>
          }
      />
  );
}

const styles = StyleSheet.create({
  case: {
      width: "70%",
      height: "40%",
      borderColor: 'green',
      borderWidth: 5,
      justifyContent: "center",
      alignItems: "center"
  },
  caseIn: {
      width: "90%",
      height: "3%",
      marginBottom: 30,
      marginTop: 30,
      backgroundColor: '#FF0000',
      justifyContent: "center",
      alignItems: "center"
  },
});


const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <WebView
            ref={wv => { rnw = wv }}
            source={{ uri: 'http://ip0139.cafe24.com/' }}
            onMessage={(event) => {
                rec = event.nativeEvent.data;
                if (rec.length == 5) {
                    navigation.navigate('new', { rnw: rnw });
                    //Alert.alert("click")
                }
                if(rec.length ==3){
                    navigation.navigate('new', { rnw: rnw });
                    //Alert.alert("second")
                }
                ;
            }}
        />
     
  
  );
}

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="new" component={NewBarcode} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default App;
