import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import {
  addBasket,
  addProduct,
  changeColor,
  deleteProduct,
  getSingleProductById,
  productCounts,
  getFromBasketFromStorage,
  setFalseInputVisibility,
} from "../redux/slices/productSlice";
import { useEffect } from "react";

function ProductDetail() {
  const { count, basketItems, singleProduct } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProductById(id));
    dispatch(getFromBasketFromStorage());
    dispatch(setFalseInputVisibility());
  }, []);

  const singleProductItems = {
    ...singleProduct,
    count: count,
  };
  console.log("basketItems", basketItems);

  return (
    <div className="mt-6 min-w-80 flex  ">
      <div className="flex max-md:flex-col    " key={singleProduct.id}>
        <div className="w-1/3 max-md:w-full max-md:flex-col ">
          <img
            className="w-64 max-md:w-2/5 rounded-md"
            src={singleProduct.image}
            alt=""
          />
        </div>
        <div className="w-2/3 flex flex-col gap-y-3 max-md:w-full ">
          <div className="font-bold text-lg changeColor">
            {singleProduct.title}
          </div>
          <div className=" text-sm changeColor">
            {singleProduct.description}
          </div>
          <div className="text-red-600 text-2xl font-bold">
            {singleProduct.price}₺{" "}
          </div>
          <div className="flex">
            {/* sepet Count artma yeri */}
            <button
              onClick={() => dispatch(deleteProduct())}
              className="  text-4xl ml-2 "
            >
              <CiCircleMinus />
            </button>

            <span className="text-2xl">{count}</span>
            {/* sepet Count azaltma yeri */}

            <button
              onClick={() => dispatch(addProduct())}
              className=" text-4xl  mr-2 "
            >
              <CiCirclePlus />
            </button>
          </div>
          <button
            onClick={() => {
              dispatch(addBasket({ singleProductItems: singleProductItems }));
              dispatch(getFromBasketFromStorage());
              dispatch(productCounts());
              dispatch(changeColor());
            }}
            className="w-32 rounded-md p-3 bg-[rgb(156,39,176)]  text-white added"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
