import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const heatmapData = [
  { latitude: 37.78825, longitude: -122.4324, intensity: 0.5 },
  // Add more data points here
];

export default class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      isKeyPageVisible: false,
      isMenuVisible: false,
      heatMap: []
    };
  }

  componentDidMount = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const newState = this.state;
      newState.location = location;
      this.setState(newState);
      this.setState({
        heatMap: [{latitude: location.coords.latitude, longitude: location.coords.longitude, intensity: 2}]
          
      })

    })();
  }

  toggleKeyPage = () => {
    this.setState({ isKeyPageVisible: !this.state.isKeyPageVisible });
  }

  toggleMenuPage = () => {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  }

  exit = () => {
    this.props.navigation.navigate("HomeScreen");
  }

  report = () => {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
    this.props.navigation.navigate("Report");
  }

  render() {
    // loading screen....
    if (this.state.location == null) {
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
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          <Heatmap
            points={this.state.heatMap}
            radius={40}
            opacity={1}
            onZoomRadiusChange={null}
          />
        </MapView>
        <TouchableOpacity
          style={styles.keyButton}
          onPress={this.toggleMenuPage}
        >
          <Text style={styles.buttonText}>Menu</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isMenuVisible}
        >
          <View style={styles.keyPage}>

            <TouchableOpacity
              style={styles.closeMenuButton}
              onPress={this.toggleKeyPage}
            >
              <Text style={styles.buttonText}>Key</Text>
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="slide"
              visible={this.state.isKeyPageVisible}
            >
              <View style={styles.keyPage}>
                <Text style={styles.keyPageText}>Color Key</Text>
                <Text style={styles.normalText}>Racism: Color1</Text>
                <Text style={styles.normalText}>Assault: Color2</Text>
                <Text style={styles.normalText}>Sexism: Color3</Text>
                <Text style={styles.normalText}>Bullying: Color4</Text>
                <Text style={styles.normalText}>Extraneous: Color5</Text>

                <TouchableOpacity
                  style={styles.closeKeyButton}
                  onPress={this.toggleKeyPage}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>  

            <TouchableOpacity
              style={styles.closeMenuButton}
              onPress={this.report}
            >
              <Text style={styles.buttonText}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeMenuButton}
              onPress={this.exit}
            >
              <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeMenuButton}
              onPress={this.toggleMenuPage}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  // Existing styles...

  keyButton: {
    position: 'absolute',
    top: 60,
    right: 15,
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
  closeMenuButton: {
    backgroundColor: "#08C91C",
    borderRadius: 25,
    alignItems: "center",
    width: "40%",
    padding: 10,
    marginBottom: 10,
  },
  closeKeyButton: {
    backgroundColor: "#08C91C",
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
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

