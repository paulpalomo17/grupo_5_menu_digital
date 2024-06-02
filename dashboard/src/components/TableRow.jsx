import React from 'react';

export function TableRow(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.first_name}</td>
            <td>{props.last_name}</td>
            <td>{props.email}</td>
            <td className="text-center"> <img className="img-fluid "
                src={props.imageURL}
                alt={props.first_name}
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            /></td>
        </tr>
    )
}