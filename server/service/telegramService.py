from server.sql import sqlScripts
from server.utils.analyzer.analyzer import Analyzer
from server.utils.trader.trader import Trader
from pyrogram import raw

trader = Trader()


def handleSignal(db, chat_name, chat_id, message_id, text):
    allowed_chat = getChannelById(db['dbCursor'], chat_id)
    if not allowed_chat:
        print(f'Chat is not allowed: {chat_name}, {chat_id}')
        return

    serialized_chat_info = {
        'chat_id': chat_id,
        'chat_name': chat_name,
        'allow_multiple_tp': allowed_chat[3],
        'take_profit_key_words': allowed_chat[4].split(","),
        'stop_loss_key_word': allowed_chat[5],
        'allow_market_watch': allowed_chat[6],
        'selected_lot_size': allowed_chat[7]
    }

    analyzer = Analyzer(text, db['dbCursor'], chat_id, chat_name, serialized_chat_info)
    if not analyzer.isSignalValid():
        print('Signal Is not valid')
        analyzer.printDetails()
        return

    for i in range(0, len(analyzer.take_profit_levels)):
        orderType = convertActionToSupportedString(analyzer.action)

        ticket = trader.placeOrder(data={
            'instrument': analyzer.symbol,
            'orderType': orderType,
            'stopLoss': analyzer.stop_loss,
            'takeProfit': analyzer.take_profit_levels[i],
            'volume': serialized_chat_info['selected_lot_size'],
            'comment': analyzer.chat_name
        })

        db['dbCursor'].execute("INSERT INTO trades VALUES ("
                               f"NULL, {message_id}, {chat_id}, '{chat_name}', {ticket['ticket']}, NULL, NULL, '{ticket['error']}',"
                               f"{analyzer.action}, '{analyzer.symbol}'"
                               ")")

        db['dbConnector'].commit()

        if ticket['error'] is None:
            print(f'Order Placed from: {chat_name}')
        else:
            print(f"Error Occurred: {ticket['error']}")
            return


def convertActionToSupportedString(action):
    if action == 1:
        return 'buy'

    return 'sell'


def getChannelById(dbCursor, chat_id):
    return dbCursor.execute(sqlScripts.constructGetChannelById(chat_id)).fetchone()


def getAllChannels(bot):
    channels = bot.invoke(raw.functions.messages.GetAllChats(except_ids=[]))
    response = []
    print(channels)
    for i in range(0, len(channels.chats) - 1):
        response.append({
            'chat_id': channels.chats[i].id,
            'chat_name': channels.chats[i].title
        })

    return response


def updateChatInfo(db, channelData):
    for i in range(0, len(channelData)):
        data = channelData[i]
        if 'id' in data:
            changeChatInfo(db, data)
            continue

        createChatInfo(db, data)

    db['dbConnector'].commit()


def createChatInfo(db, data):
    res = db['dbCursor'].execute("INSERT INTO selected_channels VALUES ("
                                 f"NULL,"
                                 f"-100{data['chat_id']},"
                                 f"'{data['chat_name']}',"
                                 f"{data['allow_multiple_tp']},"
                                 f"'{data['take_profit_key_words']}',"
                                 f"'{data['stop_loss_key_words']}',"
                                 f"{data['allow_market_watch']},"
                                 f"{data['selected_lot_size']}"
                                 ")")


def changeChatInfo(db, data):
    sql = "UPDATE selected_channels SET " \
                                 f"chat_id=-100{data['chat_id']}, " \
                                 f"chat_name='{data['chat_name']}', " \
                                 f"allow_multiple_tp={data['allow_multiple_tp']}, " \
                                 f"take_profit_key_words='{data['take_profit_key_words']}', " \
                                 f"stop_loss_key_words='{data['stop_loss_key_words']}', " \
                                 f"allow_market_watch={data['allow_market_watch']}, " \
                                 f"selected_lost_size={data['selected_lot_size']} " \
                                 f"WHERE id = {data['id']}"
    res = db['dbCursor'].execute(sql)
