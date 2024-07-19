import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllProducs,
  getFromBasketFromStorage,
  resetCount,
  searchProduct,
  setTrueInputVisibility,
} from "../redux/slices/productSlice";
import Product from "./Product";

function ProductList() {
  const { products, searchValue, filterProducts } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducs());
    dispatch(resetCount());
    dispatch(setTrueInputVisibility());
    dispatch(getFromBasketFromStorage());
  }, []);
  console.log(searchValue);

  useEffect(() => {
    dispatch(searchProduct(searchValue));
  }, [searchValue]);

  console.log("products", products);

  return (
    <div className=" flex flex-wrap justify-center">
      {filterProducts &&
        filterProducts.map((item) => <Product key={item.id} product={item} />)}
    </div>
  );
}

export default ProductList;
