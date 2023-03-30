function History() {
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
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
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