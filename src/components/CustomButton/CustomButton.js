import React from 'react';
import {View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor,imageSource, imageStyle,
buttonStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Image source={imageSource} style={imageStyle} resizeMode="contain" />
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
          
          
        ]}>
        {text}
      </Text>
      
    </Pressable>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    width: '65%',
    height:'5%',
    left:'0%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    backgroundColor:'#cac1f5',
    borderColor: '#cac1f5',
    borderWidth: 1.5,
    height:50,
    width:120    
  },

  container_CUSTOM: {
    backgroundColor:'#cac1f5',
    borderColor: '#cac1f5',
    borderWidth: 1.5,
    height:50,
    width:120,
    left:135
  },

  container_TERTIARY: {
    width:'90%'
        
  },
  
  container_CENTER: {
    left:'-52%',
    flexDirection:'row',
    alignItems:'center',
    marginRight: 10
},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
  // rowContainer:{ 
  //   flexDirection:'row',
  //   alignItems:'center'
  // },
});

export default CustomButton;