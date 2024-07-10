from flask import Flask, request, jsonify
from flask_cors import CORS
import scrapetube
from dotenv import load_dotenv
import os
from pytube import YouTube 

load_dotenv()

YOUKNOW_URL = os.getenv('YOUKNOW_URL')
YTSCRAPER_URL = os.getenv('YTSCRAPER_URL')

app = Flask(__name__)
CORS(app, origins=str(YOUKNOW_URL))

@app.route('/search', methods=['GET', 'OPTIONS'])
def search():
    search_query = request.args.get('searchQuery')
    max_results = int(request.args.get('maxResults'))

    videos = scrapetube.get_search(search_query, max_results)
    video_data = []

    for video in videos:
        video_id = video['videoId']
        video_url = f'https://www.youtube.com/watch?v={video_id}'
        yt = YouTube(video_url) 
        video_length = yt.length # Fetch the video length
        video_data.append({'videoId': video_id, 'videoLength': video_length})
    
    print(video_data)

    return jsonify(video_data)

if __name__ == '__main__':
    app.run(debug=True, port=8224, host=str(YTSCRAPER_URL))
