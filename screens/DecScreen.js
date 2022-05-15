import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Butones from '../styles/button';
import Butonez from '../styles/buttonz';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as mime from 'mime';
import CryptoJs from 'crypto-js';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';

const DecScreen = ({ navigation }) => {
 
  const[showPassword,setShowPassword] = useState(true)
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("")
  const [data, setData] = useState({});
  const [base64, setBase64] = useState("");
  const [finalBase64, setFinalBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [finalFileName, setFinalFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [fileMime, setFileMime] = useState("");
  const [finalData, setFinalData] = useState("");

  function showPass (){
    setShowPassword(!showPassword)
  }

  const pickDocument = async () => {
    setData({});
    //Getting the document and other information.
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
    setData(result);
    setFileName(result.name);
    
    //Encoding the file into base 64
    const data = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });
    setBase64(data)

    //Getting the orignal extension or Mime Type of the file.
    const mimeType = mime.getType(result.name);
    setFileMime(mimeType)
    
    //Refreshing the screen
    setFinalFileName("")
    setUserInput("")
  }

  function encryptFile(input) {
    try{
      const validation = ".encrypted"
      if(input == ""){
        alert("Please enter a password")      
      }else if(input.indexOf(" ") >= 0){
        alert("You cannot enter a space in password.")
        setUserInput("")
      }else if(fileName.includes(validation) == true){
        alert("You cannot encrypt an encrypted file. Please choose another file.");  
        setUserInput("")
      }else if(data.size >= 8e+7){
        alert("The limit of file encryption is only 80MB. Please choose another file.")
        setUserInput("")
      }else{
      setLoading(true);
      //Setting up Encrypted File Name
      const gettingFileName = fileName;
      const gettingEncFileName = gettingFileName.slice(0, -4);
      const finalEncFileName = gettingEncFileName + ".encrypted";
      setFinalFileName(finalEncFileName);
  
  
      //Adding the original extention or mime type of the file to the base64 value
      const mimeType = fileMime;
      const toWordArr = CryptoJs.enc.Utf8.parse(mimeType);
      const toBase64 = CryptoJs.enc.Base64.stringify(toWordArr);
      const finalData = base64 + "|" + toBase64;
      //setFinalBase64(finalData);
  
  
      //Adding custom extension or Mime Type
      const customExtension = "application/zyris";
      setFileExtension(customExtension)
  
  
      //Encrypting the file
      encryption(finalData, input);
      setTimeout(() => {
        setLoading(false)
      }, 2500);
    }
    }catch(e){
      console.error(e)
    }
}

  function decryptFile(input){
 
      const validation = ".encrypted"
      if(input == ""){
        alert("Please enter a password")      
      }else if(input.indexOf(" ") >= 0){
        alert("You cannot enter a space in password.")
        setUserInput("")
      }else if(fileName.includes(validation) == false){
        alert("You cannot decrypt an non encrypted file. Please choose another file");  
        setUserInput("")
      }else{
      setLoading(true)
      try{
        //Decrypting the file
        var validationBase64 = decryption(base64, input)
        const gettingMimeType = validationBase64.split("|");
        const mimeType = gettingMimeType[1];
        const parseWordArr = CryptoJs.enc.Base64.parse(mimeType);
        const finalMimeType = parseWordArr.toString(CryptoJs.enc.Utf8);
        setFileExtension(finalMimeType);
        setFinalData(gettingMimeType[0])

        //Setting up Decrypted File Name
        const gettingFileName = fileName;
        const gettingDecFileName = gettingFileName.replace(".encrypted", "");
        setFinalFileName(gettingDecFileName)
        setTimeout(() => {
          setLoading(false)
        }, 2500);
      }catch(e){
        setLoading(false)
        alert("Wrong password. Please enter the right password");
        setFinalFileName("")
      }
    }
   
}

  function encryption(Message, Password) {

    var salt = CryptoJs.lib.WordArray.random(128 / 8);
    var iv = CryptoJs.lib.WordArray.random(128 / 8);
    var key = CryptoJs.PBKDF2(Password, salt, {
      keySize: 128 / 32
    });


    var encrypted = CryptoJs.AES.encrypt(Message, key, { iv: iv });
    var finalEncryption = salt.toString() + iv.toString() + encrypted.toString()
    setFinalData(finalEncryption);
    return finalEncryption;
  }

  function decryption(finalEncryption, Password) {
    try{
      var salt = CryptoJs.enc.Hex.parse(finalEncryption.substr(0, 32))
      var iv = CryptoJs.enc.Hex.parse(finalEncryption.substr(32, 32))
      var encrypted = finalEncryption.substr(64)

      var key = CryptoJs.PBKDF2(Password, salt, {
        keySize: 128 / 32
      });

      var decrypted = CryptoJs.AES.decrypt(encrypted, key, { iv: iv });
      var finalDecrypted = decrypted.toString(CryptoJs.enc.Utf8);
      return finalDecrypted;
    }catch(e){
      return null;
    }
     
      
   
    

    
   
  
}

  const saveFile = async () => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    // Check if permission granted
    if (permissions.granted) {
      // Get the directory uri that was approved
      let directoryUri = permissions.directoryUri;
      // Create file and pass it's SAF URI
      await StorageAccessFramework.createFileAsync(directoryUri, finalFileName, fileExtension).then(async(fileUri) => {
      // Save data to newly created file
       await FileSystem.writeAsStringAsync(fileUri, finalData, { encoding: FileSystem.EncodingType.Base64 });
       setFinalFileName("")
       setUserInput("")
      })
      .catch((e) => {
        console.log(e);
      });
    } else {
      alert("You must allow permission to save.")
    }
  }

 

  return (
    <>
    <ScrollView style={styles.scroller}>
      <StatusBar style="auto" />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.userName} >File Information</Text>
          <Text style={styles.result}>File Name: {data.name} </Text>
          <Text style={styles.result}>File Size: {data.size} </Text>
          <Text style={styles.result}>File Type: {data.mimeType} </Text>
  
          <Butones
            text="Select File"
            onPress={pickDocument}
          />
      </View> 
          {"name" in data?
          <View style={styles.card}>
          <Text style={styles.userName} >Enter Password</Text>
              <View style={styles.action}>
              <Feather 
              name="lock"
              color="#000000"
              size={18}
            />
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor="#000000"
                  value={userInput}
                  secureTextEntry={showPassword}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => setUserInput(val)}
                />
                <TouchableOpacity onPress={showPass}>
            {showPassword ? 
            <Feather 
            name="eye-off"
            color="#000000"
            size={18}
            /> : 
            <Feather 
              name="eye"
              color="#000000"
              size={18}
            />
            }
            </TouchableOpacity>
              </View>

          <View style={styles.action3}>
          <View style={{flex: 1}}>
          <Butonez
            text="Encrypt"
            onPress={() => encryptFile(userInput)}
          />
          </View>

          <View style={{flex: 1}}>
          <Butonez
            text="Decrypt"
            onPress={() => decryptFile(userInput)}
          />
          </View>
          </View>

      </View> 
            :null 
          }
          {finalFileName != ""?
         
            <View style={styles.card}>
            <Text style={styles.userName} >Processed File</Text>
            <Text style={styles.result}>File Name: {finalFileName} </Text>
            <Text style={styles.result}>File Type: {fileExtension} </Text>
    
            <Butones
              text="Save File"
              onPress={() => saveFile()}
            />
        </View>
          : null
          }

            
      </View>
    </ScrollView>

    {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../assets/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}

    </>
  );
}

export default DecScreen;

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .9)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,

  },
  constainer1: {
    backgroundColor: "rgba(0, 0, 0, .1)",
    justifyContent: "center",
    alignContent: "center",
    flex: 2
  },
  textInput: {
    flex: 1,
    paddingLeft: 8,
    color: '#000000',
    fontSize: 12,
  },
  textInput2: {
    flex: 1,
    paddingLeft: 8,
    color: 'white',
    fontSize: 12,
    width: '70%'
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
  action3: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
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