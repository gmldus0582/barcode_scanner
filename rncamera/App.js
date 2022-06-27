import React, { useState } from 'react';
import { Alert, Dimensions, View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { WebView } from 'react-native-webview';

const charwidth = Dimensions.get('window').width;
const charheight = Dimensions.get('window').height;
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
        source={{ uri: 'MES 웹' }}
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
