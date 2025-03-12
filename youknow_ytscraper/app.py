from flask import Flask, request, jsonify
from flask_cors import CORS
import scrapetube
from config.logging import setup_logger
from dotenv import load_dotenv
import os
import requests
from typing import Optional, List, Dict

# Настройка логирования
logger = setup_logger()

# Загрузка переменных окружения
try:
    load_dotenv()
    logger.info("Environment variables loaded successfully")
except Exception as e:
    logger.error(f"Error loading environment variables: {str(e)}")
    raise

# Загрузка конфигурации из .env
try:
    YOUKNOW_URL = os.getenv('YOUKNOW_URL')
    YTSCRAPER_URL = os.getenv('YTSCRAPER_URL')
    YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
    
    if not all([YOUKNOW_URL, YTSCRAPER_URL, YOUTUBE_API_KEY]):
        logger.error("Missing required environment variables")
        raise ValueError("Missing required environment variables")
        
    logger.info("Configuration loaded successfully")
except Exception as e:
    logger.error(f"Error loading configuration: {str(e)}")
    raise

app = Flask(__name__)
CORS(app, origins=str(YOUKNOW_URL))
logger.info("Flask application initialized")

def get_video_length(video_id: str) -> Optional[int]:
    """Получает длину видео через YouTube API."""
    logger.info(f"Gathering length of video {video_id}")

    try:
        url = f'https://www.googleapis.com/youtube/v3/videos?id={video_id}&key={YOUTUBE_API_KEY}&part=contentDetails'
        logger.debug(f"Making API request to {url}")

        response = requests.get(url)
        response.raise_for_status()
        logger.debug(f"API response status: {response.status_code}")
        
        data = response.json()
        if not data['items']:
            logger.warning(f"No video data found for {video_id}")
            return None
            
        duration = data['items'][0]['contentDetails']['duration']

        # Преобразование формата PT6M22S в секунды
        if 'H' in duration:
            hours = int(duration.split('H')[0].replace('PT', ''))
            minutes = int(duration.split('H')[1].split('M')[0])
            seconds = int(duration.split('M')[1].replace('S', ''))
            logger.debug(f"Raw duration format: {duration}")
            return hours * 3600 + minutes * 60 + seconds
        elif 'M' in duration:
            minutes = int(duration.split('M')[0].replace('PT', ''))
            seconds = int(duration.split('M')[1].replace('S', ''))
            logger.debug(f"Video duration: {minutes} minutes, {seconds} seconds")
            return minutes * 60 + seconds
        else:
            logger.debug(f"Video duration: {duration.replace('PT', '').replace('S', '')} seconds")
            return int(duration.replace('PT', '').replace('S', ''))
            
    except (requests.RequestException, KeyError, ValueError) as e:
        logger.error(f"Error while gathering length of {video_id}: error{error}")
        return None

@app.route('/search', methods=['GET', 'OPTIONS'])
def search():
    try:
        search_query = request.args.get('searchQuery')
        max_results = int(request.args.get('maxResults'))
        logger.debug(f"Search query: {search_query}")
        
        if not search_query:
            logger.warning("Missing required searchQuery parameter")
            return jsonify({
                'error': 'searchQuery parameter is required'
            }), 400
        
        videos = scrapetube.get_search(search_query, max_results)
        video_data = []
        
        for video in videos:
            video_id = video['videoId']
            video_length = get_video_length(video_id)
            video_data.append({
                'videoId': video_id,
                'videoLength': video_length
            })
        logger.info(f"Search completed. Returning {len(video_data)} results")
        return jsonify(video_data)
    except ValueError as e:
        logger.error(f"Invalid maxResults parameter: {str(e)}")
        return jsonify({
            'error': 'Invalid maxResults parameter'
        }), 400
    except Exception as e:
        logger.error(f"Internal server error: {str(e)}")
        return jsonify({
            'error': 'Internal server error',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    logger.info("Starting Flask development server")
    app.run(debug=True, port=8224, host=str(YTSCRAPER_URL))