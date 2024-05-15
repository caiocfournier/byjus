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
        <Text style={styles.text}>Hipopótamo</Text>
             <Text>O hipopótamo-comum ou hipopótamo-do-nilo é um mamífero herbívoro de grande porte da África subsariana e uma das duas únicas espécies não extintas da família Hippopotamidae, sendo a outra o hipopótamo-pigmeu. O seu nome provém do grego antigo, significando "cavalo do rio".</Text>
        <Image source=
{require("../assets/hipopotamo.jpg")} style={{resizeMode: 'contain',
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