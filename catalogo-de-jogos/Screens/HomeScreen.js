import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Catálogo de Games</Text>
        <Text style={styles.description}>
          Neste aplicativo você verá os mais diversos jogos e videogames
        </Text>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('VideoGamesScreen')}>
            <Text style={styles.menuText}>Videogames</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('JogosScreen')}>
            <Text style={styles.menuText}>Jogos</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Estilos
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
