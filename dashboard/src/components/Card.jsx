import React from 'react';
import PropTypes from 'prop-types';

export function Card(props) {
    return (
        <div className="col-md-4 mb-4">
            <div className={`card border-left-${props.color} shadow h-100 py-2`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-${props.color} text-uppercase mb-1`}> {props.name}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.count}</div>
                        </div>
                        <div className="col-auto">
                            <i className={`fas ${props.icon} fa-2x text-gray-300`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

Card.defaultProps = {
    name: 'No Title',
    color: 'success', //warning danger success
    count: 'No cuatity',
    icon: 'fa-solid fa-question'
}

/* PROPTYPES */

Card.propTypes = {
    atritutes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        count: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        icon: PropTypes.string.isRequired
    })
}