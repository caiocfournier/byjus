import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class Cobra extends React.Component {
  proximoAnimal = () => {
    this.props.navigation.navigate('Falcao')
  };
    animalAnterior = () => {
    this.props.navigation.navigate('Hipopotamo')
  };

   render(){
     return(
       <View style={styles.container}>
        <Text style={styles.title}>Cobra</Text>
        <Text style={styles.description}>
          As serpentes, também chamadas ofídios, cobras, mbóis, mboias e malacatifas, são répteis poiquilotérmicos sem patas, pertencentes à subordem Serpentes, ou Ophidia. São bastante próximos dos lagartos, com os quais partilham a ordem Squamata.
        </Text>
        <Image 
          source={require('../assets/cobra.jpg')} 
          style={styles.image}
        />
        <TouchableOpacity style={styles.button} onPress={this.animalAnterior}>
          <Text style={styles.buttonText}>Animal Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.proximoAnimal}>
          <Text style={styles.buttonText}>Próximo Animal</Text>
        </TouchableOpacity>
      </View>
     )
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});