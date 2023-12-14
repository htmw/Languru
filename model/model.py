import os
import shutil
import librosa
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, LSTM, Dense, Embedding
from tensorflow.keras.models import Model


def process_audio(file_path, sample_rate=22050, duration=5):
    try:
        audio, sr = librosa.load(file_path, sr=sample_rate, duration=duration)
        mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
        mfccs = (mfccs - np.mean(mfccs)) / np.std(mfccs)
        
        return mfccs
    except Exception as e:
        print(f"Error processing audio file {file_path}: {str(e)}")
        return None


parent_directory = './audios'
audio_data = []
labels = []
with os.scandir(parent_directory) as entries:
    for letter in range(ord('A'), ord('A') + 1):
        folder_name = chr(letter)
        folder_path = os.path.join(parent_directory, folder_name)        
        with os.scandir(folder_path) as entries:
            for entry in entries:
                split = entry.name.split('-')
                if len(split) == 2:
                    word = split[1].split('.')[0]
                    file_name, file_extension = os.path.splitext(entry.name)
                    if(file_extension == '.mp3'):
                        audio_file_path = os.path.join(folder_path, entry.name)

                        audio_features = process_audio(audio_file_path)
                        audio_data.append(audio_features)
                        labels.append(word)

audio_data = np.array(audio_data)
labels = np.array(labels)

from sklearn.model_selection import train_test_split
X_train, X_val, y_train, y_val = train_test_split(audio_data, labels, test_size=0.2, random_state=42)

# Create a CNN model for audio classification (replace with your model architecture)
model = model.Sequential([
    layers.Input(shape=(input_shape)),  # Define the input shape based on your audio features
    # Add convolutional layers, pooling layers, and fully connected layers as needed
    # Example:
    layers.Conv2D(32, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(num_classes, activation='softmax')  # Output layer with the number of classes
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model (replace with your training code)
# Example:
model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=10, batch_size=32)

# Evaluate the model (replace with your evaluation code)
# Example:
test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f"Test accuracy: {test_accuracy * 100:.2f}%")


