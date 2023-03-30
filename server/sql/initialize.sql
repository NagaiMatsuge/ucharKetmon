CREATE TABLE IF NOT EXISTS selected_channels (
            id INTEGER PRIMARY KEY,
            chat_id INTEGER NOT NULL,
            chat_name TEXT NOT NULL,
            allow_multiple_tp INTEGER DEFAULT 0,
            take_profit_key_words TEXT NOT NULL,
            stop_loss_key_words TEXT NOT NULL,
            allow_market_watch INTEGER DEFAULT 0,
            selected_lost_size REAL DEFAULT 0.01
            );

CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY,
            tg_chat_id INTEGER NOT NULL,
            tg_chat_name TEXT DEFAULT NULL,
            mt_trade_id INTEGER DEFAULT NULL,
            created_at DATETIME DEFAULT (datetime('now','localtime')),
            order_placed INTEGER DEFAULT 0,
            error_message TEXT DEFAULT NULL,
            signal INTEGER NOT NULL,
            symbol TEXT NOT NULL
            );

CREATE TABLE IF NOT EXISTS allowed_instruments (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            value TEXT NOT NULL
            );