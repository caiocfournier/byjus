import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class Falcao extends React.Component {
  home = () => {
    this.props.navigation.navigate('HomeScreen')
  };
    animalAnterior = () => {
    this.props.navigation.navigate('Cobra')
  };


   render(){
     return(
       <View style={styles.container}>
        <Text style={styles.title}>Falcão</Text>
       <Text style={styles.description}>Falcão é o nome genérico dado a várias aves da família Falconidae, mais estritamente aos animais classificados dentro do género Falco, mas algumas espécies também são conhecidas pelo nome genérico peneireiro, devido ao hábito que têm de peneirar para caçar.</Text>
        <Image 
          source={require("../assets/falcao.jpg")} 
          style={styles.image}>
        </Image>
        <TouchableOpacity style={styles.button}
          onPress={() => this.animalAnterior()}
        >
          <Text style={styles.buttonText}>Animal Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => this.home()}
        >
          <Text style={styles.buttonText}>Voltar ao Inicio</Text>
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