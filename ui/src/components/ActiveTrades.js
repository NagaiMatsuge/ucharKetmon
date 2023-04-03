import React, {useState, useEffect} from 'react';
import axios from "axios";
import AnimatedNumber from "animated-number-react2";

const ActiveTrades = () => {
    const [activeTrades, setActiveTrades] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0)
    useEffect(() => {
        fetchActiveTrades();
        const interval = setInterval(() => fetchActiveTrades(), 2000)
        return () => {
            clearInterval(interval);
        }
    }, []);
    const formatValue = (value) => value.toFixed(2);
    const fetchActiveTrades = () => {
        axios
            .get('http://localhost:5000/active-trades')
            .then((res) => {
                setActiveTrades(res.data);
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

    return (
        <div className="container border rounded mt-4">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Trades: {activeTrades.length}</th>
                    <th scope="col">Instrument</th>
                    <th scope="col">Profit: <AnimatedNumber
                            value={totalProfit}
                            formatValue={formatValue}
                            duration={500}
                        /></th>
                    <th scope="col">From</th>
                </tr>
                </thead>
                <tbody>
                {activeTrades.map((trade, index) => (
                    <tr key={index} className="w-25">
                        <th scope="row">{trade['ticket']}</th>
                        <td>{trade['instrument']}</td>
                        <td><AnimatedNumber
                            value={trade['profit']}
                            formatValue={formatValue}
                            duration={500}
                        /></td>
                        <td>{trade['comment'] ? trade['comment'] : 'Not from Signal Channel'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


export default ActiveTrades