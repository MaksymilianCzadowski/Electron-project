import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: "home",
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        handleMenu: (state, action) => {
            state.menu = action.payload;
        }
    },
});

export const { handleMenu } = menuSlice.actions;

export default menuSlice.reducer;