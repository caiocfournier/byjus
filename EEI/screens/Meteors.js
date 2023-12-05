import React, { Component } from 'react';
import { ImageBackground, Text, View } from 'react-native';

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

    renderItem = ({item}) => {
        let meteor = item;
        let bg_img, speed, size;

        if(meteor.treat_score <= 30){
            bg_img = require("../assets/meteor_bg1.png");
            speed = require("../assets/meteor_speed1.gif");
            size = 100
        } else if (meteor.treat_score <= 30){
            bg_img = require("../assets/meteor_bg2.png");
            speed = require("../assets/meteor_speed2.gif");
            size = 150
        } else {
            bg_img = require("../assets/meteor_bg3.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 150
        }

        return(
            <View>
                <ImageBackground source={bg_img} style=
{StyleSheet.ImageBackgroundImage}>
                   <View style={style.gifContainer}>
                    <Image source={speed} style={{width: size, height: size, alignSelf: 'center'}}></Image>
                   <View>
                   <Text style={[style.cardText, {marginTop: 400, marginLeft: 50}]}>{item.name}</Text>

                   <Text style={[styles.cardText, {marginTop:20, marginLeft: 50}]}>Mais Próximo de Terra - {item.close_approach_data[0].close_approach_date_full}</Text> 
                   <Text style={[styles.cardText, {marginTop:5, marginLeft: 50}]}>Diâmetro Máximo - {item.estimated_diameter.kilometers.estimated_diameter_max} </Text>
                   <Text style={[styles.cardText, {marginTop:5, marginLeft: 50}]}>Diâmetro Mínimo - {item.estimated_diameter.kilometers.estimated_diameter_min} </Text>
                   <Text style={[styles.cardText, {marginTop:5, marginLeft: 50}]}>Velocidade(Km/h) - {item.close_approach_data[0].relative_velocity.Kilometers_per_hour}</Text>
                   <Text style={[styles.cardText, {marginTop:5, marginLeft: 50}]}>Distância da Terra(Km) - {item.close_approach_data[0].miss_distance.Kilometers}</Text>
                   </View>
                   </View>
               </ImageBackground>
            </View>
        )
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
 
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    meteorContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
    threatDetector: {
        height: 10,
        marginBottom: 10
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
});

