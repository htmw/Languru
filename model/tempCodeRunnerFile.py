 in entries:
        if entry.is_file() and not entry.name.startswith('En'):
            file_path = os.path.join(directory_path, entry.name)
            os.remove(file_path)
            print(f"D