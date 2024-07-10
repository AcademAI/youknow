import json
import time
import requests
from PIL import Image
from io import BytesIO
import base64
import pyimgur
import os


class Kadninsky_impl:
    def __init__(self, url, api_key, secret_key):
        self.URL = url
        self.AUTH_HEADERS = {
            'X-Key': f'Key {api_key}',
            'X-Secret': f'Secret {secret_key}',
        }
    async def get_model(self):
        response = requests.get(self.URL + 'key/api/v1/models', headers=self.AUTH_HEADERS)
        data = response.json()
        return data[0]['id']

    async def generate(self, prompt, model, images=1, width=512, height=512):
        params = {
            "type": "GENERATE",
            "style": "ANIME",
            "numImages": images,
            "width": width,
            "height": height,
            "generateParams": {
                "query": f"{prompt}"
            }
        }

        data = {
            'model_id': (None, model),
            'params': (None, json.dumps(params), 'application/json')
        }
        response = requests.post(self.URL + 'key/api/v1/text2image/run', headers=self.AUTH_HEADERS, files=data)
        data = response.json()
        return data['uuid']

    async def check_generation(self, request_id, attempts=10, delay=10):
        while attempts > 0:
            response = requests.get(self.URL + 'key/api/v1/text2image/status/' + request_id, headers=self.AUTH_HEADERS)
            data = response.json()
            if data['status'] == 'DONE':
                return data['images']

            attempts -= 1
            time.sleep(delay)

    async def call_kandinsky(self, prompt, IMGUR_CLIENT_ID):
        
        imgur = pyimgur.Imgur(IMGUR_CLIENT_ID)
        model_id = await self.get_model()
        uuid = await self.generate(prompt, model_id)
        images = await self.check_generation(uuid)

        image_bytes = base64.b64decode(images[0])
        image = Image.open(BytesIO(image_bytes))
        image.save('image.png', format='PNG')
        image_path = 'image.png'
        uploaded_image = imgur.upload_image(image_path, title="Uploaded with PyImgur")
        image_link = uploaded_image.link
        result_json = json.dumps(image_link, indent=4)
        os.remove('image.png')

        return result_json
