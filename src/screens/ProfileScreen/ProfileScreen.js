import React from 'react';
import {View, Text, Alert} from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
            style={{fontSize: 24, alignSelf: 'center'}}>This is a Profile screens.</Text>
        </View>
    );
}

export default ProfileScreen;