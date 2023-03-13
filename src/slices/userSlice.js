import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    handleLogout: (state) => {
      state.user = null;
      state.isLogged = false;
    },
  },
});

export const { handleLogin, handleLogout } = userSlice.actions;

export default userSlice.reducer;
