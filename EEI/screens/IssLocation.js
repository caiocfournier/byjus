import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, SafeAreaView, StatusBar} from 'react-native';
import MapView, {Maker} from 'react-native-maps';

export default class IssLocationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: {}
        };
    }

    componentDidMount(){
        this.getIssLocation()
    }

     getIssLocation = () => {
        axios
        .get("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response => {
            this.setState({location: response.data})
        })
        .catch(error => {
            Alert.alert(error.message)
        })
     }

    render() {
        if(Object.keys(this.state.location).length === 0){
            return(
                <View style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>Carregando...</Text>
                </View>
            )
        } else {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <ImageBackground source={require('../assets/bg.png')} style=
{styles.backgroundImage}>
                     <View style={styles.titleBar}>
                         <Text style={styles.titleText}>Tela do Rastreador EEI!</Text>
                     </View>
                     <View style={styles.mapContainer}>
                     <MapView
                     style={styles.map}
                     region={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude,
                        latitudeDelta: 100,
                        longitudeDelta: 100
                     }}
                    >
                       <Marker coordinate={{latitude:this.state.location.latitude,
                        longitude: this.state.location.longitude}}>
                            <Image source={require("../assets/iss_icon.png")} style={{width: 50, height: 50}}/>
                        </Marker>    
                    </MapView>
                    </View>
                    <View style={styles.infoContainer}>
                         <Text style={styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                         <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                         <Text style={styles.infoText}>Altitude  (KM): {this.state.location.altitude}</Text>
                         <Text style={styles.infoText}>Velocidade  (KM/H): {this.state.location.velocity}</Text>
                    </View> 
                </ImageBackground>
            </View>
        )
      }  
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.6
    },
    map: {
        width: '100%',
        height: '100%'
    },
    infoContainer: {
        flex: 0.2,
        backgroundcolor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
     infoText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
     }  
})
