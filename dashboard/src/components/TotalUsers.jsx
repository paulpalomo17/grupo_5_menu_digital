import React from 'react';
import { useState, useEffect } from 'react';

export function TotalUsers() {
    let [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then((res) => res.json())
            .then((result) => setUsers(result.meta))
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className="col-md-6 mb-4">
            <div className={`card border-left-info shadow h-100 py-2`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-info text-uppercase mb-1`}>Usuarios</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{users.count}</div>
                        </div>
                        <div className="col-auto">
                            <i className={`fas fa-user fa-2x text-gray-300`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}