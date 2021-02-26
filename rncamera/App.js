import React, { useState } from 'react';
import { Alert, Dimensions, View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';
// import { useNavigation } from '@react-navigation/native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

const charwidth = Dimensions.get('window').width;
const charheight = Dimensions.get('window').height;


// const bar = ({ route }) => {
//   const navigation = useNavigation()
// onRead = e => {
//     route.params.rnw.postMessage(e.data);
//     navigation.navigate('Home')

// };



//   return (
//     <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }} >
//       <View style={{ width: charwidth, height: charheight, justifyContent: 'center', alignItems: 'center', }}>
//         <Text>스캔해주세요!</Text>
// <RNCamera ratio={'1:1'}
//   style={{
//     height: charheight / 7,
//     width: charwidth / 1.5,
//     alignItems:'center',
//     justifyContent:'center'
//   }}
//   zoom={0.8}
//   onBarCodeRead={this.onRead}
// >
//   <View style={{ width: charwidth / 1.5, borderWidth: 2, borderColor: 'red'}}></View>

// </RNCamera>

//       </View>

//     </View >
//   );
// }
var rnw;

const HomeScreen = () => {
  onRead = e => {
    rnw.postMessage(e.data);
    setModalVisible(false);

  };
  const [modalVisible, setModalVisible] = useState(false);
  return (

    <View style={{ width: charwidth, height: charheight, justifyContent: 'center', alignItems: 'center', }}>

      <WebView
        style={{ width: charwidth, height: charheight, }}
        ref={wv => { rnw = wv }}
        source={{ uri: 'http://ip0139.cafe24.com/' }}
        onMessage={(event) => {
          setModalVisible(true);
        }}
      ></WebView>
      <Modal visible={modalVisible} style={{ width: charwidth, height: charheight, justifyContent: 'center', alignItems: 'center', }} >
        <RNCamera 
          style={{
            height: charheight / 7,
            width: charwidth / 1.5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onBarCodeRead={this.onRead}
        >
          <View style={{ width: charwidth / 1.5, borderWidth: 2, borderColor: 'red' }}></View>

        </RNCamera>
      </Modal>
    </View>
  );
}

export default HomeScreen;