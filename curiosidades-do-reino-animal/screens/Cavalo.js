import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class Cavalo extends React.Component {
  proximoAnimal = () => {
    this.props.navigation.navigate('Tamandua')
  };

   render(){
     return(
       <View style={styles.container}>
        <Text style={styles.title}>Cavalo</Text>
        <Text style={styles.description}>
          O cavalo é uma das duas subespécies existentes de Equus ferus. É um mamífero perissodáctilo pertencente à família taxonômica Equidae. O cavalo evoluiu há entre 45 milhões a 55 milhões de anos, desde uma pequena criatura com vários dedos, o Eohippus, até o animal grande e com um único dedo de hoje
        </Text>
        <Image 
          source={require("../assets/cavalo.jpg")} 
          style={styles.image}>
        </Image>
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