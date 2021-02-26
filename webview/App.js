import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import { useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';


var rnw;
const charwidth = Dimensions.get('window').width;
const charheight = Dimensions.get('window').height;
// function NewBarcode({ route }) {
//     const navigation = useNavigation()
//     onSuccess = e => {
//         route.params.rnw.postMessage(e.data);
//         navigation.navigate('Home')

//     };
//     return (
//         <QRCodeScanner
//             onRead={onSuccess}
//             // showMarker={true}
//             // customMarker={
//             //     <View style={{width:charwidth/1.2, borderColor:'red', borderWidth:3, }}>

//             //     </View>
//             // }
//         />
//     );
// }



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
                source={{ uri: 'http://ip0139.cafe24.com/' }}
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

//const Stack = createStackNavigator();

// const App = () => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
//                 <Stack.Screen name="Home" component={HomeScreen} />
//                 <Stack.Screen name="new" component={NewBarcode} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }


export default HomeScreen;
