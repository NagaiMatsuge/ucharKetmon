from server.utils.pytrader.Pytrader_API_V2_081 import Pytrader_API

brokerInstrumentsLookup = {'EURUSD': 'EURUSD', 'GOLD': 'XAUUSD', "US100Cash": "US100Cash", 'GBPJPY': 'GBPJPY'}


class Trader:
    stop_loss_percent = 3
    fixed_balance = 100_000
    BUY_TRADE = "buy"
    SELL_TRADE = "sell"

    def __init__(self):
        self.MT_SERVER = '127.0.0.1'
        self.MT_PORT = 10014
        self.INSTRUMENTS = brokerInstrumentsLookup
        self.MT = Pytrader_API()
        self.MT_CONN = self.MT.Connect(server=self.MT_SERVER, port=self.MT_PORT, instrument_lookup=self.INSTRUMENTS)
        self.performInitialCheckup()

    def performInitialCheckup(self):
        if self.MT.Check_connection():
            print("Connected to server successfully!")
        else:
            print("Unable to connect to server!")

    def placeOrder(self, data):
        result = {
            "error": None,
            "ticket": self.MT.Open_order(
                instrument=data['instrument'],
                ordertype=data['orderType'],
                volume=data['volume'],
                openprice=0.0,
                stoploss=data['stopLoss'],
                takeprofit=data['takeProfit'],
                comment=data['comment']
            )
        }

        if result["ticket"] == -1:
            result["error"] = self.MT.order_return_message

        return result

    def copyTradeFromTelegram(self, instrument, orderType, stopLoss, takeProfit, lot, comment):
        result = {
            "error": None,
            "ticket": self.MT.Open_order(
                instrument=instrument,
                ordertype=orderType,
                volume=lot,
                openprice=0.0,
                stoploss=stopLoss,
                takeprofit=takeProfit,
                comment=comment
            )
        }

        if result["ticket"] == -1:
            result["error"] = self.MT.order_return_message

        return result

    def calculateTradeInputs(self, orderType, instrument_price, stopLossPips, takeProfitPips):
        allowed_loss = self.fixed_balance * self.stop_loss_percent / 100
        lot_size = allowed_loss / (10 * stopLossPips)
        if orderType == self.BUY_TRADE:
            stop_loss = instrument_price - (stopLossPips / 100)
            take_profit = instrument_price + (takeProfitPips / 100)
        else:
            take_profit = instrument_price - (takeProfitPips / 100)
            stop_loss = instrument_price + (stopLossPips / 100)

        return {
            "lot_size": lot_size,
            "stop_loss": stop_loss,
            "take_profit": take_profit
        }

    def calculateTradeInputsForUSDPairs(self, instrument_price):
        stopLossPips = 200
        allowed_loss = self.fixed_balance * self.stop_loss_percent / 100
        one_pip_value = 0.0001 / instrument_price * 100_000
        lot_value = allowed_loss / (one_pip_value * stopLossPips)
        return {
            "one_pip_value": one_pip_value,
            "lot_value": lot_value,
            "allowed_loss": allowed_loss
        }

    # Working correctly
    def calculateTradeInputsForJPYPairs(self, instrument_price):
        stopLossPips = 30
        allowed_loss = self.fixed_balance * self.stop_loss_percent / 100
        one_pip_value = 0.01 / instrument_price * 100_000
        lot_value = allowed_loss / (one_pip_value * stopLossPips)

        return {
            "one_pip_value": one_pip_value,
            "lot_value": lot_value,
            "allowed_loss": allowed_loss
        }

    def fetchCurrentInstrumentPrice(self, instrument):
        last_tick = self.MT.Get_last_tick_info(instrument=instrument)

        return last_tick['ask']

    def setStopLossPercent(self, stopLoss):
        self.stop_loss_percent = stopLoss

    def setFixedBalance(self, fixedBalance):
        self.fixed_balance = fixedBalance

    def getActiveTrades(self):
        return self.MT.Get_all_open_positions()

    def getClosedPositions(self):
        return self.MT.Get_all_closed_positions()

    def getAccountInfo(self):
        static_info = self.MT.Get_static_account_info()
        dynamic_info = self.MT.Get_dynamic_account_info()
        return {**static_info, **dynamic_info}

    def getInstrumentInfo(self):
        return self.MT.Get_instrument_info('EURUSD')
