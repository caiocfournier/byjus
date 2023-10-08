import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {Component} from 'react';

export default class SearchScreen extends Component {
    render() {
        return (
            <View style={
                styles.container
            }>
                <Text style={
                    styles.text
                }>Tela de Pesquisa</Text>
                <StatusBar style="auto"/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "black",
        fontSize: 30
    }
});
