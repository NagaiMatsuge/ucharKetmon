from server.sql import sqlScripts
from server.utils.analyzer.analyzer import Analyzer
from server.utils.trader.trader import Trader

trader = Trader()


def handleSignal(dbCursor, chat_name, chat_id, text):
    allowed_chat = getChannelById(dbCursor, chat_id)
    if not allowed_chat:
        return

    serialized_chat_info = {
        'chat_id': allowed_chat[1],
        'chat_name': allowed_chat[2],
        'allow_multiple_tp': allowed_chat[3],
        'take_profit_key_words': allowed_chat[4].split(","),
        'stop_loss_key_word': allowed_chat[5],
        'allow_market_watch': allowed_chat[6],
        'selected_lot_size': allowed_chat[7]
    }

    analyzer = Analyzer(text, dbCursor, chat_id, chat_name, serialized_chat_info)
    if not analyzer.isSignalValid():
        return

    for i in range(0, len(analyzer.take_profit_levels) - 1):
        orderType = convertActionToSupportedString(analyzer.action)

        ticket = trader.placeOrder(data={
            'instrument': analyzer.symbol,
            'orderType': orderType,
            'stopLoss': analyzer.stop_loss,
            'takeProfit': analyzer.take_profit_levels[i],
            'volume': serialized_chat_info['selected_lot_size'],
            'comment': analyzer.chat_name
        })

        if ticket['error'] is not None:
            return


def convertActionToSupportedString(action):
    if action == 1:
        return 'buy'

    return 'sell'


def getChannelById(dbCursor, chat_id):
    return dbCursor.execute(sqlScripts.constructGetChannelById(chat_id))
