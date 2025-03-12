import logging
import os
from logging.handlers import RotatingFileHandler

def setup_logger():
    # Создаем директорию для логов, если она не существует
    os.makedirs('logs', exist_ok=True)
    
    # Настройка форматтера
    formatter = logging.Formatter(
        fmt="%(asctime)s - %(levelname)s - %(module)s - %(funcName)s:%(lineno)d - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    
    # Настройка файлового обработчика
    file_handler = RotatingFileHandler(
        filename='logs/youknow_ytscraper.log',
        maxBytes=5 * 1024 * 1024,  # 5MB
        backupCount=5,
        encoding='utf-8'
    )
    file_handler.setFormatter(formatter)
    
    # Создаем и настраиваем корневой логгер
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    logger.addHandler(file_handler)
    
    return logger