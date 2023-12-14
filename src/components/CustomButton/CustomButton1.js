import React, { useRef } from 'react';
import { Animated, Image, StyleSheet, Text, Pressable } from 'react-native';

const CustomButton1 = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor, imageSource, imageStyle }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const buttonPress = () => {
    scaleValue.setValue(0.95);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onPress && onPress());
  };

  const buttonStyle = {
    transform: [{ scale: scaleValue }],
    //backgroundColor: bgColor,
  };

  return (
    <Pressable onPress={buttonPress}
    style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
       <Animated.View
        style={[styles.container,styles[`container_${type}`],
         
          buttonStyle,
          
        ]}
      > 
        
       </Animated.View> 
       <Image source={imageSource} style={imageStyle} resizeMode="contain" />
        <Text
          style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? { color: fgColor } : {},
          ]}
        >
          {text}
        </Text>
        
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '2%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    //marginLeft: '21.5%',  // Use marginLeft instead of left
  },
  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },
  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 1,
    width: 120,
  },
  container_TERTIARY: {},

  container_CENTER: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    left:'8.5%',
    width:'50%',
    height:'4.5%'
  },
  
  text: {
    fontWeight: 'bold',
    color: 'white',
    left:'-300%',
    // textAlign: 'center'
  },
  text_SECONDARY: {
    color: '#3B71F3',
  },
  text_TERTIARY: {
    color: 'gray',
  },
  // rowContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
});

export default CustomButton1;
