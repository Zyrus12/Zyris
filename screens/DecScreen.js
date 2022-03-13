import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, TextInput } from 'react-native';
import Butones from '../styles/button';
import * as DocumentPicker from 'expo-document-picker';
import CryptoJs from 'crypto-js';

const DecScreen = ({navigation}) => {

  const[userInput,setUserInput] = useState(null)
  const[keyPassword,setKeyPassword] = useState(null)

  function decryption(finalEncryption, Password){
    var salt = CryptoJs.enc.Hex.parse(finalEncryption.substr(0,32))
    var iv = CryptoJs.enc.Hex.parse(finalEncryption.substr(32,32))
    var encrypted = finalEncryption.substr(64)

    var key = CryptoJs.PBKDF2( Password, salt, {
      keySize: 128 / 32
    });
 

    var decrypted = CryptoJs.AES.decrypt(encrypted, key, {iv: iv});
    
    console.log("Decypted: " + decrypted.toString(CryptoJs.enc.Utf8))
    return decrypted;
  }

    return(
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.card}>
          <Text style={styles.userName} >Decryption</Text>  
          <View style={styles.action}>
            <TextInput 
              placeholder="Enter Cipher"
              placeholderTextColor="#000000"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setUserInput(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput 
              placeholder="Enter Password"
              placeholderTextColor="#000000"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setKeyPassword(val)}
            />
          </View>
            <Butones
              text="Dec"
              onPress={()=> decryption(userInput, keyPassword)}
            />
        </View>

      </View>
    );
  }

export default DecScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .9)',
    alignItems: 'center',
   // justifyContent: 'center',
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
  card:{
    backgroundColor: 'rgba(131, 238, 255, 0.8)',
    width: "100%",
    marginBottom: 20,
    borderRadius:10,
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
    textAlign:'left',
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