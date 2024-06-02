import React from 'react';
import { useState, useEffect } from 'react';
import { TableRow } from './TableRow';

function Table() {
    let [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then((res) => res.json())
            .then((result) => setUsers(result.data))
            .catch((e) => console.log(e));
    }, []);

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Image</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                                users.map((row, i) => {
                                    return <TableRow {...row} key={i}/>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Table;