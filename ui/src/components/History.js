import React, {useState, useEffect} from 'react';
import axios from "axios";
import ClosedTrade from "./ClosedTrade";

function History() {

    const [closedTrades, setClosedTrades] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);
    const [searchChannel, setSearchChannel] = useState('')
    const [filteredTrades, setFilteredTrades] = useState([])
    useEffect(() => {
        fetchActiveTrades();
    }, []);
    const formatValue = (value) => value.toFixed(2);
    const fetchActiveTrades = () => {
        axios
            .get('http://localhost:5000/closed-trades')
            .then((res) => {
                setClosedTrades(res.data);
                setFilteredTrades(res.data)
                calculateTotalProfit(res.data)
                return res.data
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const filterTrades = (event) => {
        event.preventDefault()
        let filtered = closedTrades.filter(trade => trade['comment'].search(searchChannel) >= 0)
        setFilteredTrades(filtered)
        calculateTotalProfit(filtered)
    }

    const calculateTotalProfit = (trades) => {
        let sum = 0
        trades.forEach(trade => {
            sum += trade['profit']
        })

        setTotalProfit(sum)
    }

    const identifyColor = (number) => {
        if (number >= 0) {
            return "text-success"
        }

        return "text-danger"
    }

    return (
        <div className="container border rounded mt-4">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between w-100">
                        <a className="navbar-brand" href="#">History</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse w-50" id="navbarSupportedContent">
                        <form className="d-flex w-100" role="search">
                            <input className="form-control me-2" type="search" placeholder="Channel"
                                   aria-label="Channel" value={searchChannel}
                                   onChange={event => setSearchChannel(event.target.value)}></input>
                            <select className="form-select me-2" aria-label="Default select example">
                                <option value="1" selected>This month</option>
                                <option value="2">Last 2 months</option>
                                <option value="3">Last 6 month</option>
                                <option value="4">Last year</option>
                                <option value="5">All time</option>
                            </select>
                            <button onClick={filterTrades} className="btn btn-primary text-nowrap">Apply
                                Filter
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Trades</th>
                    <th scope="col">Instrument</th>
                    <th scope="col" className={identifyColor(totalProfit)}>Profit: {formatValue(totalProfit)}</th>
                    <th scope="col">From</th>
                </tr>
                </thead>
                <tbody>
                {filteredTrades.map((trade, index) => (
                    <ClosedTrade index={index} trade={trade}/>
                ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination d-flex justify-content-end">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default History