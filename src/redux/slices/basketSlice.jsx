import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalNumberOfProduct: 0,
  isOpen: false,
};


export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addTotalNumberOfProduct: (state, action) => {
      state.totalNumberOfProduct += 1;
    },
    changeBasketStatus: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { changeBasketStatus } = basketSlice.actions;
export default basketSlice.reducer;
