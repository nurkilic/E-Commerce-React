import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducs = createAsyncThunk("products", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

export const getSingleProductById = createAsyncThunk("product", async (id) => {
  const response = await axios.get(
    "https://fakestoreapi.com/products/" + id
    // + { id }
  );
  return response.data;
});

const initialState = {
  products: [],
  singleProduct: {},
  loading: false,
  count: 1,
  total: 0,
  selectedProduct: {},
  basketItems: [],
  basketCounts: 0,
  filterBasket: [],
  dataFilter: {},
  BasketItemsFromStorage: [],
  searchValue: "",
  showInput: true,
  emptyBasket: [],
  changeTheme: false,
  filterProducts:[],
};

const writeFromBasketToStorage = (item) => {
  localStorage.setItem("basketItems", JSON.stringify(item));
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state) => {
      state.count += 1;
    },
    deleteProduct: (state) => {
      if (state.count > 1) state.count -= 1;
    },
    addBasket: (state, { payload }) => {
      const { singleProductItems } = payload;

      const productFind = state.BasketItemsFromStorage.find((item) => {
        return item.id === singleProductItems.id;
      });

      if (productFind) {
        productFind.count = productFind.count + singleProductItems.count;
      } else {
        state.BasketItemsFromStorage.push(singleProductItems);
      }

      writeFromBasketToStorage(state.BasketItemsFromStorage);
    },

    getFromBasketFromStorage: (state) => {
      // state.BasketItemsFromStorage = JSON.parse(
      //   localStorage.getItem("basketItems")
      // ) ? JSON.parse(
      //   localStorage.getItem("basketItems")
      // ) : []  (nulish operator)
      state.BasketItemsFromStorage =
        JSON.parse(localStorage.getItem("basketItems")) ?? [];
    },

    minusBasket: (state, { payload }) => {
      state.BasketItemsFromStorage.map((item) => {
        if (item.id == payload.id) {
          if (payload.count > 1) item.count = item.count - 1;
          if (payload.count == 1) {
            state.BasketItemsFromStorage = state.BasketItemsFromStorage.filter(
              (item) => item.id !== payload.id
            );
          }
          writeFromBasketToStorage(state.BasketItemsFromStorage);
        }
      });

      state.basketCounts = state.BasketItemsFromStorage.length;
    },
    plusBasket: (state, action) => {
      state.BasketItemsFromStorage.map((item) => {
        if (item.id == action.payload) {
          item.count = item.count + 1;
          writeFromBasketToStorage(state.BasketItemsFromStorage);
        }
      });
      state.basketCounts = state.BasketItemsFromStorage.length;
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    productCounts: (state, action) => {
      // state.basketCounts = state.basketCounts + state.count;
      state.basketCounts = state.BasketItemsFromStorage.length;
      // if (state.basketItems.length < 1) state.basketCounts = 0;
    },

    setEmptyBasket: (state) => {
      state.BasketItemsFromStorage = state.emptyBasket;
      writeFromBasketToStorage(state.BasketItemsFromStorage);
    },
    changeColor: (state) => {
      const changeColorButton = document.querySelector(".added");
      changeColorButton.textContent = "Sepete Eklendi";
      changeColorButton.style.backgroundColor = "rgb(166,148,169)";
      changeColorButton.style.transition = "all";
      changeColorButton.style.transitionDuration = "0.2";

      setTimeout(() => {
        changeColorButton.textContent = "Sepete Ekle";
        changeColorButton.style.transition = "all";
        changeColorButton.style.transitionDuration = "0.2";
        changeColorButton.style.backgroundColor = "rgb(156,39,176) ";
      }, 1200);
    },

    resetCount: (state) => {
      state.count = 1;
    },

    searchProduct: (state, action) => {
      state.searchValue = action.payload;
      if(state.searchValue===0)
      {
      state.filterBasket=state.products;
      }
      else{
      state.filterProducts = state.products.filter((item) => {
        return item.title
          .toLocaleLowerCase()
          .includes(state.searchValue.toLocaleLowerCase());
      });
    }
    },

    setFalseInputVisibility: (state) => {
      state.showInput = false;
    },
    setTrueInputVisibility: (state) => {
      state.showInput = true;
    },
    setChangeTheme: (state, action) => {
      state.changeTheme = action.payload;
    },

    // changeTheme: (state, action) => {
    //   state.themeChange = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducs.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllProducs.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filterProducts=action.payload;
    });

    builder.addCase(getSingleProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload;
    });
    builder.addCase(getSingleProductById.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {
  addProduct,
  deleteProduct,
  setSelectedProduct,
  addBasket,
  productCounts,
  minusBasket,
  plusBasket,
  changeColor,
  getFromBasketFromStorage,
  resetCount,
  searchProduct,
  setTrueInputVisibility,
  setFalseInputVisibility,
  setEmptyBasket,
  setChangeTheme,
} = productSlice.actions;
export default productSlice.reducer;
