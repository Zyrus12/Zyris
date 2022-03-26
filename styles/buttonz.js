import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';


export default function Butonez({ text, onPress }) {
    return (

        <TouchableOpacity onPress={onPress} style={styles.pos}>
            <View style={styles.button}>
                <Text style={styles.buttonText} > {text}  </Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, .8)",
        borderColor: "rgba(131, 238, 255, 1)",
        borderWidth: 2,
        width: '85%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',

        marginBottom: 5,
        marginTop: 5,
    },
    buttonText: {
        color: "rgba(131, 238, 255, 0.8)",
        textAlign: "center",
        fontSize: 12,
        paddingBottom: 1,
        fontWeight: 'bold',
    },
    pos: {
        alignItems: 'center',
        justifyContent: 'center',
    },

})