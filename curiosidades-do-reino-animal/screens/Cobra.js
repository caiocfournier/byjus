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
        <Text style={styles.text}>Cobra</Text>
         <Text>As serpentes, também chamadas ofídios, cobras, mbóis, mboias e malacatifas, são répteis poiquilotérmicos sem patas, pertencentes à subordem Serpentes, ou Ophidia. São bastante próximos dos lagartos, com os quais partilham a ordem Squamata.</Text>
        <Image source=
{require("../assets/cobra.jpg")} style={{resizeMode: 'contain',
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