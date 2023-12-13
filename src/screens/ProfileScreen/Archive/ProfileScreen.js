import React,{useState} from 'react';
import {View, Text, Alert, Image, Pressable} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card, Icon } from 'react-native-elements'
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/index';
import { ScrollView } from 'react-native';
import Male from '../../../assets/male.png'
import Female from '../../../assets/female.png'
import Default from '../../../assets/default.png'
import Cover from '../../../assets/Cover.jpg'

const EMAIL_REGEX = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const ProfileScreen = ({ route, navigation }) => {
  const onSignOutPressed = async () => {
    try {
      await Auth.signOut();
      navigation.replace('SignIn');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };
    const {control, handleSubmit} = useForm();
    const [username, onChangeUserName] = React.useState(route.params.params.userName);
    const [name, onChangeName] = React.useState(route.params.params.name);
    const [email, onChangeEmail] = React.useState(route.params.params.email);
    const [number, onChangeNumber] = React.useState(route.params.params.phone_number);
    const [gender, setGender] = useState('Male');
    const genderOptions = ['Male', 'Female', 'Other'];

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
      <Image
            source={Cover}
            style={styles.coverImage}

            />

      <View style={styles.avatarContainer}>
      <Image
            source={gender === 'Male' ? Male : gender === 'Female' ? Female : Default}
            style={styles.avatar}
          />
<Text style={[styles.name, styles.textWithShadow]}>Welcome to my profile!</Text>
      
        </View>
        <View style={styles.root}>
          <Text style={styles.nameLabel}>Name:</Text>
          <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                    control={control}
                />
    
      <View style={styles.root}>
        {/* <View style={styles.infoContainer}> */}
          <Text style={styles.infoLabel}>Email:</Text>
          <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    control={control}
                />
        {/* </View> */}
        <View style={styles.root}>
        {/* <View style={styles.infoContainer}> */}
          <Text style={styles.infoLabel}>Username:</Text>
          <TextInput
                    style={styles.input}
                    onChangeText={onChangeUserName}
                    value={username}
                    control={control}
                />
        </View>
        <View style={styles.root}>
          <Text style={styles.infoLabel}>Contact Number:</Text>
          <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    control={control}
                />
        </View>
        <View style={styles.infoContainer}>
        <View style={styles.root}>
          <Text style={styles.infoLabel}>Gender:</Text>
           <Picker
            style={styles.input1}
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
             >
            {genderOptions.map((option, index) => (
              <Picker.Item label={option} value={option} key={index} />
            ))}
          </Picker>
          </View>
        </View>
        
        {/* <View style={styles.root}>
          <Text style={styles.infoLabel}>Bio:</Text>
          <Text style={styles.infoLabel}>I have a curious mindset, and I enjoy exploring new things. Traveling to different places and experiencing new cultures fascinates me. Music is also a significant part of my life, and I find joy in discovering diverse genres and melodies.</Text>
        </View> */}
        
      </View>
     
      <View style={styles.root}>
       <CustomButton 
      
                text="Update Profile"
                onPress={handleSubmit(onUpdateProfilePress)}
                type="SECONDARY"
                
              />
            
        </View>
        <View style={styles.root2}>
        <CustomButton
        text="Sign Out"
        onPress={onSignOutPressed}
        type="CUSTOM"
      />
      </View>
            
       
    </View>
    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#84cdee',
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
        //marginRight: 10, // Adjust the margin to create space between label and input
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:22
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
        fontSize:22
        //marginRight: 20,
        
      },
      input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 7,
        padding: 5,
        fontSize: 20,
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
        height:50
      },
      root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor:'#84cdee',
        
      },
      root2: {
        alignItems: 'center',
        marginRight:270,
        padding: 20,
        backgroundColor:'#84cdee',
        
      },
      input1: {
        borderWidth: 20,
        borderColor: '#000',
        borderRadius: 20,
        padding: -10,
        fontSize: 15,
       // height: 10,
        width:140
      },
  });

export default ProfileScreen;