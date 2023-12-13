
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
    width: '80%',
    height:'8%',
    padding: 15,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
    
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
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginRight: 10
},

  text: {
    fontWeight: 'bold',
    color: 'white',
    left:'45%'
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
