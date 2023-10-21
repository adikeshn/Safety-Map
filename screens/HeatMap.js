import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions, Modal } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import firebase from 'firebase/app';
import 'firebase/firestore';
import axios from 'axios';
import FirebaseInfo from '../FirebaseHandler';
import { getDocs, collection } from 'firebase/firestore'; // Import the required Firestore functions









export default class HeatMap extends Component {
  constructor(props) {
    super(props);


    this.state = {
      location: null,
      isKeyPageVisible: false,
      heatmapData: [], // Store heatmap data here
    };
  }


  async parseAddressToLatLng(address) {
    var a
    await Location.geocodeAsync(address).then((location) => {
       if (location.length == 0) a = 0
       else a = {latitude: location[0].latitude, longitude: location[0].longitude}
     })
     return a
     
   
   }

  async componentDidMount() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }


      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    })();

    // Listen for changes in Firestore data
    const querySnapshot = await getDocs(collection(FirebaseInfo.db, 'SafeZone-Reports'));
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      // Parse the address to latitude and longitude
      await this.parseAddressToLatLng(data.Address).then((data) => {
        if (data != 0){
          this.setState({heatmapData: [...this.state.heatmapData, {latitude: data.latitude, longitude: data.longitude}]})
        }
      })
      
      
    });


  }




  toggleKeyPage = () => {
    console.log(this.state.heatmapData)
    this.setState({ isKeyPageVisible: !this.state.isKeyPageVisible });
  }


  render() {
    if (this.state.location === null) {
      return (
        <SafeAreaView style={styles.login}>
          {/* Loading screen content */}
        </SafeAreaView>
      );
    }


    return (
      <SafeAreaView style={styles.login}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Heatmap
            points={this.state.heatmapData}
            radius={300}
            opacity={0.3}
            onZoomRadiusChange={0}
          />
        </MapView>
        <TouchableOpacity
          style={styles.keyButton}
          onPress={this.toggleKeyPage}
        >
          <Text style={styles.buttonText}>Open Key</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isKeyPageVisible}
        >
          <View style={styles.keyPage}>
            {/* Key page content */}
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}


// The rest of your styles...




const styles = StyleSheet.create({
  // Existing styles...


  keyButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: "#08C91C",
    borderRadius: 25,
    padding: 10,
  },


  keyPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },


  keyPageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  normalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },


  closeKeyButton: {
    backgroundColor: "#08C91C",
    borderRadius: 25,
    padding: 10,
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
    marginBottom: 5, // Reduce the margin to 5 units
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




