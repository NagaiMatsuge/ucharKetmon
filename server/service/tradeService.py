from server.utils.trader.trader import Trader
import datetime

trader = Trader()


def sayHello():
    return trader.calculateTradeInputsForUSDPairs(0.66952)


def getAllowedChats(db):
    dbCursor = db['dbConnector'].cursor()
    rows = dbCursor.execute('SELECT * FROM selected_channels').fetchall()

    response = []
    for i in range(0, len(rows)):
        data = rows[i]
        response.append({
            'id': data[0],
            'chat_id': data[1],
            'chat_name': data[2],
            'allow_multiple_tp': data[3],
            'take_profit_key_words': data[4],
            'stop_loss_key_words': data[5],
            'allow_market_watch': data[6],
            'selected_lost_size': data[7]
        })

    return response


def getAllInstruments(db):
    rows = db['dbCursor'].execute('SELECT * from allowed_instruments').fetchall()
    result = []
    for i in range(0, len(rows)):
        result.append({
            "id": rows[i][0],
            "name": rows[i][1],
            "value": rows[i][2]
        })

    return result


def updateInstrumentInfo(db, instrumentData):
    for i in range(0, len(instrumentData)):
        data = instrumentData[i]
        if 'id' in data:
            if data['delete']:
                deleteInstrument(db, data)

            updateInstrument(db, data)
            continue

        createInstrument(db, data)

    db['dbConnector'].commit()


def createInstrument(db, data):
    db['dbCursor'].execute("INSERT INTO allowed_instruments VALUES ("
                           f"NULL, '{data['name']}', '{data['value']}'"
                           ")")


def updateInstrument(db, data):
    db['dbCursor'].execute("UPDATE allowed_instruments SET "
                           f"name='{data['name']}', value='{data['value']}' "
                           f"WHERE id = {data['id']}")


def deleteInstrument(db, data):
    db['dbCursor'].execute(f"DELETE FROM allowed_instruments WHERE id = {data['id']}")


def getActiveTrades():
    activeTrades = trader.getActiveTrades()

    response = []
    for i in (range(0, len(activeTrades.values))):
        response.append(constructTradeInfo(activeTrades.values[i], True))

    return response


def getClosedTrades():
    closedTrades = trader.getClosedPositions()

    response = []
    for i in (range(0, len(closedTrades.values))):
        response.append(constructTradeInfo(closedTrades.values[i], False))

    return response[::-1]


def getAccountInfo():
    return trader.getAccountInfo()


def createTrade(data):
    return trader.placeOrder(data)


def constructTradeInfo(values, active):
    value = {
        'ticket': values[0],
        'instrument': values[1],
        'order_ticket': values[2],
        'position_type': values[3],
        'magic_number': values[4],
        'volume': values[5],
        'open_price': values[6],
        'open_time': datetime.datetime.fromtimestamp(values[7]),
        'stop_loss': values[8],
        'take_profit': values[9]
    }

    if not active:
        value2 = {
            'close_price': values[10],
            'close_time': values[11],
            'comment': values[12],
            'profit': values[13],
            'swap': values[14],
            'commission': values[15]
        }
    else:
        value2 = {
            'comment': values[10],
            'profit': values[11],
            'swap': values[12],
            'commission': values[13]
        }

    return {**value, **value2}
