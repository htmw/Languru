import os

# Specify the directory path you want to iterate through
directory_path = './model/audios'

# Use os.listdir() to get a list of filenames in the directory
filenames = os.listdir(directory_path)

# Iterate through the list of filenames and print each one
for filename in filenames:
    if not filename.endswith(".ogg.mp3"):
        # If the filename doesn't end with ".ogg.mp3," construct the full file path
        file_path = os.path.join(directory_path, filename)
        
        # Check if the file exists before attempting to delete it
        if os.path.exists(file_path):
            # Delete the file
            os.remove(file_path)
            print(f"Deleted file: {filename}")
        else:
            print(f"File not found: {filename}")
# This code will iterate through the files in the specified directory, check if each file doesn't end with ".ogg.mp3," and delete it if the condition is met. It also checks if the file exists before attempting to delete it to avoid errors.






