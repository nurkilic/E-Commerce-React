import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getFromBasketFromStorage,
  productCounts,
} from "../redux/slices/productSlice";
import { useSelector } from "react-redux";

function Product({ product }) {
  const navigate = useNavigate();
  const { changeTheme } = useSelector((state) => state.product);

  return (
    <div
      onClick={() => navigate("/productDetail/" + product.id)}
      className={`rounded-lg w-[270px] my-5  mx-1 p-2  pb-5 shadow-lg text-center justify-center items-center hover:shadow-2xl hover:cursor-pointer transition-all max-md:w-2/5  ${
        changeTheme ? "border-2 border-solid border-white shadow-slate-500" : ""
      }`}
    >
      <img
        className="w-44 h-60 max-md:h-3/5 mx-auto rounded-md"
        src={product.image}
        alt=""
      />
      <div className="h-24 max-md:text-sm max-md:h-1/3 max-md:overflow-scroll ">
        {product.title}
      </div>
      <div className="p-2 text-red-500 font-bold">{product.price} ₺ </div>
      <button
        className="rounded-lg text-white bg-slate-700 p-2 hover:bg-[rgb(156,39,176)]  transition-all 
         max-md:h-[%3] max-md:w-[%20] max-md:text-sm max-md:hidden "
        onClick={() => navigate("/productDetail/" + product.id)}
      >
        Detayına Git
      </button>
    </div>
  );
}

export default Product;
