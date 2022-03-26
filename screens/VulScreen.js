import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Butones from '../styles/button';
import zxcvbn from 'zxcvbn';


const VulScreen = ({navigation}) => {

  const[userInput,setUserInput] = useState(null)
  const[warning,setWarning] = useState([])
  const[crackTime,setCrackTime] = useState({})
  const[score,setScore] = useState("")
  const[sequence,setSequence] = useState([{},{}])
  const[suggestions,setSuggestions] = useState([])

  

 function checkPassword (){
  
  if(userInput == null){
    alert("Please enter a password.")
    return false;
  }else{
    const evaluation = zxcvbn(userInput)
    setWarning(evaluation.feedback.warning)
    setSuggestions(evaluation.feedback.suggestions)
    setCrackTime(evaluation.crack_times_display)
    setSequence(evaluation.sequence)
    setScore(evaluation.score==0 || evaluation.score==1?"Weak":evaluation.score==2?"Fair":evaluation.score==3?"Good":evaluation.score==4?"Strong":"Weak")
  }
 }


 

    return(
      <ScrollView style={styles.scroller}>
          <View style={styles.container}>
           
            <View style={styles.card}>
            <View style={styles.action}>
            <TextInput 
                    placeholder="Input Password Here"
                    placeholderTextColor="#000000"
                    multiline={true}
                    style={styles.textInput}
                    autoCapitalize="none"                   
                    onChangeText={(val) => setUserInput(val)}
                />
                </View>
            <Butones
              text="Check Password"
              onPress={()=>  checkPassword()}
            />
            <StatusBar style="auto" />
            </View>
            <View style={styles.card}>
            <Text style={styles.userName} >Strength Evaluation</Text>  
            <Text style={styles.result}>Your password is: {score}</Text>    
            </View>
            
         
            <View style={styles.card}>
            <Text style={styles.userName} >Feedback</Text>     
            <Text style={styles.result}>Warning: {warning}</Text>   
            <Text style={styles.result}>Suggestions: {suggestions}</Text>   
            </View>
          

            <View style={styles.card}>
            <Text style={styles.userName} >Estimation of Crack Time</Text>     
            <Text style={styles.result}>Crack Time: {crackTime.offline_fast_hashing_1e10_per_second}</Text>   
            </View>

            <View style={styles.card}>
            <Text style={styles.userName} >Sequence</Text>     
            <Text style={styles.result}>Pattern Identified: {sequence[0].pattern}</Text> 
            <Text style={styles.result}>Token: {sequence[0].token} </Text>    
            </View>

        
          </View>
          </ScrollView>
    );
  }
export default VulScreen;

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
    textAlign:'justify',
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