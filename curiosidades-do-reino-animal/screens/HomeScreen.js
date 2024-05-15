import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';


export default class HomeScreen extends React.Component{

  iniciar = () => {
    this.props.navigation.navigate('Cavalo')
  };

   render(){
     return(
       <View style={styles.container}>
        <Text style={styles.text}>Curiosidades do Reino Animal </Text>
        <Text>Esse é o super aplicativo onde você poderá encontrar as mais diversas curiosidades sobre os animais.</Text>
        <TouchableOpacity 
          style={styles.botaoIr}
          onPress={() => this.iniciar()}
        >
          <Text style={styles.textoBotao}>COMEÇAR</Text>
        </TouchableOpacity>
      </View>
     )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})