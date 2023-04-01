import History from "./components/History"
import ActiveTrades from "./components/ActiveTrades";
import Info from "./components/Info";
import UpdateInstruments from "./components/UpdateInstruments";
import UpdateChannels from "./components/UpdateChannels";

function App() {
    return (
        <div className="">
            <div className="App container border rounded mt-3">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Custom_Trader</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#updateInstrumentsModal">Update Instruments</button></li>
                                        <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#updateChannelsModal">Select Channels</button></li>
                                        <li>
                                            <hr className="dropdown-divider"></hr>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <select className="form-select me-2" aria-label="Default select example">
                                    <option selected>Select instrument</option>
                                    <option value="1">GBPJPY</option>
                                    <option value="2">NASDAQ</option>
                                    <option value="3">GOLD</option>
                                </select>
                                <input className="form-control me-2" type="number" placeholder="risk-percentage"
                                       aria-label="risk"></input>
                                <input className="form-control me-2" type="number" placeholder="stop-loss-pips"
                                       aria-label="Search"></input>
                                <input className="form-control me-2" type="number" placeholder="take-profit-pips"
                                       aria-label="tp"></input>
                                <button className="btn btn-success me-2" type="submit">Buy</button>
                                <button className="btn btn-danger" type="submit">Sell</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <UpdateInstruments />
            <UpdateChannels />
            <Info />
            <ActiveTrades />
            <History/>
        </div>
    )
        ;
}

export default App;
