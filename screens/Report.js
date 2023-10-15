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
import Swiper from 'react-native-swiper';
import { auth } from '../FirebaseHandler';
import SlideShow from '../components/Slideshow';
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    submit = () => {
        this.props.navigation.navigate("HomeScreen");
    }

    cancel = () => {
        this.props.navigation.navigate("HomeScreen");
    }

    report = () => {
        this.props.navigation.navigate("Report");
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
                                        onChangeText={(GetEmail) => { this.setState({ email: GetEmail }) }}
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
                                        onChangeText={(Getpassword) => { this.setState({ password: Getpassword }) }}
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
    swiperView: {
        flex: 0.75,
    },
    innerText: {
        marginLeft: 10,
        marginBottom: 10
    },
    InnerRect: {
        flex: 0.45,
        width: '85%',
        backgroundColor: "#00B1D8",
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 30,
        marginBottom: 20,
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
        marginBottom: 12,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },

    textContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
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
        width: "90%",
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
