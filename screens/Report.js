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
    KeyboardAvoidingView,
    TextInput,
} from 'react-native';

import { collection, addDoc } from 'firebase/firestore';
import FirebaseInfo from '../FirebaseHandler';
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Address: '',
            Description: ''
        };
    }

    submit = () => {

        addDoc(collection(FirebaseInfo.db, "SafeZone-Reports"), { Address: this.state.Address, Description: this.state.Description, Email: global.user })    

        this.props.navigation.navigate("HomeScreen");
    }

    cancel = () => {
        this.props.navigation.navigate("HomeScreen");
    }

    


    render() {
        return (
            <SafeAreaView style={styles.login}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Image style={styles.image} source={require("../assets/logo.png")} />
                        <View style={styles.innerText}>
                            <Text style={styles.t2}>Report</Text>
                            <Text style={styles.t}>Reporting builds safer communities</Text>
                        </View>
                    </View>
                    <View style={styles.InnerRect}>
                        <KeyboardAvoidingView
                            keyboardVerticalOffset={50}
                            behavior="padding"
                            style={styles.Llogin}
                        >
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.TextInput}
                                        placeholder="Address: "
                                        placeholderTextColor="#035DAF"
                                        onChangeText={(GetAddress) => { this.setState({ Address: GetAddress }) }}
                                    />
                                </View>
                                <View style={styles.inputView2}>
                                    <TextInput
                                        style={styles.TextInput}
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholder="Describe the situation: "
                                        placeholderTextColor="#035DAF"
                                        secureTextEntry={true}
                                        value={this.state.password}
                                        onChangeText={(GetDescription) => { this.setState({ Description: GetDescription }) }}
                                    />
                                </View>

                                {
                                    this.state.passworderrer ? (
                                        <Text style={styles.error}>{this.state.errorText}</Text>
                                    ) : null
                                }
                        </KeyboardAvoidingView>
                    </View>
                        <View style={styles.buttonContainer}>
                    
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                                this.submit();
                            }}>
                                <Text style={styles.loginText}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                                this.cancel();
                            }}>
                                <Text style={styles.loginText}>Cancel</Text>
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
    container: {
        flex: 1,
        alignItems: 'center',
      },
   
    innerText: {
        marginLeft: 10,
    },
    InnerRect: {
        flex: 0.45,
        width: '85%',
        backgroundColor: "#00B1D8",
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        
        marginBottom: 20,
    },
    loginText: {
        fontSize: 17,
        fontWeight: 'bold'
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
        marginBottom: 12,
    },
    

    textContainer: {
        marginTop: 20,
        alignItems: 'center',
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
    

    
    
    image: {
        resizeMode: 'contain',
        marginBottom: 5,  // Reduce the margin to 5 units
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.2,
        flex: 0.55,
    },

    inputView: {
        backgroundColor: "#74CAEF",
        borderRadius: 9,
        width: "80%",
        height: 45,
        marginBottom: 25,
    },

    inputView2: {
        backgroundColor: "#74CAEF",
        borderRadius: 9,
        width: "80%",
        height: 175,
        marginBottom: -160,
    },

    loginBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#08C91C",
    },
    
    
    
    

    Llogin: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
    },




   

    TextInput: {
        height: 50,
        flex: 1,
        marginLeft: 20,
        color: '#035DAF'
    },

    

    

    

});
