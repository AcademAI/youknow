import json
import time
import requests
from PIL import Image
from io import BytesIO
import base64
import pyimgur
import os
import logging
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

class Kadninsky_impl:
    def __init__(self, url: str, api_key: str, secret_key: str):
        self.URL = url
        self.AUTH_HEADERS = {
            'X-Key': f'Key {api_key}',
            'X-Secret': f'Secret {secret_key}',
        }
        logger.info("Kadninsky_impl initialized")

    async def get_model(self) -> str:
        try:
            response = requests.get(self.URL + 'key/api/v1/models', headers=self.AUTH_HEADERS)
            response.raise_for_status()
            data = response.json()
            model_id = data[0]['id']
            logger.info(f"Successfully retrieved model ID: {model_id}")
            return model_id
        except requests.exceptions.RequestException as e:
            logger.error(f"Error getting model: {str(e)}")
            raise

    async def generate(self, prompt: str, model: str, images: int = 1, width: int = 512, height: int = 512) -> str:
        try:
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
            response.raise_for_status()
            data = response.json()
            logger.info(f"Image generation initiated with UUID: {data['uuid']}")
            return data['uuid']
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                retry_after = e.response.headers.get('Retry-After', 60)
                logger.warning(f"Rate limit exceeded. Waiting {retry_after} seconds before retrying.")
                time.sleep(int(retry_after))
                return await self.generate(prompt, model, images, width, height)
            logger.error(f"HTTP error during generation: {str(e)}")
            raise
        except requests.exceptions.RequestException as e:
            logger.error(f"Error during generation: {str(e)}")
            raise

    async def check_generation(self, request_id: str, attempts: int = 10, delay: int = 10) -> list:
        try:
            while attempts > 0:
                response = requests.get(self.URL + 'key/api/v1/text2image/status/' + request_id, 
                                      headers=self.AUTH_HEADERS)
                response.raise_for_status()
                data = response.json()
                if data['status'] == 'DONE':
                    logger.info(f"Generation completed successfully for request ID: {request_id}")
                    return data['images']
                attempts -= 1
                if attempts > 0:
                    logger.info(f"Generation not complete. {attempts} attempts remaining. Waiting {delay} seconds.")
                    time.sleep(delay)
            logger.error(f"Generation timed out after {attempts} attempts for request ID: {request_id}")
            raise TimeoutError(f"Generation timed out after {attempts} attempts")
        except requests.exceptions.RequestException as e:
            logger.error(f"Error checking generation status: {str(e)}")
            raise

    async def call_kandinsky(self, prompt: str, IMGUR_CLIENT_ID: str) -> str:
        try:
            logger.info(f"Starting image generation with prompt: {prompt}")
            imgur = pyimgur.Imgur(IMGUR_CLIENT_ID)
            
            model_id = await self.get_model()
            uuid = await self.generate(prompt, model_id)
            images = await self.check_generation(uuid)
            
            image_bytes = base64.b64decode(images[0])
            image = Image.open(BytesIO(image_bytes))
            
            temp_path = 'image.png'
            image.save(temp_path, format='PNG')
            logger.info(f"Temporary image saved to: {temp_path}")
            
            try:
                uploaded_image = imgur.upload_image(temp_path, title="Uploaded with PyImgur")
                image_link = uploaded_image.link
                result_json = json.dumps(image_link, indent=4)
                logger.info(f"Image successfully uploaded to Imgur. Link: {image_link}")
                return result_json
            finally:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                    logger.info(f"Temporary image removed: {temp_path}")
        except Exception as e:
            logger.error(f"Error in call_kandinsky: {str(e)}")
            raise
