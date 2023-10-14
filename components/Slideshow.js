import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

export default function SlideShow() {
  return (
    <View style={styles.container}>
      <Swiper loop={false} showsButtons={false}>
        <View style={styles.slideView}>
          <View style={styles.InnerRect}>
            <Text style={styles.MissionText}>Our Mission</Text>
            <View style={styles.line}></View>
            <Text style={styles.descText}>Many people go through uncomfortable experiences without ever sharing them.</Text>
            <Image style={styles.image} source={require("../assets/talking.png")} />
            <Text style={styles.descText}>Our mission is to give these individuals a voice through our app to share their experiences.</Text>
          </View>
        </View>

        <View style={styles.slideView}>
          <View style={styles.InnerRect}>
            <Text style={styles.MissionText}>The Problem</Text>
            <View style={styles.line}></View>
            <Text style={styles.descText}>54.4% of all crimes were unreported in America last year!</Text>
            <Image style={styles.image} source={require("../assets/WarningSign.png")} />
            <Text style={styles.descText}>There are no platforms to viably report your unsafe encoutners.</Text>
          </View>
        </View>

        <View style={styles.slideView}>
          <View style={styles.InnerRect}>
            <Text style={styles.MissionText}>How the App Works</Text>
            <View style={styles.line}></View>
            <Text style={styles.descText}>Users can report unsafe encounters through our report page.</Text>
            <Image style={styles.image} source={require("../assets/Ai.png")} />
            <Text style={styles.descText}>Large Language AI models grade the severity of these reports and use it to create AI geographic heat maps.</Text>
          </View>
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InnerRect: {
    flex: 0.89,
    width: '85%',
    backgroundColor: "#00B1D8",
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  MissionText: {
    fontSize: 32,
    marginTop: 20,
    fontWeight: '600',
    color: 'white',
  },
  line: {
    width: '85%',
    backgroundColor: "#50D1ED",
    height: 5,
    marginTop: 14,
  },
  descText: {
    fontSize: 20,
    color: 'white',
    width: '70%',
    textAlign: 'center',
    marginTop: 14,
  },
  image: {
    resizeMode: 'contain',
    marginTop: 10,
    flex: 0.7,
  },
});
