import React from "react";
import image from "../assets/logo.png";
import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <React.Fragment>
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon">
            <img className="w-50" src={image} alt="Menu Digital" />
          </div>
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Dashboard -->*/}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - Menu Digital</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider" />

        {/*<!-- Heading -->*/}
        <div className="sidebar-heading">Actions</div>

        {/*<!-- Nav Item - Charts -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/typestotals">
            <i className="fa-solid fa-bars"></i>
            <span>Tipos de Comida</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Products -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/products">
            <i className="fa-brands fa-product-hunt"></i>
            <span>Productos</span>
          </Link>
        </li>

        {/*<!-- Nav Item - User -->*/}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/lastUser">
            <i className="fa-solid fa-user"></i>
            <span>Último Usuario en BD</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Total Products -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/totalproducts">
            <i className="fas fa-fw fa-table"></i>
            <span>Total de Productos</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Total Products -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/totalusers">
            <i className="fas fa-fw fa-table"></i>
            <span>Total de Usuarios</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Total Products -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/totaltypes">
            <i className="fas fa-fw fa-table"></i>
            <span>Total de Tipos de Comida</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Totals -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/totals">
            <i className="fas fa-fw fa-table"></i>
            <span>Totales</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Search -->*/}
        <li className="nav-item active">
          <Link className="nav-link" to="/search">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Search Products</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Tables -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/404">
            <i className="fas fa-fw fa-question"></i>
            <span>404</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}
    </React.Fragment>
  );
}
