import React from "react";
import { SideBar } from "./components/SideBar";
import { ContentWrapper } from "./components/ContentWrapper";
import { TopBar } from "./components/TopBar";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";
import { Route, Routes } from "react-router";

import "./App.css";
import "./index.css";

import ListProducts from "./components/ListProducts";
import { LastUserInDb } from "./components/LastUserInDb";
import TypesInDb from "./components/TypesInDb";
import Totals from "./components/Totals";
import { TotalProducts } from "./components/TotalProducts";
import { TotalUsers } from "./components/TotalUsers";
import { TotalTypes } from "./components/TotalTypes";
import SearchProducts from "./components/SearchProducts";

export function App() {
  return (
    <React.Fragment>
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          {/*<!-- Main Content -->*/}
          <div id="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<ContentWrapper />} />
              <Route path="/typestotals" element={<TypesInDb />} />
              <Route path="/products" element={<ListProducts />} />
              <Route path="/lastUser" element={<LastUserInDb />} />
              <Route path="/totalproducts" element={<TotalProducts />} />
              <Route path="/totalusers" element={<TotalUsers />} />
              <Route path="/totaltypes" element={<TotalTypes />} />
              <Route path="/totals" element={<Totals />} />
              <Route path="/search" element={<SearchProducts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
