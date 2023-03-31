import threading
from pyrogram import filters
from flask import Flask, request
from service import tradeService
from service import telegramService
import json
from server.utils.init.initializer import initializeConfigs, initializeDb
from server.utils.telegram.client import TelegramClient

app = Flask(__name__)

initializeConfigs()
db = initializeDb()
client = TelegramClient()
bot = client.getBotReference()


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

    return response


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


@app.route('/update-chats', methods=['PATCH'])
def updateChatInfo():
    try:
        telegramService.updateChatInfo(db, json.loads(request.data))
        return {
            'success': True,
            'error-message': None
        }
    except Exception as e:
        return {
            'success': False,
            'error-message': repr(e)
        }


@app.route('/telegram/chat-list')
def getTelegramChannelList():
    return telegramService.getAllChannels(bot)


@app.route('/update-instruments', methods=['PATCH'])
def updateInstrumentInfo():
    try:
        tradeService.updateInstrumentInfo(db, json.loads(request.data))
        return {
            'success': True,
            'error-message': None
        }
    except Exception as e:
        return {
            'success': False,
            'error-message': repr(e)
        }


@app.route('/instrument-list')
def getAllInstruments():
    try:
        return tradeService.getAllInstruments(db)
    except Exception as e:
        return {
            'success': False,
            'error-message': repr(e)
        }


@bot.on_message(filters.channel)
def newTradeSignal(client, message):
    telegramService.handleSignal(db, message.sender_chat.title, message.sender_chat.id, message.id, message.text)


@bot.on_edited_message(filters.channel)
def updateTrade(client, message):
    print(message.id)


threading.Thread(target=app.run, daemon=True).start()

try:
    bot.run()
except Exception as e:
    print("Exception occurred " + repr(e))
