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
        <Text style={styles.text}>Falcão</Text>
       <Text>Falcão é o nome genérico dado a várias aves da família Falconidae, mais estritamente aos animais classificados dentro do género Falco, mas algumas espécies também são conhecidas pelo nome genérico peneireiro, devido ao hábito que têm de peneirar para caçar.</Text>
        <Image source=
{require("../assets/falcao.jpg")} style={{resizeMode: 'contain',
width:300, height:250, borderRadius: 10}}>
</Image>
        <TouchableOpacity
          onPress={() => this.animalAnterior()}
        >
          <Text>Animal Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.home()}
        >
          <Text>Voltar ao Inicio</Text>
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