import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import {useForm, Controller} from 'react-hook-form';

const RecordScreen = () => {
    const navigation = useNavigation();

    const onBasicButtonPress = () => {
        navigation.navigate('Basic');
    };

    const onLifeButtonPress = () => {
        navigation.navigate('Life');
    };

    const onWorkButtonPress = () => {
        navigation.navigate('Work');
    };

    const onEducationButtonPress = () => {
        navigation.navigate('Education');
    };

    const onHealthButtonPress = () => {
        navigation.navigate('Health');
    };

    const onFoodButtonPress = () => {
        navigation.navigate('Food');
    };

    return (
        <View>
          <Text style={{fontSize: 24, alignSelf: 'center'}}>Select a topic below</Text>
            <CustomButton
                text="Basic"
                onPress={onBasicButtonPress}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
            <CustomButton
                text="Life"
                onPress={onLifeButtonPress}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />
            <CustomButton
                text="Work"
                onPress={onWorkButtonPress}
                bgColor="#e3e3e3"
                fgColor="#363636"
            />
            <CustomButton
                text="Education"
                onPress={onEducationButtonPress}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
            <CustomButton
                text="Health"
                onPress={onHealthButtonPress}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />
            <CustomButton
                text="Food"
                onPress={onFoodButtonPress}
                bgColor="#e3e3e3"
                fgColor="#363636"
            />
        </View>
      );
}

export default RecordScreen;