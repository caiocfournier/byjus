import * as React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const gamesData = [
  { name: 'The Legend of Zelda: Breath of the Wild', image: require('../assets/zelda.png'), description: 'Um jogo de aventura e exploração para o Nintendo Switch.' },
  { name: 'Red Dead Redemption 2', image: require('../assets/reddead.jpg'), description: 'Um jogo de mundo aberto ambientado no Velho Oeste.' },
];

export default class JogosScreen extends React.Component {
  state = {
    currentPage: 1,
    itemsPerPage: 2,
  };

  render() {
    const { currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = gamesData.slice(startIndex, endIndex);

    return (
      <View style={styles.container}>
        <FlatList
          data={dataToDisplay}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Text style={styles.menuText}>Voltar para Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  itemContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  menuItem: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});