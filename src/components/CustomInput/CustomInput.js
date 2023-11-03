import React from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  imageSource,
  imageStyle
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
              { flexDirection: 'row', alignItems: 'center' }
            ]}>
            <Image source={imageSource} style={imageStyle} resizeMode="contain" />
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '95%',

    borderColor: '#e8e8e8',
    borderWidth: 2,
    borderRadius: 5,
    height: 50,

    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
  },
  input: {},
});

export default CustomInput;