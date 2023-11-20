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
        if(Object.keys(this.state.meteors).lenght === 0){
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Carregando...</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteors_date => {
                return this.state.meteors[meteors_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_max + 
element.estimated_diameter.kilometers.estimated_diameter_min) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000;
                element.threat_score = threatScore;
            });

            meteors.sort(function(a, b){
                return b.threat_score - a.threat_score
            });
            meteors = meteors.slice(0, 5)
        };
    }
}
        

