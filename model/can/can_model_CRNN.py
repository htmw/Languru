import os
import shutil
import librosa
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, LSTM, Dense, Embedding
from tensorflow.keras.models import Model
from torch.utils.data import Dataset, DataLoader
import torch.nn as nn
import torch
import optim

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
            audio_file_path = os.path.join(parent_directory, entry.name)
            audio_features = process_audio(audio_file_path)
            audio_data.append(audio_features)

audio_data = np.array(audio_data)
audio_data = audio_data.reshape(audio_data.shape + (1,))

label_mapping = {'can': 1, 'not_can': 0}
binary_labels = [label_mapping[label] for label in labels]
binary_labels = np.array(binary_labels).reshape(-1, 1)
# print(binary_labels)

class CustomAudioDataset(Dataset):
    def __init__(self, audio_data, binary_labels, transform=None):
        self.audio_data = audio_data
        self.binary_labels = binary_labels
        self.transform = transform

    def __len__(self):
        return len(self.audio_data)

    def __getitem__(self, idx):
        audio_sample = self.audio_data[idx]
        label = self.binary_labels[idx]

        # Apply transformations if needed
        if self.transform:
            audio_sample = self.transform(audio_sample)

        return audio_sample, label

class BidirectionalLSTM(nn.Module):

    def __init__(self, nIn, nHidden, nOut):
        super(BidirectionalLSTM, self).__init__()

        self.rnn = nn.LSTM(nIn, nHidden, bidirectional=True)
        self.embedding = nn.Linear(nHidden * 2, nOut)

    def forward(self, input):
        recurrent, _ = self.rnn(input)
        T, b, h = recurrent.size()
        t_rec = recurrent.view(T * b, h)

        output = self.embedding(t_rec)  # [T * b, nOut]
        output = output.view(T, b, -1)

        return output
    
class CRNN(nn.Module):

    def __init__(self, input_shape, num_classes, num_hidden_units):
        super(CRNN, self).__init__()

        self.conv1 = nn.Conv2d(in_channels=input_shape[0], out_channels=64, kernel_size=(3, 3), padding=(1, 1))
        self.conv2 = nn.Conv2d(in_channels=64, out_channels=128, kernel_size=(3, 3), padding=(1, 1))  
        self.conv3 = nn.Conv2d(in_channels=128, out_channels=256, kernel_size=(3, 3), padding=(1, 1))
        self.conv4 = nn.Conv2d(in_channels=256, out_channels=256, kernel_size=(3, 3), padding=(1, 1))

        self.rnn = nn.LSTM(input_size=256, hidden_size=num_hidden_units, bidirectional=True, batch_first=True)
        self.fc = nn.Linear(in_features=num_hidden_units * 2, out_features=num_classes)

    def forward(self, x):
        x = self.conv1(x)
        x = self.conv2(x)
        x = self.conv3(x)
        x = self.conv4(x)

        x = x.permute(0, 2, 1, 3).contiguous()
        x = x.view(x.size(0), x.size(1), -1)

        # Apply RNN
        x, _ = self.rnn(x)

        # Apply FC layers
        x = self.fc(x[:, -1, :])  # Use the output of the last time step

        return x


input_shape = (n_mfcc, 59, 1) 
num_hidden_units = 256
num_classes = 2

binary_labels = binary_labels.astype(np.float32).flatten()
custom_dataset = CustomAudioDataset(audio_data, binary_labels)
batch_size = len(audio_data)  # Adjust as needed
dataloader = DataLoader(custom_dataset, batch_size=batch_size, shuffle=True)


model = CRNN(input_shape, num_classes, num_hidden_units)

criterion = nn.NLLLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# In your training loop, ensure that labels are converted to float tensors
num_epochs = 100
for epoch in range(num_epochs):
    for inputs, labels in dataloader:
        optimizer.zero_grad()
        outputs = model(inputs)
        log_probs = torch.log_softmax(outputs, dim=1)
        loss = criterion(log_probs, labels.long())  # Convert labels to long type
        loss.backward()
        optimizer.step()
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item()}')

torch.save(model.state_dict(), './model/can/can_model.pth')


