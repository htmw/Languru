import React from 'react';
import {View, Text,StyleSheet,Image} from 'react-native';
import CustomButton from '../CustomButton';
import Google from '../../../assets/Social/google.png'
import FB from '../../../assets/Social/fb.png'
import Apple from '../../../assets/Social/apple.png'


const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <>
    <Text style={{ fontSize: 15, alignSelf: 'center',fontWeight: 'bold',lineHeight: 22,marginBottom: 18 }}>
      Or SignIn using the below platforms</Text>
      <View style={styles.buttonContainer}>
      <CustomButton
        imageSource={FB}
        imageStyle={[styles.fwicon]}
        //text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        type="CENTER"
        
               
      />
      <CustomButton
        imageSource={Google}
        imageStyle={[styles.fwicon]}
        //text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
        type="CENTER"
  
      />
      <CustomButton
        imageSource={Apple}
        imageStyle={[styles.fwicon]}
        //text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
        type="CENTER"
      />
      </View>
    </>
    
  );
};
const styles = StyleSheet.create({
  fwicon:{
    width:'100%',
    height:'120%',
    marginRight:'5%',
    left:'0%'
  },

  buttonContainer: {
    flexDirection: 'row', // Display buttons horizontally
    justifyContent: 'space-between', // Adjust the spacing between buttons as needed
    width: '35%', // Make the button container take up the full width
    height:'115%'
  },

});


export default SocialSignInButtons;
