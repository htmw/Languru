import React from 'react';
import {View, Text, Alert, Image, Pressable} from 'react-native';
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
        <View style={styles.container}>
     <Image
        source={{ uri: 'https://www.bootdey.com/image/900x400/FF7F50/000000' }}
        style={styles.coverImage}

        />

      <View style={styles.avatarContainer}>
      <Image
        source={require('../../../assets/avatar.png')} 
        style={styles.avatar}
      />
<Text style={[styles.name, styles.textWithShadow]}>Welcome to my profile!</Text>

        </View>
   
          <Text style={styles.nameLabel}>Name:</Text>
          <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                    control={control}
                />
    
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    control={control}
                />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Username:</Text>
          <TextInput
                    style={styles.input}
                    onChangeText={onChangeUserName}
                    value={username}
                    control={control}
                />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>number:</Text>
          <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    control={control}
                />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Bio:</Text>
          <Text style={styles.infoLabel}>I have a curious mindset, and I enjoy exploring new things. Traveling to different places and experiencing new cultures fascinates me. Music is also a significant part of my life, and I find joy in discovering diverse genres and melodies.</Text>
        </View>
        
      </View>
     
      <CustomButton
                text="Update Profile"
                onPress={handleSubmit(onUpdateProfilePress)}
            />
       
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffebbb',
        padding: 20,
        
      },
      coverImage: {
        height: 201,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      },
      avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
      },
      avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
      name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color:'white',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      nameLabel: {
        fontWeight: 'bold',
        marginRight: 10, // Adjust the margin to create space between label and input
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        marginTop: 20,
      },
      infoContainer: {
         marginTop: 10,
        marginBottom: 20,
      },
      infoLabel: {
        fontWeight: 'bold',
        marginRight: 20,
        
      },
      infoValue: {
        marginTop: 10,
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
        backgroundColor: 'pink',
      },
  });

export default ProfileScreen;