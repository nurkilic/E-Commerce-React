import { configureStore } from "@reduxjs/toolkit";
import appSlices from "./slices/appSlice";
import productSlice from "./slices/productSlice";
import basketSlice from "./slices/basketSlice";

export default configureStore({
  reducer: {
    app: appSlices,
    product: productSlice,
    basket: basketSlice,
  },
});
