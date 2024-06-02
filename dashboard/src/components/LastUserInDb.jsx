import React from "react";
import { useState, useEffect } from 'react';

export function LastUserInDb() {
    let [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then((res) => res.json())
            .then((result) => setUsers(result.data))
            .catch((e) => console.log(e));
    }, []);
    console.log(users.length);
    // let user = users[users.length-1]

    return (
        <div className="col-lg-6 mb-4">
            {
                users.length > 0 && users.map((user, i) => {
                    if (i + 1 == users.length) {
                        return (
                            <div className="card shadow mb-4" key={user.id}>
                                <div className="card-header py-3">
                                    <h5 className="m-0 font-weight-bold text-gray-800">
                                        Ultimo usuario en DB
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div className="text-center">
                                        <img
                                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                            style={{ width: 25 + "rem" ,borderRadius: "100%"}}
                                            src={user.imageURL}
                                            alt={user.name}
                                        />
                                    </div>
                                    <p>
                                        {user.first_name} - {user.last_name}
                                    </p>
                                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
                                        Ver mas detalles
                                    </a>
                                </div>
                            </div>
                        )
                    }

                })
            }

        </div>
    )
}

