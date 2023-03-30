function Info() {
    return (
        <div className="container d-flex justify-content-evenly mt-3 pb-0">
            <div className="card border-dark" style={{maxWidth: "18rem"}}>
                <div className="card-header bg-dark text-white"><b>Profit This Month</b></div>
                <div className="card-body text-dark">
                    <h1 className="card-title">+18%</h1>
                    <p className="card-text">Your profit is <b>$36701</b> this month so far, starting from 1st of March</p>
                </div>
            </div>
            <div className="card border-secondary" style={{maxWidth: "18rem"}}>
                <div className="card-header bg-secondary text-white">Channel Award</div>
                <div className="card-body text-secondary">
                    <h5 className="card-title">APEX NATIONS</h5>
                    <p className="card-text">APEX NATIONS is awarded with the most pofitable channel so far</p>
                </div>
            </div>
            <div className="card border-warning" style={{maxWidth: "18rem"}}>
                <div className="card-header text-white bg-warning">Number of trades</div>
                <div className="card-body text-warning">
                    <h5 className="card-title">23 trades so far</h5>
                    <p className="card-text"><b>17 profitable</b> trades and <br/><b>6 loss</b> trades starting from 1st of March</p>
                </div>
            </div>
        </div>
    )
}

export default Info