import React from 'react';
import { Video } from 'expo-av';
import { View, Text, StyleSheet,Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
import Logo from '../../../assets/images/Logo_3.png';
import White from '../../../assets/Video/White.mp4';
import Futura from '../../../assets/fonts/Futura.ttf';


let [fontsLoaded] = useFonts({
  'Futura':{Futura}

})   

const HomeScreen = ({ route}) => {
  return (
     

    <View style={styles.root} >

        <Video
        source={White}
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
      marginTop: -100,  // Adjust top margin
      marginLeft: 0, // Adjust left margin
          // You can also use marginRight and marginBottom for other margins
      }}
      resizeMode="contain"
      />
      
       <Text style={[styles.welcomeText, {lineHeight: 30, fontSize:27, marginTop: 30, fontFamily:'Futura'}]}>
        Welcome to LANGURU  </Text>

        <Text style={[styles.welcomeText, {fontSize:45, color:'blue'}]}>
        {'\n'} {route.params.name}{'\n'} 
        </Text>

        <Text style={[styles.welcomeText, {fontSize:25}]}>
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
    fontFamily:'Futura',
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
    padding: 110,
  },
 
});



export default HomeScreen;