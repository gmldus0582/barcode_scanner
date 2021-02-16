import React, { Component, useRef } from 'react';
import { View, Text, Button, Dimensions, Alert, RefreshControl } from 'react-native';

import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';


const charwidth = Dimensions.get('window').width;
const charheight = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}



function DetailsScreen() {
    const navigation = useNavigation()

    onSuccess = e => {
        Alert.alert(e.data)
        navigation.navigate('ListPage', { num: e.data })
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
var rnw;
var rec;
var list = []
const HomeScreen = () => {
    const navigation = useNavigation()


    return (
        <View style={{width:charwidth,height:charheight}}>
            <TouchableOpacity style={{width:charwidth,height:charheight}} onPress={() => {setTimeout(function (){ Alert.alert('asdasfas'),rnw.postMessage("app!")},300)}}>
            <WebView
                // style={{ }}
                ref={wv => { rnw = wv }}
                onMessage={(event) => {
                    rec = event.nativeEvent.data;
                    if(rec.length==1){
                        navigation.navigate('ListPage', { num: "안녕" });
                    }
                    else{
                        rnw.postMessage("app!");
                    }
                    ;
                }}
                source={{ uri: 'http://ip0139.cafe24.com/' }}
                
                
            ></WebView>
            </TouchableOpacity>
            </View>
    );
}


const ListPage = () => {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1).then(() => setRefreshing(false));
    }, []);


    const navigation = useNavigation()
    const route = useRoute()

    useEffect(() => {
        if (route.params.num == '안녕') {
        } else {
            list.push(route.params.num)
            console.log(list)
            onRefresh()
        }
    }, [route])

    const Push = () => {
        var pp = []
        for (var i = 0; i < list.length; i++) {
            pp.push(<Item key={i} num={list[i]}></Item>)
        }
        return pp
    }

    function delList(num) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] == num) {
                list.splice(i, 1);
                onRefresh()
                return
            }
        }
        console.log(list)
        onRefresh()
    }

    function alldel() {
        list = []
        onRefresh()
    }

    function send() {
        if(list.length==3){
            rnw.postMessage(list)
            navigation.navigate('Home')
        }
        else{
            Alert.alert("세개 모두 찍어주세요")
        }
        
        
    }

    function shift() {
        if (rec != '') {
            if (list.length < rec) {
                navigation.navigate('Details')
                return
            } else {
                Alert.alert("스캔 완료")
                return
            }
        }
    }

    useEffect(() => {
        shift()
    }, [])
    const Item = (prop) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ borderWidth: 0.5, width: charwidth - 60, height: 60 }}>
                    <Text>{prop.num}</Text>
                </View>
                <TouchableOpacity onPress={() => { delList(prop.num), onRefresh() }}>
                    <View style={{ width: 60, height: 60, backgroundColor: 'gray' }}>
                        <Text>삭제</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ width: charwidth, height: charheight }}>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>

                <Push new={route.params.num}></Push>
            </ScrollView>


            <TouchableOpacity onPress={() => send()}>
                <View style={{ width: charwidth, height: 60, backgroundColor: 'yellow', justifyContent:'center', alignItems:'center', bottom: 0 }}>
                    <Text style={{fontSize:20}}>완료</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alldel()}>
                <View style={{ width: charwidth, height: 60, backgroundColor: 'orange', justifyContent:'center', alignItems:'center', bottom: 0 }}>
                    <Text style={{fontSize:20}}>전체삭제</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => shift()}>
                <View style={{ width: charwidth, height: 60, backgroundColor: 'purple', justifyContent:'center', alignItems:'center', bottom: 0 }}>
                    <Text style={{fontSize:20}} >입력</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="ListPage" component={ListPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default App;