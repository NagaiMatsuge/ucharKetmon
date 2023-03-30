def constructGetInstrumentsSql():
    return "SELECT * from allowed_instruments"


def constructGetChannelById(chat_id):
    return f"SELECT * from selected_channels WHERE chat_id = {chat_id}"

