import React, {useEffect, useState} from "react";
import axios from "axios";


const UpdateChannels = () => {

    const [channels, setChannels] = useState([])
    const [telegramChats, setTelegramChats] = useState([])
    const [chatId, setChatId] = useState(11);
    const [takeProfitKeyWords, setTakeProfitKeyWords] = useState('');
    const [stopLossKeyWords, setStopLossKeyWords] = useState('');
    const [selectedLotSize, setSelectedLotSize] = useState('');
    const [allowMultipleTp, setAllowMultipleTp] = useState(false);
    const [allowMarketWatch, setAllowMarketWatch] = useState(false);
    const [chatName, setChatName] = useState('');

    useEffect(() => {
        fetchChannels();
        fetchAllTelegramChats();
    }, []);

    const fetchChannels = () => {
        axios
            .get('http://localhost:5000/chat-list')
            .then((res) => {
                setChannels(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchAllTelegramChats = () => {
        axios
            .get('http://localhost:5000/telegram/chat-list')
            .then((res) => {
                setTelegramChats(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const chatSelected = (event) => {
        let chat_name = null
        for (const chat of telegramChats) {
            if (String(chat['chat_id']) === event.target.value) {
                chat_name = chat['chat_name']
                break;
            }
        }

        if (chat_name) {
            setChatId(event.target.value)
            setChatName(chat_name)
            console.log("Chat has been selected")
        }
    }

    const saveChat = (event) => {
        event.preventDefault();
        const requestBody = {
            chat_id: Number(chatId),
            take_profit_key_words: takeProfitKeyWords,
            stop_loss_key_words: stopLossKeyWords,
            selected_lot_size: Number(selectedLotSize),
            allow_multiple_tp: allowMultipleTp,
            allow_market_watch: allowMarketWatch,
            chat_name: chatName,
            delete: false
        };
        axios.patch('http://localhost:5000/update-chats', [requestBody]).then(res => {
            console.log(res)
            fetchChannels();
        })
            .catch(err => console.log(err))
        console.log(requestBody)
    }

    return (
        <div className="modal fade modal-xl" id="updateChannelsModal" aria-labelledby="updateChannelsModal"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="updateChannelModalLabel">Instruments</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-2" onSubmit={saveChat}>
                            <div className="col-auto">
                                <select value={chatId} className="form-select" aria-label="Default select example"
                                        onChange={chatSelected}>
                                    <option value={11}>Select Telegram Channel</option>
                                    {telegramChats.map(chat => (
                                        <option value={chat['chat_id']}>{chat['chat_name']}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-auto">
                                <input type="text" name="take_profit_key_words" className="form-control"
                                       id="take_profit_key_words" value={takeProfitKeyWords}
                                       onChange={event => setTakeProfitKeyWords(event.target.value)}
                                       placeholder="Take Profit Key Words"></input>
                            </div>
                            <div className="col-auto">
                                <input type="text" name="stop_loss_key_words" className="form-control"
                                       id="stop_loss_key_words" value={stopLossKeyWords}
                                       onChange={event => setStopLossKeyWords(event.target.value)}
                                       placeholder="Stop Loss Key Words"></input>
                            </div>
                            <div className="col-auto">
                                <input type="number" name="selected_lot_size" value={selectedLotSize}
                                       className="form-control" id="lot"
                                       onChange={event => setSelectedLotSize(event.target.value)}
                                       placeholder="Lot"></input>
                            </div>
                            <div className="col-auto">
                                <div className="form-check">
                                    <input className="form-check-input" name="allow_multiple_tp" type="checkbox"
                                           id="MultipleTP" onChange={event => setAllowMultipleTp(event.target.checked)}
                                           checked={allowMultipleTp}>
                                    </input>
                                    <label className="form-check-label" htmlFor="MultipleTP">
                                        Multiple TP
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="allow_market_watch" type="checkbox"
                                           onChange={event => setAllowMarketWatch(event.target.checked)}
                                           checked={allowMarketWatch} id="MarketWatch">
                                    </input>
                                    <label className="form-check-label" htmlFor="MarketWatch">
                                        Market Watch
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary" onClick={saveChat}>Save</button>
                            </div>
                        </form>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Multiple TP</th>
                                <th scope="col">Market Watch</th>
                                <th scope="col">Take Profit Key Words</th>
                                <th scope="col">Stop Loss Key Words</th>
                                <th scope="col">Lot</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>0</td>
                                <td>Example Chat Name</td>
                                <td>Yes</td>
                                <td>No</td>
                                <td>take-profit1:,take-profit2:,take-profit3,take-profit4</td>
                                <td>stop-loss:</td>
                                <td>0.01</td>
                                <td></td>
                            </tr>
                            {channels.map((channel, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{channel['chat_name']}</td>
                                    <td>{channel['allow_multiple_tp'] ? 'Yes' : 'No'}</td>
                                    <td>{channel['allow_market_watch'] ? 'Yes' : 'No'}</td>
                                    <td>{channel['take_profit_key_words']}</td>
                                    <td>{channel['stop_loss_key_words']}</td>
                                    <td>{channel['selected_lost_size']}</td>
                                    <td className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-warning me-1">Update</button>
                                        <button type="button" className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateChannels