import React, {useState, useEffect} from 'react';
import axios from "axios";
import AnimatedNumber from "animated-number-react2";

function History() {

    const [closedTrades, setClosedTrades] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);
    useEffect(() => {
        fetchActiveTrades();
        const interval = setInterval(() => fetchActiveTrades(), 5000)
        return () => {
            clearInterval(interval);
        }
    }, []);
    const formatValue = (value) => value.toFixed(2);
    const fetchActiveTrades = () => {
        axios
            .get('http://localhost:5000/closed-trades')
            .then((res) => {
                setClosedTrades(res.data);
                let sum = 0
                res.data.forEach(trade => {
                    sum += trade['profit']
                })
                setTotalProfit(sum)
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                                   aria-label="Channel"></input>
                            <select className="form-select me-2" aria-label="Default select example">
                                <option value="1" selected>This month</option>
                                <option value="2">Last 2 months</option>
                                <option value="3">Last 6 month</option>
                                <option value="4">Last year</option>
                                <option value="5">All time</option>
                            </select>
                            <button className="btn btn-primary text-nowrap" type="submit">Apply Filter</button>
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
                {closedTrades.reverse().map((trade) => (
                    <tr className="w-25">
                        <th scope="row">{trade['ticket']}</th>
                        <td>{trade['instrument']}</td>
                        <td className={trade['profit'] > 0 ? "text-success" : "text-danger"}>{trade['profit']}</td>
                        <td>{trade['comment'] ? trade['comment'] : 'Not from Signal Channel'}</td>
                    </tr>
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