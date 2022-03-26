import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Butones from '../styles/button';
import generatePasswords from '../functions/PasswordGenerator';


const HomeScreen = ({ navigation }) => {

  const [userInput, setUserInput] = useState(null)
  const [passwords, setPasswords] = useState([])



  function userInputValidation(input) {
    if(input == null){
      alert("Please enter keywords")
      return false;
    }

    let numberOfInput = input.split(",").length - 1;
    let userInput = input.split(",");

    if (numberOfInput != 6) {
      alert("Please enter only 5 keywords and 2 pairs of numbers");
      return false;
    } else {
      setPasswords(generatePasswords(input, 5))
      return true;
    }
  }


  return (

    <View style={styles.container} >
      <View style={styles.card}>
        <Text style={styles.userName} >Note!</Text>
        <Text style={styles.aboutUser} >Please enter five different keywords and two numbers and use "," as separator. {"\n"}
          (Ex. Flower,Guitar,Rose,Console,Steak,12,25)
        </Text>
        <StatusBar style="auto" />
      </View>

      <View style={styles.card}>
        <View style={styles.action}>
          <TextInput
            placeholder="Input Keyword Here"
            placeholderTextColor="#000000"
            multiline={true}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setUserInput(val)}
          />
        </View>
        <Butones
          text="Generate"
          onPress={() => userInputValidation(userInput)}
        />

        <StatusBar style="auto" />
      </View>

      <View style={styles.card}>
        <Text style={styles.userName} >Generated Password</Text>

        {passwords.map((d, i) => <Text selectable={true} selectTextOnFocus={true} key={i} style={styles.result} >{d}</Text>)}


        <StatusBar style="auto" />
      </View>
    </View>

  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .9)',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    flex: 1,
    paddingLeft: 8,
    color: '#000000',
    fontSize: 12,

  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: '#000000',
    paddingBottom: 5,
    marginBottom: 10,
    marginLeft: '8%',
    marginRight: '8%',
  },
  card: {
    backgroundColor: 'rgba(131, 238, 255, 0.8)',
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    paddingBottom: 8,
    paddingTop: 8
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#83EEFF',
    marginTop: 25

  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 8,
    color: 'black',
    textAlign: 'center'
  },
  aboutUser: {
    fontSize: 12,
    textAlign: 'justify',
    marginBottom: 10,
    color: 'black',
    marginLeft: '10%',
    marginRight: '10%'
  },
  result: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
    marginLeft: '10%',
    marginRight: '10%'
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5,
    marginTop: 10,
  },
  userBtn: {
    borderColor: 'rgba(255,192,203, .7)',
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#fff',
    padding: 5,
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingBottom: 15,
    borderBottomColor: '#83EEFF'
  },
  userInfoItem: {
    justifyContent: 'center',

  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'rgba(131, 238, 255, 0.8)',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',

  },
});