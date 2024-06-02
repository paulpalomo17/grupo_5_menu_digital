import React from 'react';
import { useState, useEffect, useRef } from 'react';

function SearchProducts() {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then((res) => res.json())
            .then((result) => setProducts(result.data))
            .catch((e) => console.log(e));
    }, []);

    const valor = useRef();
    // console.log(valor.current.value)

    const buscar = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/products")
            .then((res) => res.json())
            .then((result) => {
                let filtro = result.data.filter((product) => product.name.includes(valor.current.value))
                setProducts(filtro);
            })
            .catch((e) => console.log(e));
    }

    return (
        <div className="container-fluid">
            <div className="row my-4">
                <div className="col-12 col-md-6">
                    {/* Buscador */}
                    <form onSubmit={buscar}>
                        <div className="form-group">
                            <label htmlFor="">Buscar por nombre:</label>
                            <input ref={valor} type="text" className="form-control" />
                        </div>
                        <button className="btn btn-info">Search</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Productos:</h2>
                </div>
                {/* Listado de productos */}
                {
                    products.length > 0 && products.map((product) => {
                        return (
                            <div className="col-sm-6 col-md-4 my-4" key={product.id}>
                                <div className="card shadow mb-4" style={{ height: '100%'}}>
                                    <div className="card-header py-3">
                                        <h5 className="m-0 font-weight-bold text-gray-800">{product.name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                                src={product.imageURL}
                                                alt={product.name}
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <p>{product.description}</p>
                                        <p style={{ color: 'green' }} >$ {product.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {products.length === 0 && <div className="alert alert-warning text-center">No se encontraron productos</div>}
        </div>
    )
}

export default SearchProducts;
