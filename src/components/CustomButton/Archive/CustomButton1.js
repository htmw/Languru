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
    backgroundColor: bgColor,
  };

  return (
    <Animated.View style={[styles.container, styles[`container_${type}`], buttonStyle]}>
      <Pressable onPress={buttonPress}>
        <Image source={imageSource} style={imageStyle} resizeMode="contain" />
        <Text style={[styles.text, styles[`text_${type}`], fgColor ? { color: fgColor } : {}]}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '8%',
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
    width: 120,
  },
  container_TERTIARY: {},
  container_CENTER: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    left: '45%',
  },
  text_SECONDARY: {
    color: '#3B71F3',
  },
  text_TERTIARY: {
    color: 'gray',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomButton1;
