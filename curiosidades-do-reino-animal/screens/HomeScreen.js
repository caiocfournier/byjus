import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class HomeScreen extends React.Component {
  iniciar = () => {
    this.props.navigation.navigate('AnimalScreen', { animalIndex: 0 });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Curiosidades do Reino Animal</Text>
        <Text style={styles.description}>
          Esse é o super aplicativo onde você poderá encontrar as mais diversas curiosidades sobre os animais.
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.iniciar}>
          <Text style={styles.buttonText}>COMEÇAR</Text>
        </TouchableOpacity>
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
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});