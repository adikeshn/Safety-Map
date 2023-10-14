import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions } from 'react-native';
import { auth } from '../FirebaseHandler';
import {
  Image,
  TextInput,
} from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  signOut = () => {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Image style={styles.image} source={require("../assets/logo.png")} />
            <Text style={styles.t2}>SafeZone</Text>
            <Text style={styles.t}>Empowering Voices Promoting Safety</Text>

          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.halfSizeButton} onPress={() => { /* Handle button 1 action */ }}>
                <Text style={styles.buttonText}>Heat Map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.halfSizeButton} onPress={() => { /* Handle button 2 action */ }}>
                <Text style={styles.buttonText}>Report</Text>
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => {
            this.signOut();
          }}>
            <Text style={styles.loginText}>Sign Out</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  banner: {
    backgroundColor: "#096901",
    flex: 0.1
  },
  login: {
    flex: 1,
    backgroundColor: "#74CAEF",
    justifyContent: 'space-evenly'
  },

  Llogin: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',


  },
  t2: {
    fontSize: 35,
    fontWeight: '600',
  },


  t: {
    fontSize: 15,
    fontWeight: '600',
  },


  L2Login: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10, // Adjust the top margin to move text closer to the image
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15, // Adjust this margin as needed
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
  halfSizeButtonCentered: {
    width: "40%", // Half the size of the "Sign Out" button
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#08C91C",
    marginBottom: 15, // Adjust this margin as needed
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

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20,
    color: '#035DAF'
  },

  forgot_button: {
    height: 30,
    marginBottom: 15
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#08C91C",
  },

  error: {
    color: "red",
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 15
  }
});
