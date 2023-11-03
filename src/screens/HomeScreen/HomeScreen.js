import React,{useEffect} from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { Video } from 'expo-av';
import CustomButton from '../../components/CustomButton';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
import Logo from '../../../assets/images/Logo_3.png';
import MontserratFont from '../../../assets/fonts/Montserrat-VariableFont_wght.ttf'



const HomeScreen = ({ route, navigation }) => {
 
  return (
    
    
    <View style={styles.root} >
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
      style={{
      width: 200,     // Set the desired width
      height: 200,    // Set the desired height
      marginTop: 20,  // Adjust top margin
      marginLeft: 0, // Adjust left margin
          // You can also use marginRight and marginBottom for other margins
      }}
      resizeMode="contain"
      />
       <Text style={[styles.welcomeText, {lineHeight: 50, marginTop: 70}]}>
        Welcome to LANGURU  </Text>

        <Text style={[styles.welcomeText, {fontSize:45, color:'blue'}]}>
        {'\n'} {route.params.name}{'\n'} 
        </Text>

        <Text style={[styles.welcomeText]}>
        Let's help you improve your English pronunciation.
        </Text>
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B9D9EB', 
    paddingHorizontal: 16,
  },
  welcomeText: {
    //fontFamily:'Montserrat',
    fontSize: 20,
    textAlign: 'center',
    color: '#dd6e42',
    
  },
  customButton: {
    backgroundColor: '#d6c6e1',
    color: '#4765A9',
    // Add more styles for your CustomButton here
  },
  root: {
    
    alignItems: 'center',
    //padding: 110,
    height:1000
  },
});

export default HomeScreen;
