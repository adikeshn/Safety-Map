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
import { auth } from '../FirebaseHandler';
import SlideShow from '../components/Slideshow';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  signOut = () => {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  report = () => {
    this.props.navigation.navigate("Report");
  }

  heatmap = () => {
    this.props.navigation.navigate("HeatMap");
  }


  render() {
    return (
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Image style={styles.image} source={require("../assets/logo.png")} />
            <View style={styles.innerText}>
              <Text style={styles.t2}>SafeZone</Text>
              <Text style={styles.t}>Empowering Voices, Promoting Safety</Text>
            </View>

          </View>


          <View style={styles.swiperView}>
            <SlideShow />
          </View>


          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.halfSizeButton} onPress={() => { this.heatmap(); }}>
                <Text style={styles.buttonText}>Heat Map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.halfSizeButton} onPress={() => { this.report(); }}>
                <Text style={styles.buttonText}>Report</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.loginBtn} onPress={() => {
                this.signOut();
              }}>
                <Text style={styles.loginText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  swiperView: {
    flex: 0.75,
  },
  innerText: {
    marginLeft: 10,
    marginBottom: 10
  },

  loginText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },

  login: {
    flex: 1,
    backgroundColor: "#74CAEF",
    justifyContent: 'space-evenly'
  },


  t2: {
    fontSize: 35,
    fontWeight: '600',
  },


  t: {
    fontSize: 15,
    fontWeight: '600',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },


  textContainer: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    flex: 0.1, // Adjust the top margin to move text closer to the image
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10, // Adjust this margin as needed
  },
  halfSizeButton: {
    width: "40%", // Half the size of the "Sign Out" button
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#08C91C",
    marginHorizontal: 5, // Adjust this spacing as needed
  },

  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#08C91C",
    marginBottom: 15, // Adjust this margin as needed
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 5,  // Reduce the margin to 5 units
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.2,
    flex: 0.6,
  },

  inputView: {
    backgroundColor: "#2FAED7",
    borderRadius: 9,
    width: "80%",
    height: 45,
    marginBottom: 25,
  },





  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#08C91C",
  },


});
