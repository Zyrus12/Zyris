import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, TextInput, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Butones from '../styles/button';
import Butonez from '../styles/buttonz';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from "expo-web-browser";
const DecScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState("")
  const [data, setData] = useState({});
  const [onLoading, setonLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [pass, setPass] = useState({});
  const [progressEncDec, setProgressEncDec] = useState(0);
  const [progressUplaod, setProgressUpload] = useState(0);
  const [encryptingSave, setencryptingSave] = useState(false);
  const [encrypting, setEncrypting] = useState("");
  React.useEffect(async () => {

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ])

    } catch (e) {
      console.warn(e)
    }
   
  }, [])
  React.useEffect(async ()=>{
    let req = await axios.get(`https://zyris-backend.herokuapp.com/files?id=${await AsyncStorage.getItem("USER_ID")}`);
    let obj = {};
    let data = req.data;
    for(let i of data)
      obj[i.filename] = ""
    setPass(obj);
    setFiles(data);
  }, [])

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
    setData(result);
  }
  function blobToBase64(result) {
    return new Promise(async (resolve, _) => {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      resolve(blob);
    });
  }
  function save(file, check) {
    setonLoading(true);
    blobToBase64(file).then(async (result) => {
      const form = new FormData();
      form.append(file.name, result, userInput);
      let req = await axios.post(`http://localhost:8002/enc?id=${await AsyncStorage.getItem('USER_ID')}&encrypt=${check}`,
        form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
          onUploadProgress: progressEvent => {
            setProgressUpload((progressEvent.loaded / progressEvent.total) * 100);
          }
      })
      let obj = {};
      let data = req.data;
      for(let i of data)
        obj[i.filename] = ""
      setPass(obj);
      setFiles(data);
      setencryptingSave(false);
      setonLoading(false);
      setProgressUpload(0);
      setModalVisible(false);
    });
  }

  const update = async (file, pw) =>{
    let req = await axios.post(`http://localhost:8002/encryptdecrypt`,{
        id: await AsyncStorage.getItem('USER_ID'),
        pw: pw,
        filename: file
      }, {
        onUploadProgress: progressEvent => {
          setProgressEncDec((progressEvent.loaded / progressEvent.total) * 100);
        }
      });
      let obj = {};
      let data = req.data;
      for(let i of data)
        obj[i.filename] = ""
      setPass(obj);
      setProgressEncDec(0);
      setFiles(data);
  }
  const deleteItem= async ( name) =>{
    setEncrypting("Deleting....");
    setProgressEncDec(101);
    let req = await axios.post(`http://localhost:8002/delete`,{
        id: await AsyncStorage.getItem('USER_ID'),
        name: name
      });
      let obj = {};
      let data = req.data;
      for(let i of data)
        obj[i.filename] = ""
      setPass(obj);
      setProgressEncDec(0);
      setFiles(data);
  }
  return (
    <ScrollView style={styles.scroller}>
      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity style={{ backgroundColor: 'rgba( 0, 0, 0, 0)', flex: 1 }}  >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Do you want to encrypt the file?</Text>
           
              {progressUplaod>0?  progressUplaod>=100?
              encryptingSave?
              <View style={styles.action}>
                <Text style={{color:'white'}}>Encrypting...</Text>
              </View>:
              <View style={styles.action}>
                <Text style={{color:'white'}}>Finishing...</Text>
              </View>
              : <View style={styles.action}>
                <Text style={{color:'white'}}>Uploading: {progressUplaod.toFixed(2)}%</Text>
              </View>:
              <>
                 <View style={styles.action}>
                 <TextInput
                     placeholder="Enter password"
                     placeholderTextColor="lightgrey"
                     style={styles.textInput}
                     value={userInput}
                     autoCapitalize="none"
                     onChangeText={(val) => setUserInput(val)}
                   />
               </View>
              <View style={styles.action3}>
                <View style={{ flex: 1 }}>
                  <Butonez
                    text="Yes"
                    onPress={() => {setencryptingSave(true);save(data, true);}}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Butonez
                    text="No"
                    onPress={()=>save(data, false)}
                  />
                </View>
              
              </View>
              </>
              }
              <View style={{ flex: 1 }}>
                  <Butonez
                    text="Close"
                    onPress={()=>setModalVisible(false)}
                  />
                </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.userName} >File Information</Text>
          <Text style={styles.result}>File Name: {data.name} </Text>
          <Text style={styles.result}>File Type: {data.type} </Text>
          <Text style={styles.result}>File Size: {data.size} </Text>

          <Butones
            text="Select File"
            onPress={pickDocument}
          />
          {"name" in data?
          <Butones
            text="Upload"
            onPress={() => setModalVisible(true)}
          /> :null 
          }
        </View>

        {/* <View style={styles.card}>
          <Text selectable={true} selectTextOnFocus={true} style={styles.result} >{url}</Text>

        </View> */}
        {progressEncDec>0?
        progressEncDec>=100?
        <View style={styles.action}>
            <Text style={{color:'white'}}>{encrypting}</Text>
        </View>:
        <View style={styles.action}>
            <Text style={{color:'white'}}>Uploading: {progressEncDec.toFixed(2)}%</Text>
        </View>:
        files.map((data, index)=>{
          return(
          <View style={styles.card} key={index}>
          <View style={styles.action}>
            <Text>{data.filename}</Text>
          </View>
          <View style={styles.action}>
          <TextInput
              placeholder="Enter password"
              placeholderTextColor="black"
              style={styles.textInput2}

              autoCapitalize="none"
              onChangeText={(val) => pass[data.filename] = val}
          />
          </View>
          
          <Butones
            text={data.encrypt?"Decrypt":"Encrypt"}
            onPress={() => {setEncrypting(data.encrypt?"Decrypting....":"Encrypting....");update(data.filename, pass[data.filename]);}}
          />
          <Butones
            text={"Download"}
            onPress={() => WebBrowser.openBrowserAsync(data.url)}
          />
          <Butones
            text={"Delete"}
            onPress={() => deleteItem(data.filename)}
          />
        </View>);
        })}
         
      </View>
    </ScrollView>
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
    // justifyContent: 'center',
    padding: 20,

  },
  textInput: {
    flex: 1,
    paddingLeft: 8,
    color: 'white',
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
    borderBottomColor: 'white',
    paddingBottom: 5,
    marginBottom: 10,
    marginLeft: '8%',
    marginRight: '8%',
  },
  action3: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 5,
    marginBottom: 10,
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
  modalView: {
    marginTop: 75,
    margin: 20,
    backgroundColor: "rgba( 0, 0, 0, .9)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    borderWidth: 2,
    borderColor: "#83EEFF",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 30,
    textAlign: "center",
    color: "#83EEFF",
  }
});