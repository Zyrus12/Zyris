import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, props, Alert, Button, StatusBar, StatusBarIOS, ScrollView, TouchableOpacity} from 'react-native';

const DeveloperScreen = ({navigation}) => {
    return(
      <View style={{flex: 1}}>
        <StatusBar hidden={false}/>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
        >
          <Image style={styles.userImg} source={require('../assets/jacob.png')} ></Image>
          <Text style={styles.userName} >Bascuguin, John Jacob E.</Text> 
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem} >
                <Text style={styles.userInfoTitle} >Designer / Idea</Text>
              </View>
             
            </View>
          <Image style={styles.userImg} source={require('../assets/zyrus.jpg')} ></Image>
          <Text style={styles.userName} >Gremio, Zyrus D.</Text>
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem} >
                <Text style={styles.userInfoTitle} >Main Programmer / Backend & Frontend</Text>
             
              </View>
             
            </View>
          <Image style={styles.userImg} source={require('../assets/tristan.jpg')} ></Image>
          <Text style={styles.userName} >Sidamon, Tristan "VJ"</Text> 
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem} >
                <Text style={styles.userInfoTitle} >Designer / Researcher</Text>
      
              </View>
          
            </View>

        </ScrollView>
      </View>
    );
  };

export default DeveloperScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .9)',
    padding: 20,
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
    marginTop: 10,
    marginBottom: 12,
    color: '#83EEFF',
  },
  aboutUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
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







