from server.utils.trader.trader import Trader
import datetime

trader = Trader()


def sayHello():
    return trader.calculateTradeInputsForUSDPairs(0.66952)


def getActiveTrades():
    activeTrades = trader.getActiveTrades()

    response = []
    for i in (range(0, len(activeTrades.values))):
        response.append(constructTradeInfo(activeTrades.values[i]))

    return response


def getClosedTrades():
    closedTrades = trader.getClosedPositions()

    response = []
    for i in (range(0, len(closedTrades.values))):
        response.append(constructTradeInfo(closedTrades.values[i]))

    return response


def getAccountInfo():
    return trader.getAccountInfo()


def createTrade(data):
    return trader.placeOrder(data)


def constructTradeInfo(values):
    return {
        'ticket': values[0],
        'instrument': values[1],
        'order_ticket': values[2],
        'position_type': values[3],
        'magic_number': values[4],
        'volume': values[5],
        'open_price': values[6],
        'open_time': datetime.datetime.fromtimestamp(values[7]),
        'stop_loss': values[8],
        'take_profit': values[9],
        'comment': values[10],
        'profit': values[11],
        'swap': values[12],
        'commission': values[13]
    }
