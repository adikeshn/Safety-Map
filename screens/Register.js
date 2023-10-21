import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import FirebaseInfo from "../FirebaseHandler";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passworderrer: false,
      errorText: "",
      name: ""
    }
  }


  handleRegister = async () => {
    if (!this.state.email || !this.state.password || !this.state.name)
      return false

    await createUserWithEmailAndPassword(FirebaseInfo.auth, this.state.email, this.state.password)
      .then((userCredential) => {
        this.setState({
          passworderrer: true
        })
        FirebaseInfo.auth.signOut();
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        this.setState({
          passworderrer: true
        })
        error.code == "auth/email-already-in-use" ? this.setState({ errorText: "email already in use" }) :
          error.code == "auth/invalid-email" ? this.setState({ errorText: "invalid email" }) : this.setState({ errorText: error.message });
      });

    return true;
  }



  reset = () => {
    this.setState({
      password: "",
      passworderrer: false,
      errorText: "",
      email: ""
    })
  }





  render() {
    return (
      <View style={styles.container}>

        <View style={styles.login}>
          <View style={styles.L2Login}>

            <Image style={styles.image} source={require("../assets/logo.png")} />
            <Text style={styles.t}>SafeZone</Text>
          </View>

        

        
          <KeyboardAvoidingView
            keyboardVerticalOffset={10}
            behavior='padding'
            style={styles.Llogin}
          >

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Name"
                placeholderTextColor="#035DAF"
                value={this.state.name}
                onChangeText={(GetName) => { this.setState({ name: GetName }) }}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#035DAF"
                value={this.state.email}
                onChangeText={(GetEmail) => { this.setState({ email: GetEmail }) }}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#035DAF"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(Getpassword) => { this.setState({ password: Getpassword }) }}
              />
            </View>

            {
              this.state.passworderrer ? (
                <Text style={styles.error}>{this.state.errorText}</Text>
              ) : null
            }
          </KeyboardAvoidingView>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => {
              this.reset();
              this.props.navigation.navigate("Login")
            }}>
              <Text style={styles.forgot_button}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => {
              this.handleRegister();
            }}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
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
  },
  banner: {
    backgroundColor: "#096901",
    flex: 0.1
  },
  login: {
    flex: 1,
    backgroundColor: "#74CAEF",
    justifyContent: 'center'
  },

  Llogin: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  t: {
    fontSize: 35,
    fontWeight: '600',
  },

  L2Login: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50
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
    marginBottom: 5,
  },

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20,
    color: '#035DAF'
  },

  forgot_button: {
    height: 30,
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