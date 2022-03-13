import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';





export function DrawerContent(props) {



    return(
        <View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, 0.88)'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 20}}>
                            <Avatar.Image 
                                backgroundColor='rgba(131, 238, 255, 0.8)'
                                source={require('../assets/hey.png')}
                                size={100}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Z.Y.R.I.S.</Title>
                                <Caption style={styles.caption}>Protect Yourself</Caption>
                            </View>
                        </View>

                      
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="ios-home-outline" 
                                color="#83EEFF"
                                size={size}
                                />
                            )}
                            labelStyle={{
                                color: "#83EEFF",
                                fontSize: 18
                            }}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="people-circle-outline" 
                                color="#83EEFF"
                                size={size}
                                />
                            )}
                            labelStyle={{
                                color: "#83EEFF",
                                fontSize: 18
                            }}
                            label="Developers"
                            onPress={() => {props.navigation.navigate('Developer')}}
                        />
                       
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="ios-log-out-outline" 
                        color= "#83EEFF"
                        size={size}
                        />
                    )}
                    labelStyle={{
                        color: "#83EEFF"
                    }}
                    label="Sign Out"
                    onPress={() =>  BackHandler.exitApp()}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      borderBottomColor: "#83EEFF",
      borderBottomWidth: 1.5,
      paddingBottom: 23,
    },
    title: {
      fontSize: 23,
      marginTop: 20,
      marginBottom: 5,
      fontWeight: 'bold',
      color:"#83EEFF"
    },
    caption: {
      paddingTop: 10,
      fontSize: 16,
      lineHeight: 16,
      color: "#83EEFF"
    },
    caption1: {
        fontSize: 17,
        lineHeight: 17,
        color:"#83EEFF"
      },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
      position:'relative'
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 5,
      fontSize: 20,
      color:"#83EEFF"
      
    },
    drawerSection: {
      marginTop: 10,
    },
    bottomDrawerSection: {
        borderTopColor: "#83EEFF",
        borderTopWidth: 1.5,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });