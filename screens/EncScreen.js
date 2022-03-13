import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, TextInput } from 'react-native';
import Butones from '../styles/button';
import * as DocumentPicker from 'expo-document-picker';
import CryptoJs from 'crypto-js';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';



const EncScreen = ({navigation}) => {

  const[userInput,setUserInput] = useState(null)
  const [ doc, setDoc ] = useState({});


React.useEffect(async()=>{
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ])
    }catch (e){
      console.warn(e)
    }
  },[])

  const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
          if (response.type == 'success') {          
            let { name, size, uri } = response;
            let nameParts = name.split('.');
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
              name: name,
              size: size,
              uri: uri,
              type: fileType
            };
             setDoc(fileToUpload);
             console.log(fileToUpload)
          } 
        });
    
  }




const saveFile = async () => {
  let fileUri = doc.uri;
  console.log(fileUri)
  await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });
  const asset = await MediaLibrary.createAssetAsync(fileUri);
  console.log(asset)
  const album = await MediaLibrary.getAlbumAsync('Zyris Folder');
  if (album == null) {
    await MediaLibrary.createAlbumAsync('Zyris Folder', asset, false);
  } else {
    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
  } 
  

}


// .then(() => console.log('File Saved Successfully'))
  // .catch(() => console.log('Error in saving file'));

  function encryption(Message, Password){
    var salt = CryptoJs.lib.WordArray.random(128 / 8);
    var iv = CryptoJs.lib.WordArray.random(128 / 8);
    var key = CryptoJs.PBKDF2( Password, salt, {
      keySize: 128 / 32
    });

    var encrypted = CryptoJs.AES.encrypt( Message, key, { iv: iv });
    var finalEncryption = salt.toString() + iv.toString() + encrypted.toString()
    console.log(finalEncryption)
    console.log("==================================")
    return finalEncryption;
    
  }



    return(
    <View style={styles.container} >
      <StatusBar style="auto" />

      <View style={styles.card}>
          <Text style={styles.userName} >File Information</Text>  
          <Text style={styles.result}>File Name: {doc.name} </Text>
          <Text style={styles.result}>File Type: {doc.type} </Text>
          <Text style={styles.result}>File Size: {doc.size} </Text>

          <Butones
            text="Select File"
            onPress={pickDocument}
          />
      </View>

      <View style={styles.card}>
          <View style={styles.action}>
            <TextInput 
              placeholder="Enter password"
              placeholderTextColor="#000000"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setUserInput(val)}
            />
          </View>

            <Butones
              text="Encrypt"
              onPress={()=> encryption(doc.uri, userInput)}
            />

          <Butones
            text="Select File"
            onPress={saveFile}
          />
          
          
        </View> 
    </View>
    );
  }

export default EncScreen;

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