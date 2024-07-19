import React, { useEffect, useState } from "react";
import icon from "../images/icon-dribbble.svg";
import { FaMoon } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { changeBasketStatus } from "../redux/slices/basketSlice";
import {
  getAllProducs,
  getFromBasketFromStorage,
  productCounts,
  searchProduct,
  setChangeTheme,
  setEmptyBasket,
} from "../redux/slices/productSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var search = "";

  const {
    basketCounts,
    showInput,
    BasketItemsFromStorage,
    changeTheme,
    products,
    searchValue,
  } = useSelector((state) => state.product);

  useEffect(() => {
    changeThemee();
  }, [changeTheme]);

  useEffect(() => {
    console.log(basketCounts);
    dispatch(productCounts());
  }, [BasketItemsFromStorage]);
  console.log(changeTheme);

  const changeThemee = () => {
    const logo = document.getElementById("logo");

    if (changeTheme) {
      document.body.style.backgroundColor = "#363636";
      logo.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      logo.style.color = "gray";
    }
  };

  return (
    <div className="flex justify-between mt-3 items-center ">
      <div className="flex hover:cursor-pointer" onClick={() => navigate("/")}>
        <img className="w-12 pt-3" src={icon} alt="" />
        <h3 id="logo" className="mt-5 font-bold text-xl ml-2 max-md:hidden">
          Rumeysa A.Ş.
        </h3>
      </div>
      <div className="flex items-center ">
        {showInput && (
          <input
            className={`p-3 rounded-md h-9 border-b-2 border-solid border-gray-500 mr-1
               ${changeTheme && "text-black"}`}
            type="text"
            placeholder="Bir şeyler ara"
            value={searchValue}
            onChange={(e) => {
              dispatch(searchProduct(e.target.value));
              console.log(products);
              // dispatch(getAllProducs());
            }}
          />
        )}
        {!changeTheme ? (
          <FaMoon
            className="hover:cursor-pointer"
            onClick={() => dispatch(setChangeTheme(true))}
          />
        ) : (
          <MdOutlineLightMode
            className="text-white text-lg hover:cursor-pointer"
            onClick={() => dispatch(setChangeTheme(false))}
          />
        )}

        <Badge badgeContent={basketCounts || "0"} color="secondary">
          {!changeTheme ? (
            <SlBasket
              className=" ml-2 text-xl hover:cursor-pointer"
              onClick={() => {
                navigate("/basket");
                dispatch(changeBasketStatus());
              }}
            />
          ) : (
            <SlBasket
              className=" text-white ml-2 text-xl hover:cursor-pointer"
              onClick={() => {
                navigate("/basket");
                dispatch(changeBasketStatus());
              }}
            />
          )}
        </Badge>
      </div>
    </div>
  );
}

export default Header;
