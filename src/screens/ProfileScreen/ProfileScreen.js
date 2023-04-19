import React from 'react';
import {View, Text, Alert, Pressable} from 'react-native';
import { Card, Icon } from 'react-native-elements'
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const EMAIL_REGEX = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const ProfileScreen = ({ route, navigation }) => {
    const {control, handleSubmit} = useForm();
    const [username, onChangeUserName] = React.useState(route.params.params.userName);
    const [name, onChangeName] = React.useState(route.params.params.name);
    const [email, onChangeEmail] = React.useState(route.params.params.email);
    const [number, onChangeNumber] = React.useState(route.params.params.phone_number);

    const onUpdateProfilePress = async () => {
        console.log(username);
        console.log(email);
        if(!validateEmail(email)) {
            Alert.alert('Please enter a valid email.');
        } else if(!username || !name) {
            Alert.alert('Username and Name cannot be empty.');
        } else {
            try {
                const user = await Auth.currentAuthenticatedUser();
                await Auth.updateUserAttributes(user, {
                    'preferred_username': username,
                    'name': name,
                    'email': email,
                    'phone_number': number,
                });
                Alert.alert('Successfully updated profile.');
            } catch (e) {
                Alert.alert('Error', e.message);
            }
        }
    }

    const validateEmail = (text) => {
        return EMAIL_REGEX.test(text);
    };

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 24, alignSelf: 'center'}}>Hi {name}, welcome to your profile</Text>
            <View style={styles.row}>
                <Text>Username:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUserName}
                    value={username}
                    control={control}
                />
            </View>
            <View style={styles.row}>
                <Text>Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                    control={control}
                />
            </View>
            <View style={styles.row}>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    control={control}
                />
            </View>
            <View style={styles.row}>
                <Text>Number:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    control={control}
                />
            </View>
            
            <CustomButton
                text="Update Profile"
                onPress={handleSubmit(onUpdateProfilePress)}
            />
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