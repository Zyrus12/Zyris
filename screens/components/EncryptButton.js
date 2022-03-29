import React, { useState } from 'react';
import { Text} from 'react-native';
import Butones from '../../styles/button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EncryptButton = (props) =>{
    const [encrypting, setEncrypting] = useState("");
    const update = async (file, pw) =>{
        let req = await axios.post(`http://localhost:8002/encryptdecrypt`,{
            id: await AsyncStorage.getItem('USER_ID'),
            pw: pw,
            filename: file
      });
          let obj = {};
          let data = req.data;
          console.log(data);
          for(let i of data)
            obj[i.filename] = ""
          props.setPass(obj);
          setEncrypting("");
          props.setFiles(data);
      }

      const deleteItem= async ( name) =>{
        setEncrypting("Deleting....");
        let req = await axios.post(`https://zyris-backend.herokuapp.com/delete`,{
            id: await AsyncStorage.getItem('USER_ID'),
            name: name
          });
          let obj = {};
          let data = req.data;
          for(let i of data)
            obj[i.filename] = ""
          props.setPass(obj);
          setEncrypting("");
          props.setFiles(data);
      }
    return( 
    encrypting.length>0?
        <Text>{encrypting}</Text>:
      <>
        <Butones
        text={props.data.encrypt?"Decrypt":"Encrypt"}
        onPress={() => {setEncrypting(props.data.encrypt?"Decrypting....":"Encrypting....");update(props.data.filename, props.pass[props.data.filename]);}}
        />
        <Butones
        text="Delete"
        onPress={()=>deleteItem(props.data.filename)}/>
      </>)
      
}

export default EncryptButton;