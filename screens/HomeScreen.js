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
  Modal
} from 'react-native';
import { auth } from '../FirebaseHandler';
import SlideShow from '../components/Slideshow';
import Icon from 'react-native-vector-icons/AntDesign';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {conformationVisible: false};
  }


  conformation = () => {
      this.setState({conformationVisible: true})
      setTimeout(() => this.setState({conformationVisible: false}), 2000)
      this.props.navigation.setParams({
        sentSuccess: false
      })
     
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
    this.props.route.params.sentSuccess ? this.conformation() : null
    return (
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.conformationVisible}
            >
              <View style={styles.transparentBack}>
                <Icon name="checkcircle" size={60} color="#2db002" />
                <Text style={styles.t3}>SUCCESS</Text>
              </View>


            </Modal>
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
              <TouchableOpacity style={styles.loginBtn} onPress={() => {
                this.heatmap();
              }}>
                <Text style={styles.loginText}>Heat Map</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.halfSizeButton} onPress={() => { this.report(); }}>
                <Text style={styles.buttonText}>Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.halfSizeButton} onPress={() => { this.signOut(); }}>
                <Text style={styles.buttonText}>Sign Out</Text>
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
  t3: {
    fontSize: 20,
    color: '#2db002',
    fontWeight: 'bold',
    marginTop: 21,
  },  
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

  transparentBack: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    height: 220,
    width: 220,
    marginTop: Dimensions.get('screen').height * 0.35,
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
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
