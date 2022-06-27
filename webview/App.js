import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import QRCodeScanner from 'react-native-qrcode-scanner';

var rnw;
const charwidth = Dimensions.get('window').width;
const charheight = Dimensions.get('window').height;

const HomeScreen = () => {
    onSuccess = e => {
        rnw.postMessage(e.data);
        setModalVisible(false);
    };
    const [modalVisible, setModalVisible] = useState(false);
    handleBackPress = () => {
        setModalVisible(false);
        return true;
    }
    return (
        <View style={{ width: charwidth, height: charheight, }}>
            <WebView
                style={{ width: charwidth, height: charheight, }}
                ref={wv => { rnw = wv }}
                source={{ uri: 'MES 웹' }}
                onMessage={(event) => {
                    setModalVisible(true);
                }}
            />
            <Modal visible={modalVisible}>

                <QRCodeScanner
                    onRead={onSuccess}
                    showMarker={true}
                    customMarker={
                        <View style={{ width: charwidth / 1.2, borderColor: 'red', borderWidth: 3, }} />
                    }
                    
                />
             
        </Modal>
        </View>

    );
}


export default HomeScreen;
