import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Animated,
  Alert,
  Linking
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import {useForm, Controller} from 'react-hook-form';

const SettingScreen = ({ route, navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

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
        
          <Animated.View style={{ ...styles.root, opacity: fadeAnim}}>
        <CustomButton
        text="Sign Out"
        onPress={onSignOutPressed}
        type="CUSTOM"
        style={styles.signOutButton}
      />
      </Animated.View>

      <View>
      <Text style={{fontSize: 20, alignSelf: 'center'}}>For more information on the app, click on the below 
      button. </Text>
      </View>

      <Animated.View style={{ ...styles.root1, opacity: fadeAnim }}>
        <CustomButton
        text="Click Here"
        onPress={clickURL}
        type="CUSTOM"
      />
      </Animated.View>
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
  signOutButton: {
    backgroundColor: '#ff0000', 
    borderRadius: 5, 
    padding: 10, 
  },

})

export default SettingScreen;
