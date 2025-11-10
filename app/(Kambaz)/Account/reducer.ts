import { createSlice } from "@reduxjs/toolkit";


export interface User {
  _id: string;
  name: string;
  email?: string;
  role: "STUDENT" | "FACULTY" | string;
}

interface AccountState {
  currentUser: User | null;
}

const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;