import React, { useState } from 'react';
import { View, Text, Alert, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Config from '../../../config';

const QuizScreen = () => {
  const questions = [
    {
        questionText: '1. What is the correct IPA for the word "Leisure"?',
        answerOptions: [
          { answerText: 'A. /ˈliː.ʒər/', isCorrect: true },
          { answerText: 'B. /ˈleɪ.ʒər/', isCorrect: false },
          { answerText: 'C. /ˈlɛɪ.zjʊr/', isCorrect: false },
          { answerText: 'D. /ˈlɔɪ.ʒʊr/', isCorrect: false },
        ],
      },
      {
        questionText: '2. What is the correct IPA for the word "Strawberry"?',
        answerOptions: [
          { answerText: 'A. /ˈstɹɔˌbəri/', isCorrect: false },
          { answerText: 'B. /ˈstɹæˌbɛri/', isCorrect: false },
          { answerText: 'C. /ˈstɹɔˌbɛri/', isCorrect: true },
          { answerText: 'D.  /ˈstɹɛɪˌbɛri/', isCorrect: false },
        ],
      },
      {
        questionText: '3. What is the correct IPA for the word "International"?',
        answerOptions: [
          { answerText: 'A. /ˌentəˈnæʃənl/', isCorrect: false },
          { answerText: 'B.  /ˌɪnˈtɜːrˈnæʃənl/', isCorrect: false },
          { answerText: 'C. /ˌɪntaːrˈnæʃənl/', isCorrect: false },
          { answerText: 'D.  /ˌɪntərˈnæʃənl/', isCorrect: true },
        ],
      },
      {
        questionText: '4. What is the correct IPA for the word "Obfuscate"?',
        answerOptions: [
          { answerText: 'A. /ɑbˈfʌskeɪt/', isCorrect: false },
          { answerText: 'B.  /ˈɑːb.fə.skeɪt/', isCorrect: true },
          { answerText: 'C. /əbˈfʌskeɪt/', isCorrect: false },
          { answerText: 'D.  /ɑbˈfjuːskeɪt/', isCorrect: false },
        ],
      },
      {
        questionText: '5. What is the correct IPA for the word "Psychology"?',
        answerOptions: [
          { answerText: 'A. /saɪˈkɒlədʒi/', isCorrect: true },
          { answerText: 'B.  /saɪˈkɒladʒi/', isCorrect: false },
          { answerText: 'C. /saɪˈkɒladpi/', isCorrect: false },
          { answerText: 'D.  /spaɪˈkɒladpi/', isCorrect: false },
        ],
      },
      {
        questionText: '6. What is the correct IPA for the word "Always"?',
        answerOptions: [
          { answerText: 'A. /ˈalweɪz/', isCorrect: false },
          { answerText: 'B. /ˈɔlzeɪz/', isCorrect: false },
          { answerText: 'C. /ˈɔlweɪz/', isCorrect: true },
          { answerText: 'D. /ˈlɔɪ.ʒʊr/', isCorrect: false },
        ],
      },
      {
        questionText: '7. What is the correct IPA for the word "Schedule"?',
        answerOptions: [
          { answerText: 'A. /ˈʃɛdjuːl/', isCorrect: false },
          { answerText: 'B. /ˈʃɛdjuːl/', isCorrect: false },
          { answerText: 'C. /ˈskedʒ.uːl/', isCorrect: true },
          { answerText: 'D.  /ˈsɛdjuːl/', isCorrect: false },
        ],
      },
      {
        questionText: '8. What is the correct IPA for the word "Head"?',
        answerOptions: [
          { answerText: 'A. /hed/', isCorrect: true },
          { answerText: 'B.  /hid/', isCorrect: false },
          { answerText: 'C. /het/', isCorrect: false },
          { answerText: 'D.  /had/', isCorrect: false },
        ],
      },
      {
        questionText: '9. What is the correct IPA for the word "Book"?',
        answerOptions: [
          { answerText: 'A. /bok/', isCorrect: false },
          { answerText: 'B.  /ˈbʊk/', isCorrect: true },
          { answerText: 'C. /bak/', isCorrect: false },
          { answerText: 'D.  /bek/', isCorrect: false },
        ],
      },
      {
        questionText: '10. What is the correct IPA for the word "Example"?',
        answerOptions: [
          { answerText: 'A. /ɪkˈzæm.pəl/', isCorrect: false },
          { answerText: 'B.  /ɪɡˈzem.pəl/', isCorrect: false },
          { answerText: 'C. /ɪkˈzam.pəl/', isCorrect: false },
          { answerText: 'D.  /ɪɡˈzæm.pəl/', isCorrect: true},
        ],
      },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View style={styles.scoreSection}>
          <Text style={styles.text}> 📍 You scored : {score} / {questions.length}</Text>
        </View>
      ) : (
        <>
          <View style={styles.questionSection}>
            <View style={styles.questionCount}>
              <Text style={styles.text}>Question {currentQuestion + 1}/{questions.length}</Text>
            </View>
            <View style={styles.questionText}>
              <Text style={styles.questionText}>{questions[currentQuestion].questionText}</Text>
            </View>
          </View>
          <View style={styles.answerSection}>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <Button
                key={index}
                title={answerOption.answerText}
                onPress={() => handleAnswerOptionClick(answerOption.isCorrect)}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fbf2d5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 25,
    },
    questionTextContainer: {
      marginBottom: 10,
    },
    scoreSection: {
      display: 'flex',
      fontSize: 24,
      alignItems: 'center',
    },
    questionSection: {
      width: '100%',
      position: 'relative',
      alignItems: 'center'
    },
    questionCount: {
      marginBottom: 20,
    },
    questionCountText: {
      fontSize: 28,
    },
    questionText: {
      fontSize: 24,
      marginBottom: 12,
    },
    answerSection: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  });
export default QuizScreen;
