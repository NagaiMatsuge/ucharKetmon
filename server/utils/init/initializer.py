import os
import json
import sqlite3
from server.utils.analyzer.analyzer import Analyzer


def initializeConfigs():
    if not os.path.isfile('./config.json'):
        with open('./config.json', 'w') as config_file:
            json.dump(Analyzer.config, config_file)


def initializeDb():
    dbConnector = sqlite3.connect('./server/database/storage', check_same_thread=False)
    dbCursor = dbConnector.cursor()

    sql_file = open("./server/sql/initialize.sql")
    sql_as_string = sql_file.read()
    dbCursor.executescript(sql_as_string)

    return {
        'dbConnector': dbConnector,
        'dbCursor': dbCursor
    }
