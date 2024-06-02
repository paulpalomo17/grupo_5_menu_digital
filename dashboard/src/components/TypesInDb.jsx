import React from 'react'
import { useState, useEffect } from 'react';
import Type from './Type';

function TypesInDb() {
    let [types, setTypes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products/types")
            .then((res) => res.json())
            .then((result) => setTypes(result.data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Tipos de Comida y sus Totales</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {/* Listado de Tipos */}
                        {
                            types.length > 0 && types.map((type) => {
                                return <Type key={type.id} name={type.name} count={type.count} />
                            })
                        }
                    </div>
                </div>
            </div>
            {types.length === 0 && <div className="alert alert-warning text-center">No se encontraron Tipos</div>}
        </div>
    )
}

export default TypesInDb;