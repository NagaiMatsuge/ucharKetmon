import json
import os
from server.sql import sqlScripts


class Analyzer:
    BUY_ACTION = 1
    SELL_ACTION = 0
    STOP_LOSS_KEY = 'stop_loss'
    TAKE_PROFIT_KEY = 'take_profit'
    stop_loss = None
    take_profit_levels = []
    config = {
        "buy_signals": [
            "buy",
            "buy now"
        ],
        "sell_signals": [
            "sell",
            "sell now"
        ],
        "telegram_user_name": "your_telegram_user_name",
        "api_id": "your_telegram_api_id",
        "api_hash": "your_telegram_api_hash"
    }

    def __init__(self, text, dbCursor, chat_id, chat_name, serialized_chat_info):
        self.chat_id = chat_id
        self.chat_name = chat_name
        self.serialized_chat_info = serialized_chat_info
        self.dbCursor = dbCursor
        self.text = text.lower()
        self.symbol = self.identifySymbol()
        self.action = self.identifyAction()
        self.action_now = self.identifyActionNow()
        self.identifyStopLossLevel()
        self.identifyAllTakeProfitLevels()
        self.checkForConfigFiles()

    def identifyActionNow(self):
        if 'now' in self.text:
            return True

        return False

    def checkForConfigFiles(self):
        if not os.path.isfile('./server/config.json'):
            with open('./server/config.json', 'w') as config_file:
                json.dump(self.config, config_file)
        else:
            with open('./server/config.json', 'r') as config_file:
                self.config = json.load(config_file)

    def identifyAction(self):
        sell_counter = 0
        buy_counter = 0
        for s in self.config['sell_signals']:
            if s in self.text:
                sell_counter += 1

        for b in self.config['buy_signals']:
            if b in self.text:
                buy_counter += 1

        if buy_counter >= 1 and sell_counter == 0:
            return self.BUY_ACTION

        if sell_counter >= 1 and buy_counter == 0:
            return self.SELL_ACTION

        return None

    def identifySymbol(self):
        res = self.dbCursor.execute(sqlScripts.constructGetInstrumentsSql())
        allowedSymbols = res.fetchall()

        for symbol in allowedSymbols:
            if symbol[1].lower() in self.text:
                return symbol[2]

        return None

    def isSignalValid(self):
        if self.action is None or self.symbol is None:
            return False

        if self.identifyActionNow():
            return True

        if self.stop_loss is None or len(self.take_profit_levels) == 0:
            return False

    def identifyAllTakeProfitLevels(self):
        if self.serialized_chat_info['allow_multiple_tp']:
            for i in range(0, len(self.serialized_chat_info['take_profit_key_words']) - 1):
                current_key_word = self.serialized_chat_info['take_profit_key_words'][i]
                self.take_profit_levels.append(self.identifySingleTakeProfitLevel(current_key_word))
        else:
            self.take_profit_levels.append(
                self.identifySingleTakeProfitLevel(self.serialized_chat_info['take_profit_key_words'][0])
            )

    def identifyStopLossLevel(self):
        index_start = self.text.find(self.serialized_chat_info['stop_loss_key_word'])
        index_end = index_start + len(self.serialized_chat_info['top_loss_key_word'])
        skipped_first_space = False
        for i in range(index_end, len(self.text)):
            current_char = self.text[i]
            if current_char.isnumeric():
                if self.stop_loss is None:
                    self.stop_loss = str(current_char)
                    continue

                self.stop_loss = self.stop_loss + str(current_char)

            else:
                if skipped_first_space is False:
                    skipped_first_space = True
                    continue
                else:
                    break

    def identifySingleTakeProfitLevel(self, take_profit_key_word):
        if take_profit_key_word not in self.text:
            return

        take_profit_level = None

        index_start = self.text.find(take_profit_key_word)
        index_end = index_start + len(take_profit_key_word)
        skipped_first_space = False
        for i in range(index_end, len(self.text)):
            current_char = self.text[i]
            if current_char.isnumeric():
                if take_profit_level is None:
                    take_profit_level = str(current_char)
                    continue

                take_profit_level = take_profit_level + str(current_char)

            else:
                if skipped_first_space is False:
                    skipped_first_space = True
                    continue
                else:
                    break

        return take_profit_level
