import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class Cavalo extends React.Component {
  proximoAnimal = () => {
    this.props.navigation.navigate('Tamandua')
  };

   render(){
     return(
       <View style={styles.container}>
        <Text style={styles.text}>Cavalo</Text>
        <Text>O cavalo é uma das duas subespécies existentes de Equus ferus. É um mamífero perissodáctilo pertencente à família taxonômica Equidae. O cavalo evoluiu há entre 45 milhões a 55 milhões de anos, desde uma pequena criatura com vários dedos, o Eohippus, até o animal grande e com um único dedo de hoje</Text>
        <Image source=
{require("../assets/cavalo.jpg")} style={{resizeMode: 'contain',
width:300, height:250, borderRadius: 10}}>
</Image>
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