import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class MeteorScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            meteors: {},
        }
    }

    componentDidMount(){
        this.getMeteors()
    } 

    getMeteors = () =>{
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-11-08&end_date=2023-11-15&api_key=8CNbWtNrgNdUba8aPsjALC0l5ac3XBFW9St41R10")
            .then(response => {
                this.setState({meteors: response.data.near-earth_objects})
            })
            .cacth(error => {
                Alert.alert(error.message)
            })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Tela dos Meteoros!</Text>
            </View>
        )
    }
}

