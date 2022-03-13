import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Dimensions } from 'react-native'
const widthP = Dimensions.get('window').width;
const heightP = Dimensions.get('window').height;

export default function Butones({text, onPress}){
    return (
        <TouchableOpacity onPress={onPress} style={styles.pos}>
            <View style={styles.button}>
                <Text style={styles.buttonText} > {text}  </Text> 
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, .8)",
        borderColor: "black",
        borderWidth: 2,
        width: '35%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        
        marginBottom: 10,
        marginTop:10,
    },
    buttonText:{
        color: "rgba(131, 238, 255, 0.8)",
        textAlign: "center",
        fontSize: 12,
        paddingBottom: 1,
        fontWeight: 'bold',
    },
    pos:{
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    
})