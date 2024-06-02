import React from "react";
import { useState, useEffect } from 'react';
import { Card } from "./Card";

function Totals() {
    let [listTotals, setTotals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products/totals")
            .then((res) => res.json())
            .then((result) => setTotals(result.data))
            .catch((e) => console.log(e));
    }, []);
    return (
        <div className="row">
            {listTotals.map((total, i) => {
                return <Card {...total} key={i} />;
            })}
        </div>
    );
}

export default Totals;