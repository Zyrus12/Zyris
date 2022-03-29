import * as FileSystem from 'expo-file-system';
import {Text, View} from 'react-native';
import { useState } from "react";
import Butones from "../../styles/button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import * as mime from 'mime';
const DownloadButton = (props) =>{
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [started, setStarted] = useState(false);
    const [paused, setpaused] = useState(false);
    const [url, setUrl] = useState("");
    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress)
    };
        FileSystem.createDownloadResumable
    const [downloadResumable, setDownloadResumable] = useState(null);


    const saveFile = async () => {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          let directoryUri = permissions.directoryUri;
          const fileuri = await FileSystem.StorageAccessFramework.createFileAsync(directoryUri, props.data.filename, "application/octet-stream" );
          setUrl(fileuri);
          await downloadFile(fileuri);
        } else {
          return false;
        }
      }

  
    const downloadFile = async(file) =>{
  
        try {

                setStarted(true);
            const download = 
                FileSystem.createDownloadResumable(
                props.data.url,
                
                FileSystem.documentDirectory+props.data.filename,
                {},
                callback
                )
            setDownloadResumable(download);
            const { uri } = await download.downloadAsync();

            await FileSystem.writeAsStringAsync(file, await FileSystem.readAsStringAsync(FileSystem.documentDirectory+props.data.filename, { encoding: FileSystem.EncodingType.Base64 }), { encoding: FileSystem.EncodingType.Base64 });

            console.log('Finished downloading to ', uri);
            setStarted(false);
        } catch (e) {
            setStarted(false);
            console.error(e);
        }
    }
    const pause = async() =>{
        setpaused(true);
        try {
            await downloadResumable.pauseAsync();
            console.log('Paused download operation, saving for future retrieval');
            AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
            
            } catch (e) {
            console.error(e);
            }
            
    }
        
        
        
    const Resume = async()=>{
        setpaused(false);
        const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
        const downloadSnapshot = JSON.parse(downloadSnapshotJson);
        const downloadResumable = new FileSystem.DownloadResumable(
            downloadSnapshot.url,
            downloadSnapshot.fileUri,
            downloadSnapshot.options,
            callback,
            downloadSnapshot.resumeData
        );
        try {

            const { uri } = await downloadResumable.resumeAsync();
    
            await FileSystem.writeAsStringAsync(url, await FileSystem.readAsStringAsync(FileSystem.documentDirectory+props.data.filename, { encoding: FileSystem.EncodingType.Base64 }), { encoding: FileSystem.EncodingType.Base64 });

            setStarted(false);
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }
    }
    
    const Stop = async() =>{
        try{
            const r = await downloadResumable.cancelAsync();
            setStarted(false);
        }catch{
            console.log(e);
        }
    }

    return( 
    <View>
        {
        started?<>{paused?<Butones text="Resume" onPress={async()=>await Resume()}/>:
        <Butones text="Pause"  onPress={async()=>await pause()}/>}
        <Butones text="Stop" onPress={async()=>await Stop()}/></>:
        <Butones
            text="Download"
            onPress={async() => saveFile()}
        />}
         {downloadProgress>0 && downloadProgress<1?<Text>{(downloadProgress*100).toFixed(2)}%</Text>:downloadProgress>=1?<Text>Downloaded to Downloads folder</Text>:null}
    </View>);
}


export default DownloadButton;