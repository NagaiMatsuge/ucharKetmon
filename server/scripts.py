# For forex
import math

# Define variables
account_balance = 10000
risk_percentage = 2
stop_loss = 50
currency_pair = 'EURUSD'
pip_value = 0.0001
lot_size = 0

# Calculate lot size
risk_amount = (account_balance * risk_percentage) / 100
pip_value_dollar = risk_amount / stop_loss
lot_size = pip_value_dollar / (pip_value * 10)

# Print lot size
print(f"For a {currency_pair} trade with a ${account_balance} account balance, {risk_percentage}% risk, and a {stop_loss} pip stop loss, the lot size is {math.floor(lot_size)}.")


# For Stocks
account_balance = 10000
risk_percentage = 2
stop_loss = 2
ticker = 'AAPL'
entry_price = 120
position_size = 0

# Import necessary libraries
import yfinance as yf

# Get ticker data
ticker_data = yf.Ticker(ticker)
ticker_price = ticker_data.history(period="1d")['Close'].iloc[-1]

# Calculate position size
risk_amount = (account_balance * risk_percentage) / 100
risk_per_share = ticker_price - stop_loss
shares = risk_amount / risk_per_share
position_size = math.floor(shares * ticker_price)

# Print position size
print(f"For a {ticker} trade with a ${account_balance} account balance, {risk_percentage}% risk, and a {stop_loss} dollar stop loss, the position size is {position_size} dollars at an entry price of {entry_price} dollars.")

# For futures
account_balance = 10000
risk_percentage = 2
stop_loss = 10
entry_price = 1750
contract_size = 100
position_size = 0

# Calculate position size
risk_amount = (account_balance * risk_percentage) / 100
pip_value = 1 / contract_size
pip_value_dollar = pip_value * risk_amount / stop_loss
position_size = pip_value_dollar * 100

# Print position size
print(f"For a Gold trade with a ${account_balance} account balance, {risk_percentage}% risk, and a ${stop_loss} stop loss, the position size is {position_size:.2f} ounces.")


# JPY pairs
account_balance = 10000
risk_percentage = 2
stop_loss = 50
ticker = 'USDJPY'
entry_price = 110.50
position_size = 0

# Calculate position size
risk_amount = (account_balance * risk_percentage) / 100
pip_value = 1000
if ticker == 'USDJPY' or ticker == 'JPYUSD':
    pip_value = 100
pip_value_dollar = pip_value * risk_amount / stop_loss
position_size = pip_value_dollar * 100000

# Print position size
print(f"For a {ticker} trade with a ${account_balance} account balance, {risk_percentage}% risk, and a {stop_loss} pips stop loss, the position size is {position_size:.2f} units of base currency.")



