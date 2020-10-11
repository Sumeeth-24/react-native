import React from 'react';
import {View,Text, StyleSheet, Button,Image, Dimensions, ScrollView} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
   return (
       
   <ScrollView>
   <View style= {styles.screen}>
          <BodyText></BodyText>
         <Image style={styles.image} source = {require('../assets/Game-over-2.png')} />
        <BodyText style={styles.resulttext}>Your phone needed <Text style={styles.highlight}>{props.roundNumber} </Text>rounds to guess the
         number <Text style={styles.highlight}> {props.userNumber}</Text></BodyText>

        <MainButton  onPress={props.onRestart}>NEW GAME</MainButton> 

   </View>
   </ScrollView>
   
   )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    image: {
        width: Dimensions.get('window').width * 0.94,
        height: Dimensions.get('window').height * 0.9,
        height:300,
        marginVertical:Dimensions.get('window').height / 25
    },
    btn: {
        marginVertical:25
    },
    highlight: {
        color:Colors.primary
    },
    resulttext: {
        textAlign:'center',
        marginVertical:Dimensions.get('window').height / 45,
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;