import React from "react";
import { Link } from "react-router-dom";
import eric from "../assets/eric.png";

const imgStyle = { width: "200px", borderRadius: "100%" };
const divStyle = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  alignItems: "center",
};
const liStyle = { listStyleType: "none" };
const ulStyle = { display: "flex", justifyContent: "center" };

export const NotFound = () => {
  return (
    <div style={divStyle}>
      <img style={imgStyle} src={eric} alt="eric-img" />
      <h1>¿Qué pasó, crack? ¿Te perdiste?</h1>
      <h4>Vení aca, que papá Eric te guía.</h4>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <p>Home</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

