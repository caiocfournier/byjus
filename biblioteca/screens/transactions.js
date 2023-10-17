import {StatusBar} from 'expo-status-bar';
import {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Permisions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';

export default class TransactionScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookId: "",
            studentId: "",
            domState : 'normal',
            hasCameraPermissions: null,
            scanned: false,
            scannedData: ""
        }
    }

    getCameraPermissions = async domState => {
      const{status} = await Permisions.askAsync(Permisions.CAMERA);
      
      this.setState({
        hasCameraPermissions: status === "grated",
        domState: domState,
        scanned: false
      });
    };

    handleBarCodeScanned = async ({type, data}) => {
       const {domState} = this.state;

       if(domState === "bookId"){
        this.setState({
            bookId: data,
            domState: 'normal',
            scanned: true
        });
       }
       else if(domState === "studentId"){
        this.setState({
            studentId: data,
            domState: 'normal',
            scanned: true
        });
       }
    };

    render() {
        const {bookId, studentId, domState, scanned, } = this.state;
        if(domState !== "normal"){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        return (
            <View style={styles.container}>
              <View style={styles.textinputContainer}>
                <TextInput
                style={styles.textinput}
                placeholder={'Id Livro'}
                placeholderTextColor={'#FFFFFF'}
                value={bookId}
              />
                <TouchableOpacity
                 style={styles.button}
                 onPress = {() => this.getCameraPermissions("bookId")}>
                <Text style={styles.buttonText}>Digitalizar</Text>
                </TouchableOpacity>
           </View>
           <View style={[styles.textinputContainer, {marginTop: 25}]}>
                <TextInput
                style={styles.textinput}
                placeholder={'Id Aluno'}
                placeholderTextColor={'#FFFFFF'}
                value={studentId}
              />
               <TouchableOpacity
                 style={styles.button}
                 onPress = {() => this.getCameraPermissions("student'Id")}>
                <Text style={styles.buttonText}>Digitalizar</Text>
              </TouchableOpacity>
           </View>

           <TouchableOpacity
             style={[styles.button, {marginTop: 25}]}
            >                      
             <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

        </View>
        );
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
