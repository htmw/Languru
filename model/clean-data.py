import os
import shutil

movdir = "./audio-cleaned"
srcdir = "./audio"

f = []
d = dict()
i = 0
for (dirpath, dirnames, filename) in os.walk(srcdir):
    # print(dirpath)
    for file in filename:
        file_split = file.split('.')
        key = file_split[0]
        if len(dirpath.split('/')) >= 4:
            if key not in d:
                    d[key] = dict()
                    d[key]["index"] = i
                    d[key]["corpus"] = dirpath.split('/')[2]
                    i+=1
        # if len(dirpath.split('/')) >= 2:
            d[key][file_split[1].lower()] = os.path.join( os.path.abspath(dirpath), file )            

count = 0
x = set()
for key in d:
    # print(key)
    obj = d[key]
    if "corpus" in obj:
        count +=1
        
        x.update(obj.keys())
        count = obj["index"]
        corpus = obj["corpus"]
        print(obj)
        # x.add(corpus)
        for type in ['wav', 'mp3', 'phn', 'doc', 'trans', 'book', 'txt', 'wrd', 'textgrid']:
            if type in obj:
                new_dir = os.path.join(movdir, ".".join([str(count), corpus, type]))
                old_name = ".".join([key, type])
                path = obj[type]
                # old_dir = os.path.join(path, old_name)
                # print(new_dir)
                shutil.copy(path, new_dir)
# print(d)
        

