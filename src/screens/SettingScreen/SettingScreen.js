import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,Linking
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import {useForm, Controller} from 'react-hook-form';

const SettingScreen = ({ route, navigation }) => {
  const onSignOutPressed = async () => {
    try {
      await Auth.signOut();
      navigation.replace('SignIn');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const clickURL = async ()=> {
    const url = 'https://github.com/htmw/Languru/wiki';
    Linking.openURL(url);
  };
    return (

      
         <View>

          <View style={styles.root}>
        <CustomButton
        text="Sign Out"
        onPress={onSignOutPressed}
        type="CUSTOM"
      />
      </View>

      <View>
      <Text style={{fontSize: 20, alignSelf: 'center'}}>For more information on the app, click on the below 
      button. </Text>
      </View>

      <View style={styles.root1}>
        <CustomButton
        text="Click Here"
        onPress={clickURL}
        type="CUSTOM"
      />
      </View>
        </View>

        
      );
     

}
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  marginRight:270,
  padding: 20,
  //backgroundColor:'#84cdee',
  },
  root1: {
    alignItems: 'center',
    marginRight:270,
    padding: 20,
   // backgroundColor:'#84cdee',
    
  },


})

export default SettingScreen;