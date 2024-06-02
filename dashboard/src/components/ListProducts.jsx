import React from 'react';
import { useState, useEffect } from 'react';

function ListProducts() {
    let [products, setProducts] = useState([]);
    let [datos, setDatos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products/v2")
            .then((res) => res.json())
            .then((result) => {
                setProducts(result.data)
                setDatos(result)
            }
            )
            .catch((e) => console.log(e));
    }, []);

    const cambiar = (e, valor) => {
        e.preventDefault();

        fetch(`http://localhost:3000/api/products/v2/?page=${valor}`)
            .then((res) => res.json())
            .then((result) => {
                setProducts(result.data);
                setDatos(result);
            })
            .catch((e) => console.log(e));
    };


    let startPage = Math.max(1, datos.currentPage - 2); // Calcula la primera página a mostrar
    let endPage = Math.min(datos.totalPages, startPage + 4); // Calcula la última página a mostrar
    let nroPage = []
    for (let i = startPage; i <= endPage; i++) {
        nroPage.push(i)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2>Productos</h2>
                </div>
                {/* Listado de Productos */}
                {
                    products.length > 0 && products.map((product) => {
                        return (
                            <div className="col-sm-6 col-md-4 my-4" key={product.id}>
                                <div className="card shadow mb-4" style={{ height: '100%' }} >
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
            {products.length === 0 && <div className="alert alert-warning text-center">No se encontraron Productos</div>}
            {/* Paginación */}
            <div className="pagination">
                {datos.currentPage > 1 && <a onClick={(e) => cambiar(e, datos.currentPage - 1)}>Anterior</a>}
                {
                    nroPage.map((i) => {
                        return (
                            <a onClick={(e) => cambiar(e, i)} key={i} className={i === datos.currentPage ? 'active' : ''}>{i}</a>
                        )
                    })
                }
                {datos.currentPage < datos.totalPages && <a onClick={(e) => cambiar(e, datos.currentPage + 1)} >Siguiente</a>}
            </div>
        </div>
    )
}

export default ListProducts;