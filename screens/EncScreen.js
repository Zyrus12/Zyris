import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, TextInput } from 'react-native';
import Butones from '../styles/button';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
const EncScreen = ({navigation}) => {

  const[userInput,setUserInput] = useState(null)
  const [data, setData] = useState({});
  const [onLoading, setonLoading] = useState(false);
  const [url, setUrl] = useState(null)
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
    
     let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
      setData(result);
    }
  function blobToBase64(result) {
    return new Promise(async(resolve, _) => {
      console.log(result.uri);
      const response = await fetch(result.uri);
    
      const blob = await response.blob();
      
      resolve(blob);
    });
  }
  function encryption(file){
    setonLoading(true);
    blobToBase64(file).then(async(result)=>{
      const form = new FormData();
      form.append(file.name, result, userInput);
      axios.post("https://zyris-backend.herokuapp.com/enc", 
        form,{
          headers: {
            'Content-Type':'multipart/form-data'
          }}).then((response)=>{
            setUrl(response.data.url);
          setonLoading(false);
        })
      });
    }

  // , ).then((res)=>{
//       console.log(res.data)
//     })
// }
//   function dataURLtoFile(dataurl, filename) {
 
//     var arr = dataurl.split(','),
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), 
//         n = bstr.length, 
//         u8arr = new Uint8Array(n);
        
//     while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
    
//     return new File([u8arr], filename, {type:mime});
// }

// const atob = (base64) => {
//   return Buffer.from(base64, 'base64').toString('binary');
// };

    return(
    <View style={styles.container} >
      <StatusBar style="auto" />

      <View style={styles.card}>
          <Text style={styles.userName} >File Information</Text>  
          <Text style={styles.result}>File Name: {data.name} </Text>
          <Text style={styles.result}>File Type: {data.type} </Text>
          <Text style={styles.result}>File Size: {data.size} </Text>

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
              onPress={()=> encryption(data)}
            />
          <Text selectable={true} selectTextOnFocus={true}  style={styles.result} >{url}</Text>
          
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