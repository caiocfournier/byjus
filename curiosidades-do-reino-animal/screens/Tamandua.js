import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class Tamandua extends React.Component {
  proximoAnimal = () => {
    this.props.navigation.navigate('Hipopotamo')
  };
  animalAnterior = () => {
    this.props.navigation.navigate('Cavalo')
  };

   render(){
     return(
       <View style={styles.container}>
        <Text style={styles.text}>Tamanduá</Text>
        <Text>Tamandua é um gênero de mamíferos da família Myrmecophagidae. É um animal de aparência curiosa. Sua cabeça alongada, que se prolonga pelo focinho, parece um grande tubo. Por não possuir dentes, ele usa as fortes patas dianteiras, dotadas de grandes garras, para destruir formigueiros e cupinzeiros</Text>
        <Image source=
{require("../assets/tamandua.jpg")} style={{resizeMode: 'contain',
width:300, height:250, borderRadius: 10}}>
</Image>
        <TouchableOpacity
          onPress={() => this.animalAnterior()}
        >
          <Text>Animal Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.proximoAnimal()}
        >
          <Text>Próximo Animal</Text>
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