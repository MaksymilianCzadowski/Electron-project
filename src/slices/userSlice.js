import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogged: false,
  actualConversation: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
      state.conversations = action.payload.conversations;
    },
    handleLogout: (state) => {
      state.user = null;
      state.isLogged = false;
    },
    handleUpdateUser: (state, action) => {
      state.user = action.payload;
    },
    handleActualConversation: (state, action) => {
      state.actualConversation = action.payload;
    }
  },
});

export const { handleLogin, handleLogout, handleUpdateUser, handleActualConversation } = userSlice.actions;

export default userSlice.reducer;
