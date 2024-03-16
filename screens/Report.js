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
import {OPEN_AI_API_KEY} from '@env'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.apiKey = OPEN_AI_API_KEY
        

        this.state = {
            Address: '',
            Description: ''
        };
    }




    /*grouping = async (description) => {
        try {
            let b = "Classify the following sentence into either 'racism', 'sexism', 'assault', or 'other' (if the other categories don't fit): " + this.state.Description + ". Return the data as a JSON string with a key called category indicating the classified category and a key called intesity which is a value between 1 and 100 indicating how serious and dangerous the incident is.";
            const res = await fetch("https://api.openai.com/v1/completions", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo-instruct",
                    prompt: b,
                    max_tokens: 30,
                    temperature: 0,
                }),
            });
            const json = await res.json();
            const values = JSON.parse(json.choices[0].text);
            return {
                category: values.category,
                intensity: values.intensity
            };
        } catch (error) {

            console.error("Error in grouping function:", error);
            throw error; // Rethrow the error to propagate it further if needed
        }
    }*/




    submit = async () => {
        try {


            await addDoc(collection(FirebaseInfo.db, "Reports2"), {
                Address: this.state.Address,
                Description: this.state.Description,
                Email: global.user,
                Category: "assault",
                Intensity: 50
            });


            this.props.navigation.navigate("HomeScreen", { sentSuccess: true });
        } catch (error) {
            console.error("Error submitting report:", error);
            // Handle the error here, e.g., show a message to the user
        }
    }




    cancel = () => {
        this.props.navigation.navigate("HomeScreen")
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
                    <KeyboardAvoidingView style={styles.InnerRect}
                        keyboardVerticalOffset={50}
                        behavior="padding">


                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput2}
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
                                value={this.state.Description}
                                onChangeText={(GetDescription) => { this.setState({ Description: GetDescription }) }}
                            />
                        </View>


                        {
                            this.state.passworderrer ? (
                                <Text style={styles.error}>{this.state.errorText}</Text>
                            ) : null
                        }
                    </KeyboardAvoidingView>
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
        flex: 0.55,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30
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
        marginBottom: 5, // Reduce the margin to 5 units
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.2,
        flex: 0.55,
    },


    inputView: {
        backgroundColor: "#00B1D8",
        borderColor: '#02bce3',
        borderWidth: 3,
        borderRadius: 5,
        width: "80%",
        height: 45,
        marginBottom: 25,


    },


    inputView2: {
        borderColor: '#02bce3',
        borderWidth: 3,
        backgroundColor: "#00B1D8",
        borderRadius: 6,
        width: "80%",
        height: 175,
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
        flex: 1,
        padding: 12,
        color: '#035DAF',
        marginTop: 6
    },
    TextInput2: {
        flex: 1,
        marginLeft: 15,
        color: '#035DAF',


    }














});


