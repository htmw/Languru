import React from 'react';
import {View, Text, Alert, Pressable} from 'react-native';
import { Card, Icon } from 'react-native-elements'
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';




const ProfileScreen = (props) => {
    const [username, onChangeUserName] = React.useState('musa');
    const [name, onChangeName] = React.useState('Musa Tarar');
    const [email, onChangeEmail] = React.useState('musansht@gmail.com');
    const [number, onChangeNumber] = React.useState('0321 8338181');
    const [buttonText, onChangeButtonText] = React.useState('Update Profile');
    const sendAlert = (me) => {
        console.log(me.value)
        Alert.alert('Update Profile', 'Confirm changes to profile?', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'OK', onPress: () => onChangeButtonText('Successfully updated')},
        ]); 
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 24, alignSelf: 'center'}}>Hi Musa, welcome to your profile</Text>
            <View style={styles.row}>
                <Text>Username:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUserName}
                    value={username}
                />
            </View>
            <View style={styles.row}>
                <Text>Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                />
            </View>
            <View style={styles.row}>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                />
            </View>
            <View style={styles.row}>
                <Text>Number:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                />
            </View>
            <Pressable style={styles.button} onPress={sendAlert} text = {"Update"}>
                <Text>{buttonText}</Text>
            </Pressable>
        </View>
        
    );
}


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: "60%",
      right: -10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        textAlign: "left",
        display: "inline-flex",
        alignItems: "center"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#ADD8E6',
      },
  });

export default ProfileScreen;