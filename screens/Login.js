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
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import FirebaseInfo from "../FirebaseHandler";


export default class Login extends Component {
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

  checkUser = async () => {
    await signInWithEmailAndPassword(FirebaseInfo.auth, this.state.email, this.state.password)
      .then((userCreds) => {
        this.reset();
      })
      .catch((error) => {
        this.setState({ password: "", passworderrer: true })
        error.code == "auth/network-request-failed" ? this.setState({ errorText: "No Connection" }) :
          this.setState({
            errorText: "incorrect credentials"
          })
      });
      this.moniterAuthState()
  }

  componentDidMount = () => {
    this.moniterAuthState()
  }

  moniterAuthState = async () => {
    await onAuthStateChanged(FirebaseInfo.auth, user => {
      if (user) {
        global.user = user.email
        this.props.navigation.navigate("HomeScreen")
      }
    })
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
            keyboardVerticalOffset={50}
            behavior="padding"
            style={styles.Llogin}
          >
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

            <TouchableOpacity onPress={() => {
              this.reset();
              this.props.navigation.navigate("Register")
            }}>
              <Text style={styles.forgot_button}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => {
              this.checkUser();
            }}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>


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