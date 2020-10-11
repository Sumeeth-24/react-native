import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,Button,KeyboardAvoidingView, ScrollView,TouchableWithoutFeedback,Keyboard, Alert, Dimensions} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed,setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 5);

    

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 5);
        };
    
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    const numberInputHandler = inputText =>{
        setEnteredValue(inputText.replace(/[^0-9]/g),'');
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{text: 'Okay', style:'destructive', onPress:resetInputHandler }])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
             <NumberContainer>{selectedNumber}</NumberContainer>
             <MainButton  onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <TitleText>Start a New Game!</TitleText>
             <Card style={styles.inputContainer}>
                  <BodyText>Select a Number</BodyText>
                <Input style={styles.input} 
                blurOnSubmit
                 autoCapitalize='none'
                 autoCorrect={false}
                  keyboardType="number-pad"
                   maxLength={2}
                   onChangeText={numberInputHandler}
                   value={enteredValue}
                   />
                <View style={styles.buttonContainer}>
                   <View style={{width: buttonWidth}}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/></View> 
                   <View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View> 
                </View>
            </Card>
           {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    )
};
const styles = StyleSheet.create({
   screen: {
       flex:1,
       padding:15,
       alignItems:'center'
   },
   title:{
    marginVertical:10,
    fontSize:20,
    fontFamily:'open-sans-bold'
   },
   inputContainer: {
      width:300,
      maxWidth:'80%',
      alignItems:"center",
      marginVertical:29
      
   },
   buttonContainer: {
       flexDirection:'row',
       width:'100%',
       justifyContent:"space-between",
       paddingHorizontal:15

   },
 //  button: {
      // width:100
   //   width: Dimensions.get('window').width /5
   //},
   input: {
       width:80,
       textAlign:"center",
       marginTop:10
   },
   summaryContainer: {
       marginTop:20,
       alignItems:"center"
   }
   
});

export default StartGameScreen;
