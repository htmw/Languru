import React, {useState} from 'react';
import {View, Text, Alert, Button, StyleSheet} from 'react-native';
import Config from '../../../config';
import { Audio } from 'expo-av';

const EducationScreen = () => {

    const [textToRead, setTextToRead] = useState([]);
    const [recording, setRecording] = useState('');
    const [message, setMessage] = useState([]);
    const [results, setResults] = useState([]);
    const [result, setResult] = useState([]);
    const [score, setScore] = useState({});
    const [ipa, setIpa] = useState('');

    const startRecording = async () => {
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (permission.status === "granted"){
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true
          });
        

        const { recording } = await Audio.Recording.createAsync (
          {
            android: {
              extension: '.m4a',
              sampleRate: 44100,
              numberOfChannels: 2,
              bitRate: 128000,
            },
            ios: {
              extension: '.m4a',
              outputFormat: Audio.IOSOutputFormat.APPLELOSSLESS,
              audioQuality: Audio.IOSAudioQuality.MAX,
              sampleRate: 44100,
              numberOfChannels: 1,
              bitRate: 320000
            },
          }
        );

        setRecording(recording);
        } else {
        setMessage("Please grant permission to app to access microphone");
      }

      } catch (err){
        console.error('Failed to start recording', err);
      } 
    }

    const stopRecording = async () => {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const {sound, status } = await recording.createNewLoadedSoundAsync();

      try {
        const response = await fetch(recording.getURI());

        const blob = await response.blob();

        const blobToBase64 = (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((resolve)=>{
            reader.onloadend = () => {
              resolve(reader.result.split(',')[1]);
            };
          });
        };
        const audioBase64 = await blobToBase64(blob);

        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '85df79b3afmshb9b935fe7ccbcebp1365a4jsn0a21f5b9aca4',
            'X-RapidAPI-Host': 'pronunciation-assessment1.p.rapidapi.com'
          },
          body: `{"audio_base64":"${audioBase64}","audio_format":"m4a","text":"${textToRead}"}`
        };

        let updatedResults = [...results];

        await fetch('https://pronunciation-assessment1.p.rapidapi.com/pronunciation', options)
        .then(response => response.json())
        .then(response => {
          console.log(JSON.stringify(response));
          updatedResults.push(response);
          setScore(response.score);
          const word = response.words[0];
          console.log(response.words[0]);
          var phonetic = '/';
          word.syllables.map((syllable, index) => {
            phonetic = phonetic + syllable.label_ipa;
          });
          phonetic = phonetic + '/';
          console.log(phonetic);
          setIpa(phonetic);
          setResult(JSON.stringify(response));
          
        })
        .catch(err => console.error(err));

      } catch (err) {
        console.log('Error uploading file:', err);
      }
    }

    const addPost = () => {
        const randomItem = Config.EDUCATION[Math.floor(Math.random() * Config.EDUCATION.length)];
          setTextToRead(randomItem);
      }

      function getTextToRead() {
        return (
          <View style={styles.row}>
            <Text style={styles.fill}>{textToRead}</Text>
          </View>
        );
      }
    return (
        <View >
            <Text
            style={{fontSize: 24, alignSelf: 'center'}}>This is screen for Education Related Pronounciation.</Text>
             <Button style={styles.button} onPress={addPost} title="Generate Random Post"></Button>
            {getTextToRead()}
            {textToRead == '' ? null : <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording} />}
            {result == '' ? null : <View> 
            <Text
            style={{fontSize: 24, alignSelf: 'center'}}>IPA: {ipa}</Text>
            <Text
            style={{fontSize: 24, alignSelf: 'center'}}>Overall Score: {score}</Text>
              </View>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      margin: 20,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fill: {
      flex: 1,
      margin: 16
    },
    button: {
      margin: 16
    }
  });

export default EducationScreen;