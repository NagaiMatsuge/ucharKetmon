import React, {useEffect, useState} from "react";
import axios from "axios";


const UpdateInstruments = () => {

    const [instruments, setInstruments] = useState([])

    useEffect(() => {
        fetchInstruments();
        const interval = setInterval(() => fetchInstruments(), 2000)
        return () => {
            clearInterval(interval);
        }
    }, []);

    const fetchInstruments = () => {
        axios
            .get('http://localhost:5000/instrument-list')
            .then((res) => {
                setInstruments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="modal fade modal-xl" id="updateInstrumentsModal" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Instruments</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-3">
                            <div className="col-auto">
                                <input type="text" className="form-control" id="instrumentName"
                                       placeholder="Name"></input>
                            </div>
                            <div className="col-auto">
                                <input type="text" className="form-control" id="instrumentValue"
                                       placeholder="Value"></input>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-3">Save</button>
                            </div>
                        </form>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Value</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {instruments.map((instrument, index) => (
                                <tr className="w-25">
                                    <td>{index + 1}</td>
                                    <td>{instrument['name']}</td>
                                    <td>{instrument['value']}</td>
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

export default UpdateInstruments