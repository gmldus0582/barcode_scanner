import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



var rnw;
const charwidth = Dimensions.get('window').width;
const charheight = Dimensions.get('window').height;
function NewBarcode({ route }) {
    const navigation = useNavigation()
    onSuccess = e => {
        route.params.rnw.postMessage(e.data);
        navigation.navigate('Home')

    };
    return (
        <QRCodeScanner
            onRead={onSuccess}
            
        />
    );
}



const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <WebView
            ref={wv => { rnw = wv }}
            source={{ uri: 'http://ip0139.cafe24.com/' }}
            onMessage={(event) => {
                navigation.navigate('new', { rnw: rnw });
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
