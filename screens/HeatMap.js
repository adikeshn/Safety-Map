import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions, Modal, ActivityIndicator, StatusBar } from 'react-native';
import MapView, { Heatmap, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import 'firebase/firestore';
import FirebaseInfo from '../FirebaseHandler';
import { getDocs, collection } from 'firebase/firestore'; // Import the required Firestore functions
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Feather'


export default class HeatMap extends Component {
  constructor(props) {
    super(props);


    this.state = {
      location: null,
      heatmapData: [], // Store heatmap data here
      heatmapDataFull: [],
      isMenuVisible: false,
      heatmapRadius: 370,
      reportData: [], // Initial radius of the heatmap,
      reportDataFull: [],
      infoVisible: false,
      info: ["", "", ""],
      outOfZoom: false,
      sexism: true,
      racism: true,
      assault: true,
      other: true,
    };
  }


  async parseAddressToLatLng(address) {
    let a = await Location.geocodeAsync(address);
    if (a.length === 0) {
      return null;
    }
    return { latitude: a[0].latitude, longitude: a[0].longitude };
  }

  async loadData() {
    await getDocs(collection(FirebaseInfo.db, 'Reports2')).then(async (data) => {

      await Promise.all(data.docs.map(async (doc) => {
        const data = doc.data();
        // Parse the address to latitude and longitude
        const latLng = await this.parseAddressToLatLng(data.Address);

        if (latLng) {
          this.setState({
            heatmapDataFull: [...this.state.heatmapDataFull, { latitude: latLng.latitude, longitude: latLng.longitude, weight: data.Intensity, category: data.Category }],
            reportDataFull: [...this.state.reportDataFull, { data: data, coords: latLng, category: data.Category, intensity: data.Intensity }],
            
          });
          this.setState({
            heatmapData: this.state.heatmapDataFull,
            reportData: this.state.reportDataFull
          })
        }
      }))
      

    })
  }
  async componentDidMount() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      await this.loadData()
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    })();


    // Listen for changes in Firestore data
    
  }


  handleRegionChange = (region) => {
    if (region.longitudeDelta > 2.1)
      this.setState({ outOfZoom: true })
    else if (this.state.outOfZoom)
      this.setState({ outOfZoom: false })
  }


  exit = () => {
    this.props.navigation.navigate("HomeScreen");
  }


  report = () => {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
    this.props.navigation.navigate("Report");
  }


  toggleMenuPage = () => {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
    console.log(this.state.heatmapDataFull)
  }

  changeHeatMapData = () => {
    this.setState({heatmapData: this.state.heatmapDataFull.filter((data) => {
      return !((!this.state.assault && data.category === 'assault') || (!this.state.sexism && data.category === 'sexism') ||
      (!this.state.racism && data.category === 'racism') || (!this.state.other && data.category === 'other'))
    }),

      reportData: this.state.reportDataFull.filter((data) => {
        return !((!this.state.assault && data.category === 'assault') || (!this.state.sexism && data.category === 'sexism') ||
        (!this.state.racism && data.category === 'racism') || (!this.state.other && data.category === 'other'))
      })
    })
  }

  


  render() {
    if (this.state.location === null) {
      return (
        <SafeAreaView style={styles.login}>
          <ActivityIndicator size={40} />
        </SafeAreaView>
      );
    }


    return (
      <SafeAreaView style={styles.login}>
        <MapView
          key={this.state.reload}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={this.handleRegionChange}
        >
          {!this.state.outOfZoom ? this.state.reportData.map((data, key) => (
            <Marker
              key={key}
              coordinate={data.coords}
              onPress={() => { this.setState({ info: [data.data.Address, data.data.Email, data.data.Description, data.category, data.intensity], infoVisible: true }) }}
            />
          )) : null}


          {!this.state.outOfZoom ?
           <Heatmap
           points={this.state.heatmapData}
           radius={this.state.heatmapRadius} // Adjust the radius
           opacity={0.7}
           gradient={{
             colors: ['blue', 'green', 'yellow', 'red'],
             startPoints: [0.25, 0.5, 0.75, 1],
             colorMapSize: 300,
           }}
           
         />
           : null
          } 
        </MapView>


        {this.state.infoVisible ?
          <View style={styles.rect}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', marginTop: 10, left: 12 }}>
                <Text style={styles.address}>{this.state.info[0]}</Text>
                <Text style={styles.email} >{this.state.info[1]}</Text>
                <Text style={styles.email}>{this.state.info[3]} - {this.state.info[4]}</Text>
              </View>
              <TouchableOpacity onPress={() => { this.setState({ infoVisible: false }) }}><Icon name={'close'} color={'white'} size={33} style={{ right: 3, bottom: 3 }} /></TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.desc} >{this.state.info[2]}</Text>
          </View> : null
        }


        <TouchableOpacity style={styles.keyButton} onPress={this.toggleMenuPage}>
          <Entypo size={38} name='menu' />
        </TouchableOpacity>


        <Modal transparent={true} animationType="slide" visible={this.state.isMenuVisible}>
          <SafeAreaView style={styles.keyPage}>
            <View style={styles.buttonView}>
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
                  <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.closeMenuButton}
                  onPress={() => {this.toggleMenuPage() 
                    this.changeHeatMapData()}}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.keyView}> 
                <View style={styles.keyRow}>
                     <TouchableOpacity
                      style={{
                        backgroundColor: this.state.assault ? "#08C91C" : 'red',
                        borderRadius: 10,
                        alignItems: "center",
                        width: "45%",
                        height: 60,
                        justifyContent: 'center'
                      }}
                      onPress={() => this.setState({assault: !this.state.assault})}
                    >
                      <Text style={styles.keyButtonText}>Assault</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                      style={{
                        backgroundColor: this.state.racism ? "#08C91C" : 'red',
                        borderRadius: 10,
                        alignItems: "center",
                        width: "45%",
                        height: 60,
                        justifyContent: 'center'
                      }}
                      onPress={() => this.setState({racism: !this.state.racism})}
                    >
                      <Text style={styles.keyButtonText}>Racism</Text>
                    </TouchableOpacity>

                </View>
                  

                <View style={styles.keyRow}>
                     <TouchableOpacity
                      style={{
                        backgroundColor: this.state.sexism ? '#08C91C' : 'red',
                        borderRadius: 10,
                        alignItems: "center",
                        width: "45%",
                        height: 60,
                        justifyContent: 'center'
                      }}
                      onPress={() => this.setState({sexism: !this.state.sexism})}
                    >
                      <Text style={styles.keyButtonText}>Sexism</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                      style={{
                        backgroundColor: this.state.other ? "#08C91C" : 'red',
                        borderRadius: 10,
                        alignItems: "center",
                        width: "45%",
                        height: 60,
                        justifyContent: 'center'

                      }}
                      onPress={() => this.setState({other: !this.state.other})}
                    >
                      <Text style={styles.keyButtonText}>Other</Text>
                    </TouchableOpacity>

                </View>
            </View>




          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }
}




const styles = StyleSheet.create({
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  keyButtonText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  keyRow: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%',
    marginTop: 15
  },
  closeMenuButton: {
    backgroundColor: "#08C91C",
    borderRadius: 25,
    alignItems: "center",
    width: "30%",
    padding: 10,
  },
  // Existing styles...
  line: {
    width: '90%',
    backgroundColor: "#50D1ED",
    height: 5,
    marginTop: 14,
    alignSelf: 'center',
    borderRadius: 10
  },
  address: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white'


  },
  email: {
    fontSize: 19,
    color: 'white',
    left: 4,
    top: 2


  },
  desc: {
    fontSize: 16,
    padding: 15,
    color: 'white'


  },
  rect: {
    backgroundColor: '#00B1D8',
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.3,
    marginTop: Dimensions.get('screen').height * 0.65,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 10
  },
  keyButton: {
    borderRadius: 25,
    padding: 10,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 50,
    right: 5
  },
  keyView: {
    flex: 0.4,
    top: Dimensions.get('screen').height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonView: {
    top: 10,
    flexDirection: 'row',
    flex: 0.06,
    justifyContent: 'space-around'
  },

  keyPage: {
    flex: 1,
    justifyContent: 'flex-start',
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








