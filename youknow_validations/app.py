from config.logging import setup_logger
import os
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from asyncio import run
from chat_impl import ChatImpl
from kandinsky import Kandinsky_impl
from dotenv import load_dotenv

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
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')
    KANDINSKY_API_KEY = os.getenv('KANDINSKY_API_KEY')
    KANDINSKY_SECRET_KEY = os.getenv('KANDINSKY_SECRET_KEY')
    IMGUR_CLIENT_ID= os.getenv('IMGUR_CLIENT_ID')
    PROXY_LOGIN = os.getenv('PROXY_LOGIN')
    PROXY_PASSWORD = os.getenv('PROXY_PASSWORD')
    PROXY_IP = os.getenv('PROXY_IP')
    PROXY_PORT = os.getenv('PROXY_PORT')
    YOUKNOW_URL = os.getenv('YOUKNOW_URL')
    VALIDATIONS_URL = os.getenv('VALIDATIONS_URL')

    # Check for at least one LLM API key
    if not (OPENAI_API_KEY or DEEPSEEK_API_KEY):
        logger.error("Missing OpenAI or DeepSeek API key")
        raise ValueError("At least one LLM API key (OpenAI/DeepSeek) is required")
        
    # Check other required variables
    required_vars = [
        KANDINSKY_API_KEY, KANDINSKY_SECRET_KEY, IMGUR_CLIENT_ID,
        PROXY_LOGIN, PROXY_PASSWORD, PROXY_IP, PROXY_PORT,
        YOUKNOW_URL, VALIDATIONS_URL
    ]
    if not all(required_vars):
        logger.error("Missing required environment variables")
        raise ValueError("Missing required environment variables")
        
    logger.info("Configuration loaded successfully")
except Exception as e:
    logger.error(f"Error loading configuration: {str(e)}")
    raise

class Server:
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app, origins=str(YOUKNOW_URL))
        self.chat = ChatImpl(OPENAI_API_KEY=OPENAI_API_KEY, DEEPSEEK_API_KEY=DEEPSEEK_API_KEY, PROXY_LOGIN=PROXY_LOGIN, PROXY_PASSWORD=PROXY_PASSWORD, PROXY_IP=PROXY_IP, PROXY_PORT=PROXY_PORT)
        self.kandinsky = Kandinsky_impl('https://api-key.fusionbrain.ai/', KANDINSKY_API_KEY, KANDINSKY_SECRET_KEY)
        self.setup_routes()
        
    def setup_routes(self):

        @self.app.route('/call_chat', methods=['GET', 'OPTIONS'])
        def call_chat():
            result = run(self.chat.call_chat(request.args.get('action'), request.args.get('title'), request.args.get('units'), request.args.get('chapterName'), request.args.get('transcript'), request.args.get('policies')))
            return jsonify(result)

        @self.app.route('/call_kandinsky', methods=['GET', 'OPTIONS'])
        def call_kandinsky():
            result = run(self.kandinsky.call_kandinsky(request.args.get('prompt'), IMGUR_CLIENT_ID))
            return jsonify(result)

    def run(self, debug, port, host):
        print(f'Listening on http://{host}:{port}')
        self.app.run(debug=debug, port=port, host=host)


if __name__ == '__main__':
    server = Server()
    server.run(debug=True, port=8225, host=str(VALIDATIONS_URL))
