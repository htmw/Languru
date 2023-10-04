import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to Languru App {route.params.name}. Let's help you improve your English pronunciation.
      </Text>
      {/* <CustomButton
        text="Try your pronunciation"
        onPress={onRecordButtonPress}
        style={styles.customButton}
      /> */}
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
    fontSize: 24,
    textAlign: 'center',
    color: '#dd6e42',
    
  },
  customButton: {
    backgroundColor: '#E7EAF4',
    color: '#4765A9',
    // Add more styles for your CustomButton here
  },
});

export default HomeScreen;
