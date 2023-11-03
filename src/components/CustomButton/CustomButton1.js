
import React, { useRef, useState } from 'react';
import {View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Animated, TouchableWithoutFeedback
,Easing} from 'react-native';


const CustomButton1 = ({onPress, text, type = 'PRIMARY', bgColor, fgColor,imageSource, imageStyle,
 }) => {

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
    width: '40%',
    height:'8%',
    left:'30%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 12,
    //borderColor: '1a0cd3',
    
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 1,
    width:120

  },

  container_TERTIARY: {
        
  },

  container_CENTER: {
    left:'15.5%',
    flexDirection:'row',
    alignItems:'center',
    marginRight: 10
},

  text: {
    fontWeight: 'bold',
    color: 'white',
    left:'100%'
  },
  

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },

  rowContainer:{ 
    flexDirection:'row',
    alignItems:'center'
  },

  
});

export default CustomButton1;