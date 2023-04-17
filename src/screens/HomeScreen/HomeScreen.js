import React from 'react';
import {View, Text, Alert} from 'react-native';

const HomeScreen = () => {

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
            style={{fontSize: 24, alignSelf: 'center'}}>Welcome to Languru App. Let's help you improve your English pronounciation.</Text>
        </View>
    );

}

export default HomeScreen;