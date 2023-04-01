import React, {useEffect, useState} from "react";
import axios from "axios";


const UpdateChannels = () => {

    const [channels, setChannels] = useState([])

    useEffect(() => {
        fetchChannels();
        const interval = setInterval(() => fetchChannels(), 2000)
        return () => {
            clearInterval(interval);
        }
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
                        <form className="row g-2">
                            <div className="col-auto">
                                <input type="text" className="form-control" disabled id="lot"
                                       placeholder="Channel"></input>
                            </div>
                            <div className="col-auto">
                                <input type="text" className="form-control" id="take_profit_key_words"
                                       placeholder="Take Profit Key Words"></input>
                            </div>
                            <div className="col-auto">
                                <input type="text" className="form-control" id="stop_loss_key_words"
                                       placeholder="Stop Loss Key Words"></input>
                            </div>
                            <div className="col-auto">
                                <input type="text" className="form-control" id="lot"
                                       placeholder="Lot"></input>
                            </div>
                            <div className="col-auto">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="MultipleTP">
                                    </input>
                                    <label className="form-check-label" htmlFor="MultipleTP">
                                        Multiple TP
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="MarketWatch">
                                    </input>
                                    <label className="form-check-label" htmlFor="MarketWatch">
                                        Market Watch
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto d-flex justify-content-end">
                                <button type="button" className="btn btn-primary">Save</button>
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
                            {channels.map((channel, index) => (
                                <tr>
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