import requests
from bs4 import BeautifulSoup
from pydub import AudioSegment
import json

def merriam_webster_extractor(word):
    url = "https://www.merriam-webster.com/dictionary/"+ word
    response = requests.get(url)
    if(response.status_code == 200):
        soup = BeautifulSoup(response.text, 'html.parser')
        script_element = soup.find('script')
        if(script_element):
            js_code = script_element.get_text()
            data = json.loads(js_code)
            audio_source_url= data[4]['contentURL']
            audio_response = requests.get(audio_source_url)
            if audio_response.status_code == 200:
                with open('./model/extractor/'+ word + '.mp3', 'wb') as audio_file:
                    audio_file.write(audio_response.content)

merriam_webster_extractor('spectacular')




