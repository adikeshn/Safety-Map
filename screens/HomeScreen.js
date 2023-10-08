import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { auth } from '../FirebaseHandler';
import {
  Image,
  TextInput,
} from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  signOut = () => {
    auth.signOut()
    this.props.navigation.navigate("Login")

  }

  render() {
    return (
      <SafeAreaView style={styles.login}>

        <View style={styles.container}>

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



  t: {
    fontSize: 35,
    fontWeight: '600',
  },

  L2Login: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 10,
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
