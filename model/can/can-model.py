import os
import shutil
import librosa
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, LSTM, Dense, Embedding
from tensorflow.keras.models import Model

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


parent_directory = './can'
audio_data = []
labels = []
with os.scandir(parent_directory) as entries:
    for entry in entries:
        file_name, file_extension = os.path.splitext(entry.name)
        if(file_extension == '.mp3'):
            label = file_name.split('_')[1]
            if(label == "test"):
                continue
            elif(label == "right"):
                labels.append('can')
            else:
                labels.append('not_can')
            # print(file_name)
            audio_file_path = os.path.join(parent_directory, entry.name)
            audio_features = process_audio(audio_file_path)
            audio_data.append(audio_features)

audio_data = np.array(audio_data)
audio_data = audio_data.reshape(audio_data.shape + (1,))

label_mapping = {'can': 1, 'not_can': 0}
binary_labels = [label_mapping[label] for label in labels]
binary_labels = np.array(binary_labels).reshape(-1, 1)
# print(binary_labels)

def create_pronunciation_rating_model(input_shape):
    audio_input = Input(shape=input_shape)
    conv1 = Conv2D(32, kernel_size=(3, 3), activation='relu')(audio_input)
    maxpool1 = MaxPooling2D(pool_size=(2, 2))(conv1)
    conv2 = Conv2D(64, kernel_size=(3, 3), activation='relu')(maxpool1)
    maxpool2 = MaxPooling2D(pool_size=(2, 2))(conv2)
    flatten = Flatten()(maxpool2)
    dense1 = Dense(128, activation='relu')(flatten)
    output = Dense(1, activation='sigmoid')(dense1)  # Binary classification

    model = Model(inputs=audio_input, outputs=output)
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    return model

input_shape = (n_mfcc, 59, 1) 
model = create_pronunciation_rating_model(input_shape)

# Train the model with your data
model.fit(audio_data, binary_labels, epochs=10, batch_size=32)
model.save('./model/can/can_model.h5')


