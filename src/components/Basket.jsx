import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFromBasketFromStorage,
  minusBasket,
  plusBasket,
  setEmptyBasket,
  setFalseInputVisibility,
} from "../redux/slices/productSlice";

function Basket() {
  const dispatch = useDispatch();
  const { basketItems, BasketItemsFromStorage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getFromBasketFromStorage());
    dispatch(setFalseInputVisibility());
    // dispatch(productCounts());
  }, []);
  // console.log(filterBasket);
  var totalPrice = 0;

  console.log("basketItems", basketItems);
  console.log("BasketItemsFromStorage", BasketItemsFromStorage);

  return (
    <div className="flex max-sm:flex-wrap justify-center min-w-80 ">
      <div className="">
        {BasketItemsFromStorage.length < 1 && (
          <h2 className="w-full mt-12 text-lg border-gray">
            Sepetin şu an boş
          </h2>
        )}
      </div>
      <div
        // className="absolute top-16 right-0 w-[600px] h-screen rounded-md overflow-scroll p-4 bg-violet-100"
        className="mr-5 my-5 justify-between  w-3/4 max-sm:w-full "
      >
        {BasketItemsFromStorage &&
          BasketItemsFromStorage.map((item, index) => {
            totalPrice += item.price * item.count;
            return (
              <div
                key={index}
                className="flex justify-between my-2 border-gray max-[477px]:flex-col max-[477px]:gap-y-2  shadow-md max-sm:p-5"
              >
                <div className="flex items-center ">
                  <img className="w-10 rounded-md " src={item.image} alt="" />
                  <div className="text-sm ml-2">{item.title}</div>
                </div>

                <div className="flex justify-start items-center">
                  <button
                    className="bg-[rgb(156,39,176)] rounded-md text-white w-4 ml-2 "
                    onClick={() => {
                      dispatch(minusBasket(item));
                    }}
                  >
                    -
                  </button>
                  <div className="mx-1">{item.count}</div>

                  <button
                    className="bg-[rgb(156,39,176)] rounded-md text-white w-4 mr-2"
                    onClick={() => dispatch(plusBasket(item.id))}
                  >
                    +
                  </button>
                  <div className="mr-2 w-16">
                    {Number((item.price * item.count).toFixed(2))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="my-5 text-center max-sm:w-2/3">
        <div className="border-gray  shadow-md">
          Toplam Tutar <br />
          <p className="text-2xl text-center ">
            {Number(totalPrice.toFixed(2))}₺
          </p>
        </div>
        {BasketItemsFromStorage.length > 0 && (
          <button
            className="w-32 rounded-md p-3 bg-[rgb(156,39,176)]  text-white mt-2"
            onClick={() => {
              dispatch(setEmptyBasket());
            }}
          >
            Sepeti Boşalt
          </button>
        )}
      </div>
    </div>
  );
}

export default Basket;
