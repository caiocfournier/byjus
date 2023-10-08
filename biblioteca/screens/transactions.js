import {StatusBar} from 'expo-status-bar';
import {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends Component {
    contructor(props){
        super(props);
        this.state = {
            domState : 'normal',
            hasCameraPermissions: null,
            scanned: false,
            scannedData: ""
        }
    }

    getCameraPermissions = async domState => {
      const{status} = await Permission.askAsync(Permissions.CAMERA);
      
      this.setState({
        hasCameraPermissions: status === "grated",
        domState: domState,
        scanned: false
      });
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {hasCameraPermissions ? scannedData : "solicitar Permissão para a Câmera"}
                </Text>
                <TouchableOpacity
                 style={styles.button}
                 onPress = {() => this.getCameraPermissions("scanner")}>
                    <Text style={styles.buttonText}>Digitalizar QR code</Text>
                </TouchableOpacity>
        </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "black",
        fontSize: 30
    },
    button:{
        width: '43%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'cener',
        backgroundColor: 'f48d20',
        boderRadius: 15,
    },
    buttonText: {
        fontSize: 24,
        color: '#FFFFFF'
    }
});
