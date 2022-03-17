import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, TextInput, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Butones from '../styles/button';
import Butonez from '../styles/buttonz';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const DecScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState(null)
  const [data, setData] = useState({});
  const [onLoading, setonLoading] = useState(false);
  const [url, setUrl] = useState(null)

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

  const pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
    setData(result);
  }
  function blobToBase64(result) {
    return new Promise(async (resolve, _) => {
      console.log(result.uri);
      const response = await fetch(result.uri);

      const blob = await response.blob();

      resolve(blob);
    });
  }
  function encryption(file) {
    setonLoading(true);
    blobToBase64(file).then(async (result) => {
      const form = new FormData();
      form.append(file.name, result, userInput);
      axios.post("https://zyris-backend.herokuapp.com/enc",
        form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        setUrl(response.data.url);
        setonLoading(false);
      })
    });
  }

  return (
    <ScrollView style={styles.scroller}>
      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity style={{ backgroundColor: 'rgba( 0, 0, 0, 0)', flex: 1 }} onPress={() => setModalVisible(!modalVisible)} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Encrypt or Decrypt?</Text>
              <View style={styles.action3}>
                <View style={{ flex: 1 }}>
                  <Butonez
                    text="Encrypt"
                    onPress={() => encryption(data)}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Butonez
                    text="Decrypt"
                    onPress={pickDocument}
                  />
                </View>

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
            text="Upload"
            onPress={() => setModalVisible(true)}
          />
          <Text selectable={true} selectTextOnFocus={true} style={styles.result} >{url}</Text>

        </View>
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