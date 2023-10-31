import React, { useState } from 'react';
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
import Basic from '../../../assets/training_images/basic.png';
import CustomInput from '../../components/CustomInput';
import CustomButton1 from '../../components/CustomButton/index1';
import Life from '../../../assets/training_images/life.png'
import Work from '../../../assets/training_images/work.png'
import Education from '../../../assets/training_images/education.png'
import Health from '../../../assets/training_images/health.png'
import Food from '../../../assets/training_images/sandwich.png'
import Quote from '../../../assets/training_images/quote.png'
import Question from '../../../assets/training_images/question.png'
import Convo from '../../../assets/training_images/convo.png'
//import SocialSignInButtons from '../../components/SociaSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useForm, Controller } from 'react-hook-form';

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

  const onQuotationButtonPress = () => {
    navigation.navigate('Quotation');
  };

  const onQuestionButtonPress = () => {
    navigation.navigate('Question');
  };

  const onConversationButtonPress = () => {
    navigation.navigate('Conversation');
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, alignSelf: 'center', fontWeight: 'bold', lineHeight: 50}}>
      SELECT A TOPIC FROM THE BELOW</Text>
      
      <CustomButton1  
        imageSource={Basic}
        imageStyle={styles.imgsize2}
        text="Basic"
        onPress={onBasicButtonPress}
        bgColor="#bf9bd9"
        fgColor="#ffffff"
        type='CENTER'
        
        
      />
      <CustomButton1
        text="Life"
        onPress={onLifeButtonPress}
        bgColor="#f8a7f9"
        fgColor="#ffffff"
        type='CENTER'
        imageSource={Life}
        imageStyle={styles.imgsize2}
      />
      <CustomButton1
        text="Work"
        onPress={onWorkButtonPress}
        bgColor="#b4d6d7"
        fgColor="#ffffff"
        type='CENTER'
        imageSource={Work}
        imageStyle={styles.imgsize2}
      />
      <CustomButton1
        text="Education"
        onPress={onEducationButtonPress}
        bgColor="#f9ca87"
        type='CENTER'
        fgColor="#ffffff"
        imageSource={Education}
        imageStyle={styles.imgsize2}
      />
      <CustomButton1
        text="Health"
        onPress={onHealthButtonPress}
        bgColor="#f9c299"
        fgColor="#ffffff"
        type='CENTER'
        imageSource={Health}
        imageStyle={styles.imgsize2}
      />
      <CustomButton1
        text="Food"
        onPress={onFoodButtonPress}
        bgColor="#9ccb96"
        fgColor="#ffffff"
        type='CENTER'
        imageSource={Food}
        imageStyle={styles.imgsize2}
      />
      <Text style={{ fontSize: 22, alignSelf: 'center',fontWeight: 'bold',lineHeight: 50 }}>
      CHOOSE ADVANCE PRACTICE</Text>
      <CustomButton1
        text="Quotation"
        onPress={onQuotationButtonPress}
        bgColor="#a0589a"
        fgColor="#ffffff"
        type='CENTER'
        imageSource={Quote}
        imageStyle={styles.imgsize3}

      />
      <CustomButton1
        text="Question"
        onPress={onQuestionButtonPress}
        bgColor="#bac181"
        fgColor="#ffffff"
        type='CENTER'
        imageSource={Question}
        imageStyle={styles.imgsize3}
      />
      <CustomButton1
        text="Conversation"
        onPress={onConversationButtonPress}
        bgColor="#8389b6"
        fgColor="#ffffff"
        type='CENTER'
        imageSource={Convo}
        imageStyle={styles.imgsize4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6c6e1',
    padding: 20,
  },
  text:{
    left: '20%'
  },

  imgsize:{
    width:'35%'
  },
  imgsize2:{
    width:'25%',
    left:'20%'
  },
  imgsize3:{
    width:'22%',
    left:'20%'
  },
  imgsize4:{
    width:'20%',
    left:'20%'
  },
});

export default RecordScreen;
