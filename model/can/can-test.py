import os
import shutil
import librosa
import numpy as np
import tensorflow as tf
import torch
from tensorflow.keras.models import load_model
from can_model_CRNN import CRNN
import torch.nn.functional as F

fixed_length = 30000
n_mfcc = 13

def process_audio(file_path, sample_rate=22050, duration=5):
    try:
        audio, sr = librosa.load(file_path, sr=sample_rate, duration=duration)
        padding_length = max(0, fixed_length - len(audio))
        audio = np.pad(audio, (0, padding_length))
        mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=n_mfcc)
        mfccs = (mfccs - np.mean(mfccs)) / np.std(mfccs)
        return mfccs
    except Exception as e:
        print(f"Error processing audio file {file_path}: {str(e)}")
        return None

audio_file_path_correct = './can/can_test.mp3'
audio_data_correct = process_audio(audio_file_path_correct)
audio_data_correct = np.array(audio_data_correct)
audio_data_correct = audio_data_correct.reshape((1,) + audio_data_correct.shape + (1,))
input_tensor_correct = torch.from_numpy(audio_data_correct).float()

audio_file_path_incorrect = './can/can_test_wrong.mp3'
audio_data_incorrect = process_audio(audio_file_path_incorrect)
audio_data_incorrect = np.array(audio_data_incorrect)
audio_data_incorrect = audio_data_incorrect.reshape((1,) + audio_data_incorrect.shape + (1,))
input_tensor_incorrect = torch.from_numpy(audio_data_incorrect).float()

input_shape = (n_mfcc, 59, 1) 
num_hidden_units = 256
num_classes = 2
model_path = './model/can/can_model.pth'
model = CRNN(input_shape, num_classes, num_hidden_units)

model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))

model.eval()

with torch.no_grad(): 
    output_correct = model(input_tensor_correct)
    output_incorrect = model(input_tensor_incorrect)

print("Predictions for 'can_test.mp3':", output_correct)
print("Predictions for 'can_test_wrong.mp3':", output_incorrect)

probabilities_correct = F.softmax(output_correct, dim=1)
probabilities_incorrect = F.softmax(output_incorrect, dim=1)

predicted_class_correct = torch.argmax(probabilities_correct, dim=1).item()
predicted_class_incorrect = torch.argmax(probabilities_incorrect, dim=1).item()

class_names = ["incorrect", "correct"]
predicted_label_correct = class_names[predicted_class_correct]
predicted_label_incorrect = class_names[predicted_class_incorrect]

print("Predicted class for 'can_test.mp3':", predicted_label_correct)
print("Predicted class for 'can_test_wrong.mp3':", predicted_label_incorrect)

print("Probabilities for 'can_test.mp3':", probabilities_correct)
print("Probabilities for 'can_test_wrong.mp3':", probabilities_incorrect)










