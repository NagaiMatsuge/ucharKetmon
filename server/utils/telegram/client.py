from pyrogram import Client
import json


class TelegramClient:
    def __init__(self):
        with open('./server/config.json', 'r') as f:
            self.config = json.load(f)

        self.username = self.config['telegram_user_name']
        self.api_id = self.config['api_id']
        self.api_hash = self.config['api_hash']
        self.bot = Client(self.username, api_id=self.api_id, api_hash=self.api_hash)

    def getBotReference(self):
        return self.bot
