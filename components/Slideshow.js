import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    SafeAreaView, 
    Dimensions,
    Image,
    TextInput,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default function SlideShow(){

    return (
        <View>
          <Swiper loop={false} showsButtons={false}>
            <View style={styles.slideView}>
                <View style={styles.InnerRect}>
                  <Text style={styles.MissionText}>Our Mission</Text>
                  <View style={styles.line}></View>
                  <Text style={styles.descText}>Many people go through uncomfortable experiences without ever sharing them. </Text>
                  <Image style={styles.image} source={require("../assets/talking.png")} />
                <Text style={styles.descText}>Our mission is to give these individuals a voice through our app 
                    to share their experiences.</Text>
                </View>
            </View>
                
          </Swiper>
          </View>
    )
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        marginTop: 10,  // Reduce the margin to 5 units
        flex: 0.7,
      },
    descText:{
        fontSize: 20,
        color: 'white',
        width: Dimensions.get('window').width * 0.7,
        textAlign: 'center',
        marginTop: 14
    },
    line:{
        width: Dimensions.get('window').width * 0.7,
        backgroundColor: "#50D1ED",
        height: 5,
        marginTop: 14
    },  
    MissionText:{
        fontSize: 32,
        marginTop: 20,
        fontWeight: '600',
        color: 'white'
    },
      InnerRect:{
        flex: 0.89,
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: "#00B1D8",
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10
      },  
    
      slideView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    
      },  


})
