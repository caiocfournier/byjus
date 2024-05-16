import * as React from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import firebase from "firebase";

export default class AnimalScreen extends React.Component {
  
  state = {
    animalData: [],
    filteredAnimalData: [],
    currentIndex: this.props.navigation.getParam('animalIndex', 0),
    searchQuery: '',
  };

  componentDidMount() {
    this.fetchAnimalData();
  }

  fetchAnimalData = async () => {
    try {
      const animalRef = firebase.database().ref('animals');
      animalRef.once('value', snapshot => {
        if (snapshot.exists()) {
          const animalData = snapshot.val();
          this.setState({ animalData, filteredAnimalData: animalData });
        } else {
          console.log("No data available");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  home = () => {
    this.props.navigation.navigate('HomeScreen')
  };

  proximoAnimal = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex + 1) % this.state.filteredAnimalData.length,
    }));
  };

  animalAnterior = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex - 1 + this.state.filteredAnimalData.length) % this.state.filteredAnimalData.length,
    }));
  };

  handleSearch = (text) => {
    const filteredAnimalData = this.state.animalData.filter(animal =>
      animal.name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ searchQuery: text, filteredAnimalData, currentIndex: 0 });
  };

  render() {
    const { animalData, filteredAnimalData, currentIndex, searchQuery } = this.state;
    if (animalData.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      );
    }

    const animal = filteredAnimalData[this.state.currentIndex];
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar animal..."
          value={searchQuery}
          onChangeText={this.handleSearch}
        />
        {filteredAnimalData.length === 0 ? (
          <Text style={styles.loadingText}>Nenhum resultado encontrado...</Text>
        ) : (
          <View style={styles.screenContainer}>
            <Text style={styles.title}>{animal.name}</Text>
            <Text style={styles.description}>{animal.description}</Text>
            <Image source={animal.image} style={styles.image} />
            {currentIndex > 0 && (
              <TouchableOpacity style={styles.button} onPress={this.animalAnterior}>
                <Text style={styles.buttonText}>Animal Anterior</Text>
              </TouchableOpacity>
            )}
            {currentIndex < filteredAnimalData.length - 1 ? (
              <TouchableOpacity style={styles.button} onPress={this.proximoAnimal}>
                <Text style={styles.buttonText}>Próximo Animal</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => this.home()}>
                <Text style={styles.buttonText}>Voltar ao Inicio</Text>
              </TouchableOpacity>
            )}
          </View>
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    width: '80%',
  },
  screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
  loadingText: {
    fontSize: 20,
  },
});