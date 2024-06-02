import React from 'react'

function Type(props) {
    return (
        <div className="col-lg-6 mb-4">
            <div className={`card bg-danger text-white shadow`}>
                <div className="card-body">
                    {props.name} - {props.count}
                </div>
            </div>
        </div>
    )
}

export default Type;