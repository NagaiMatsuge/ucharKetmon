import threading
from pyrogram import filters
from flask import Flask, request
from service import tradeService
import json
from server.utils.init.initializer import initializeConfigs, initializeDb
from server.utils.telegram.client import TelegramClient

app = Flask(__name__)

initializeConfigs()
db = initializeDb()
client = TelegramClient()
bot = client.getBotReference()


@app.route('/hello')
def sayHello():
    return tradeService.sayHello()


@app.route('/active-trades')
def getActiveTrades():
    return tradeService.getActiveTrades()


@app.route('/closed-trades')
def getClosedTrades():
    return tradeService.getClosedTrades()


@app.route('/account-info')
def getAccountInfo():
    return tradeService.getAccountInfo()


@app.route('/create-trade', methods=['POST'])
def createTrade():
    return tradeService.createTrade(json.loads(request.data))


@app.route('/update-chats', method=['PATCH'])
def updateChatInfo():
    return {
        'success': True,
        'error-message': None
    }


@app.route('/update-instruments', method=['PATCH'])
def updateInstrumentInfo():
    return {
        'success': True,
        'error-message': None
    }


@bot.on_message(filters.channel)
def newTradeSignal(client, message):
    print(message.text)


threading.Thread(target=app.run, daemon=True).start()

try:
    bot.run()
except Exception as e:
    print("Exception occurred " + repr(e))