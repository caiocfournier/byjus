import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class Hipopotamo extends React.Component {
  proximoAnimal = () => {
    this.props.navigation.navigate('Cobra')
  };
   animalAnterior = () => {
    this.props.navigation.navigate('Tamandua')
  };

   render(){
     return(
       <View style={styles.container}>
        <Text style={styles.title}>Hipopótamo</Text>
        <Text style={styles.description}>
          O hipopótamo-comum ou hipopótamo-do-nilo é um mamífero herbívoro de grande porte da África subsariana e uma das duas únicas espécies não extintas da família Hippopotamidae, sendo a outra o hipopótamo-pigmeu. O seu nome provém do grego antigo, significando "cavalo do rio".
        </Text>
        <Image 
          source={require("../assets/hipopotamo.jpg")} 
          style={styles.image}>
        </Image>
        <TouchableOpacity style={styles.button}
          onPress={() => this.animalAnterior()}
        >
          <Text style={styles.buttonText}>Animal Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => this.proximoAnimal()}
        >
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