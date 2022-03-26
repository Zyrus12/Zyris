import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Butones from '../styles/button';
import CryptoJs from 'crypto-js';


const EncScreen = ({ navigation }) => {

  const [encKey, setEncKey] = useState(null);
  const [decKey, setDecKey] = useState(null);
  const [message, setMessage] = useState(null);
  const [ciphertext, setCiphertext] = useState(null);
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");


  function encryption(Message, Password) {
    try{
      if(Message == null || Password == null){
        alert("Please make sure you enter Message and Password");
        return false;
      }else{
  
      var salt = CryptoJs.lib.WordArray.random(128 / 8);
      var iv = CryptoJs.lib.WordArray.random(128 / 8);
      var key = CryptoJs.PBKDF2(Password, salt, {
        keySize: 128 / 32
      });
  
      var encrypted = CryptoJs.AES.encrypt(Message, key, { iv: iv });
      var finalEncryption = salt.toString() + iv.toString() + encrypted.toString()
      setEncrypted(finalEncryption);
      return finalEncryption;
    }
    }catch(e){
      console.error(e)
    }
}


  function decryption(finalEncryption, Password) {
    try{
      if(finalEncryption == null || Password == null){
        alert("Please make sure you enter a Cipher and a Password")
        return false;
      }else{
      var salt = CryptoJs.enc.Hex.parse(finalEncryption.substr(0, 32))
      var iv = CryptoJs.enc.Hex.parse(finalEncryption.substr(32, 32))
      var encrypted = finalEncryption.substr(64)
  
      var key = CryptoJs.PBKDF2(Password, salt, {
        keySize: 128 / 32
      });
  
  
      var decrypted = CryptoJs.AES.decrypt(encrypted, key, { iv: iv });
      var finalDecrypted = decrypted.toString(CryptoJs.enc.Utf8);
  
      if(decrypted == ""){
        alert("Wrong password!")
      }else{
      setDecrypted(finalDecrypted);
      return decrypted;
      }
    }
    }catch(e){
      console.error(e)
    }   
}


  return (
    <ScrollView style={styles.scroller}>
      <View style={styles.container} >
        <StatusBar style="auto" />

        <View style={styles.card}>
          <Text style={styles.userName} >Encryption</Text>

          <View style={styles.action}>
            <TextInput
              placeholder="Enter message"
              placeholderTextColor="#000000"
              multiline={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setMessage(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#000000"
              multiline={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setEncKey(val)}
            />
          </View>

          <Butones
            text="Encrypt"
            onPress={() => encryption(message, encKey)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.userName} >Ciphertext</Text>
          <Text style={styles.result} selectable={true} > {encrypted} </Text>
        </View>


        <View style={styles.card}>
          <Text style={styles.userName} >Decryption</Text>

          <View style={styles.action}>
            <TextInput
              placeholder="Enter ciphertext"
              placeholderTextColor="#000000"
              multiline={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setCiphertext(val)}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#000000"
              multiline={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setDecKey(val)}
            />
          </View>

          <Butones
            text="Decrypt"
            onPress={() => decryption(ciphertext, decKey)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.userName} >Plaintext</Text>
          <Text style={styles.result} selectable={true} > {decrypted} </Text>
        </View>


      </View>
    </ScrollView>
  );
}

export default EncScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',

    padding: 20,

  },
  scroller: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .9)',
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
    textAlign: 'left',
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