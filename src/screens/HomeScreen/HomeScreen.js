import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useRoute} from '@react-navigation/native';

const HomeScreen = ({route, navigation}) => {

    // const route = useRoute();

    // const onRecordButtonPress = () => {
    //     navigation.navigate('Record');
    // };

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
            style={{fontSize: 24, alignSelf: 'center'}}>Welcome to Languru App {route.params.name}. Let's help you improve your English pronounciation.</Text>

            {/* <CustomButton
                text="Try your pronounciation"
                onPress={onRecordButtonPress}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            /> */}

        </View>
    );

}

export default HomeScreen;