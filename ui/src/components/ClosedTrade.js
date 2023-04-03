import React from "react";

const ClosedTrade = (props) => {
    return (
        <tr key={props.index} className="w-25">
            <th scope="row">{props.trade['ticket']}</th>
            <td>{props.trade['instrument']}</td>
            <td className={props.trade['profit'] > 0 ? "text-success" : "text-danger"}>{props.trade['profit']}</td>
            <td>{props.trade['comment'] ? props.trade['comment'] : 'Not from Signal Channel'}</td>
        </tr>
    )
}

export default ClosedTrade