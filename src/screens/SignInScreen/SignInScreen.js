import React, {useState,  useEffect, useRef} from 'react';
import { Video } from 'expo-av';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { Modal,ActivityIndicator,Animated} from 'react-native';
import Logo from '../../../assets/images/Logo_3.png';
import Uicon from '../../../assets/images/UnameIcon.png'
import PWicon from '../../../assets/images/PwordIcon.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import {useForm, Controller} from 'react-hook-form';
import { useRoute } from "@react-navigation/native";


const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const {control, handleSubmit, formState: {errors}} = useForm();

  const {height} = useWindowDimensions();
  // const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);


  const onSignInPressed = async data => {

    try {
      const response = await Auth.signIn(data.username, data.password);
      const userInfo = await Auth.currentUserInfo();
      console.log(userInfo);
      const userName = userInfo.username;
      const name = userInfo.attributes.name;
      const email = userInfo.attributes.email;
      const phone_number = userInfo.attributes.phone_number;

      navigation.navigate('TabNavigator', {
        screen: 'Home',
        params: {
          userName: userName,
          name: name,
          email: email,
          phone_number: phone_number,
        }
      });
    } catch(e) {
      Alert.alert('Oops', e.message);
    }

  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    
      <View style={styles.root}>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={loading}
          onRequestClose={() => { console.log('close modal')}}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000040'
          }}>
            <ActivityIndicator animating={loading} color="#35A7FF" size="large" />
            <Animated.Text style={{color: '#fff', opacity: fadeAnim, marginTop: 10}}>Signing In</Animated.Text>
          </View>
        </Modal>

            <Video
            source={{ uri: 'https://drive.google.com/uc?id=1jxYZRReov1RI-4wz_9Nh7_sPoTSyN8G2' }}
        rate={1.5}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFillObject}
      />
        
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomInput
          name="username"
          value={username}
          setValue={setUsername}
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
          imageSource={Uicon} 
          imageStyle={[styles.uicon]}
          
          />
        <CustomInput
          name="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
          control={control}
          imageSource={PWicon} 
          imageStyle={[styles.pwicon]}
          rules={{
            required: 'Password is required',
            minlength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} 
          type="SECONDARY"
          fgColor='#000000'
        />

        <CustomButton
          
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
          // imageSource={FwordIcon}
          // imageStyle={[styles.fwicon]}          
        />

        <CustomButton
          text="Don't have an account? Click here and create one"
          onPress={onSignUpPress}
          type='TERTIARY'
          fgColor='#2126e9'
          />

        <SocialSignInButtons />


      </View>
    
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },

  uicon:{
    width: '10%',
    marginRight: 2,
  },
  pwicon:{
    width: '8%',
    marginRight: 2,
  },
  fwicon:{
    width:'10%'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

});

export default SignInScreen;