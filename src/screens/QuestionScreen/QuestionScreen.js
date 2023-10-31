import React, { useState } from 'react';
import {View, Text, Alert, Button, StyleSheet,Image, TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';
import Config from '../../../config';
import MicStart from '../../../assets/images/micstart.png';
import MicStop from '../../../assets/images/micstop.png';
import Question from '../../../assets/training_images/question.png';

const QuestionScreen = () => {


    const [textToRead, setTextToRead] = useState([]);
    const [recording, setRecording] = useState('');
    const [message, setMessage] = useState([]);
    const [results, setResults] = useState([]);
    const [result, setResult] = useState([]);
    const [score, setScore] = useState({});
    const [ipa, setIpa] = useState('');
    const [soundsLike, setSoundsLike] = useState({});
    const [ipascore, setIpaScore] = useState({});

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();// allow app to use phone's microphone
            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                  allowsRecordingIOS: true,
                  playsInSilentModeIOS: true
                });
        
                const { recording } = await Audio.Recording.createAsync(
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
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    const stopRecording = async () => {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });

        const { sound, status } = await recording.createNewLoadedSoundAsync();

        try {
            const response = await fetch(recording.getURI());

            const blob = await response.blob();

            const blobToBase64 = (blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                return new Promise((resolve) => {
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
                    // const word = response.words[0];
                    console.log(response.words[0]);
                    const ipa_score_map = new Map();
                    var phonetic = '/';
                    var sounds_like = '/';
                    response.words[0].syllables.map((syllable, index) => {
                      phonetic = phonetic + syllable.label_ipa;
                      syllable.phones.map((phone, idx) => {
                        sounds_like = sounds_like + phone.sounds_like[0].label_ipa;
                      });

                      ipa_score_map.set(syllable.label_ipa, syllable.score);
                    });
                    phonetic = phonetic + '/';
                    sounds_like = sounds_like + '/';
                    console.log(phonetic);
                    setIpaScore(JSON.stringify([...ipa_score_map]));
                    setIpa(phonetic);
                    setSoundsLike(sounds_like);
                    setResult(JSON.stringify(response));
                    setResults(updatedResults);
                })
                .catch(err => console.error(err));

        } catch (err) {
            console.log('Error uploading file:', err);
        }
    }

    const addPost = () => {
    const randomItem = Config.QUESTION[Math.floor(Math.random() * Config.QUESTION.length)];
        setTextToRead(randomItem);
    }
    

    function getTextToRead() {
        return (
          <View style={styles.textContainer}>
        <Text style={styles.text}>{textToRead}</Text>
      </View>
        );
      }

      return (
        <View style={styles.container}>
        <Text style={styles.heading}>Question Topic Pronunciation</Text>
    <Image source={Question} style={styles.image}></Image>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={addPost}
      >
        <Text style={styles.button}>GENERATE RANDOM POST</Text>
      </TouchableOpacity>
      </View>
      {getTextToRead()}
      {textToRead == '' ? null : (
        <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
            style={styles.recordButton}
          >
            {recording ? (
              <Image
                source={MicStop} 
                style={styles.recordImage}
              />
            ) : (
              <Image
                source={MicStart} 
                style={styles.recordImage}
              />
            )}
     </TouchableOpacity>)}
          {result == '' ? null : (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Expected IPA: {ipa}</Text>
              <Text style={styles.resultText}>Detailed Score: {ipascore}</Text>
              <Text style={styles.resultText}>Actual IPA: {soundsLike}</Text>
              <Text style={styles.resultText}>Overall Score: {score}</Text>
            </View>
          )}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#bac181',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
          marginVertical: 10,
            fontSize:15,
            color:'#090905',
            backgroundColor: '#f4eb5a', // Background color
            padding: 5, // Padding around the button text
            borderRadius: 5,
            alignItems:'center',
            fontWeight:'bold'
          },
        heading: {
          fontSize: 30,
            marginBottom: 16,
            fontWeight:'bold',
            marginBottom:20
        },
        image:{
          marginBottom:100,
          height:50,
          width:50
        },
        buttonContainer: {
          marginBottom: 80,
          width:200,
          height:100
        },
        textContainer: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: '#E7EAF4',
          borderRadius: 8,
          marginBottom: 16,
          width:350,
          alignItems:'center'
        },
        recordButton: {
          marginVertical: 16,
        },
        recordImage:{
          height:55,
          width:45
        },
        text: {
          fontSize: 18,
        },
        resultContainer: {
          marginTop: 20,
          backgroundColor: '#FAE9EA',
          padding: 16,
          borderRadius: 8,
        },
    });

export default QuestionScreen;