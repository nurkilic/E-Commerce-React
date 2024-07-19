import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import Home from "../pages/Home";
import Basket from "../components/Basket";


function RouterConfig() {

  return (
    <div className="min-w-80">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/productDetail/:id" element={<ProductDetail />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
      </Routes>
    </div>
  );
}

export default RouterConfig;
