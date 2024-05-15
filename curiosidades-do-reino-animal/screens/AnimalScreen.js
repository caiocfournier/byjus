import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const animalData = [
  {
    name: 'Cavalo',
    description: 'Os cavalos são animais magníficos, conhecidos por sua força e beleza.',
    image: require('../assets/cavalo.jpg'),
  },
  {
    name: 'Tamanduá',
    description: 'Os tamanduás são conhecidos por suas longas línguas e dieta de formigas.',
    image: require('../assets/tamandua.jpg'),
  },
  {
    name: 'Hipopótamo',
    description: 'Os hipopótamos são grandes mamíferos semi-aquáticos nativos da África.',
    image: require('../assets/hipopotamo.jpg'),
  },
  {
    name: 'Cobra',
    description: 'As serpentes são répteis sem patas, pertencentes à subordem Serpentes.',
    image: require('../assets/cobra.jpg'),
  },
  {
    name: 'Falcão',
    description: 'Os falcões são aves de rapina conhecidos por sua incrível visão e velocidade.',
    image: require('../assets/falcao.jpg'),
  },
];

export default class AnimalScreen extends React.Component {
  
  state = {
    currentIndex: this.props.navigation.getParam('animalIndex', 0),
  };

  home = () => {
    this.props.navigation.navigate('HomeScreen')
  };

  proximoAnimal = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex + 1) % animalData.length,
    }));
  };

  animalAnterior = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex - 1 + animalData.length) % animalData.length,
    }));
  };

  render() {
    const currentIndex = this.state.currentIndex;
    const animal = animalData[this.state.currentIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{animal.name}</Text>
        <Text style={styles.description}>{animal.description}</Text>
        <Image source={animal.image} style={styles.image} />
        {currentIndex > 0 && (
          <TouchableOpacity style={styles.button} onPress={this.animalAnterior}>
            <Text style={styles.buttonText}>Animal Anterior</Text>
          </TouchableOpacity>
        )}
        {currentIndex < animalData.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={this.proximoAnimal}>
            <Text style={styles.buttonText}>Próximo Animal</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => this.home()}>
            <Text style={styles.buttonText}>Voltar ao Inicio</Text>
          </TouchableOpacity>
        )}
      </View>
    );
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