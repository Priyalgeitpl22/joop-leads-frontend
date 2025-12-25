// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import senderAccountService from "../../services/sender.account.service";

// export const fetchSenderAccounts = createAsyncThunk(
//   "senderAccount/fetchSenderAccounts",
//   async () => {
//     const response = await senderAccountService.getSenderAccounts();
//     return response;
//   }
// );

// const initialState: SenderAccountState = {
//   senderAccounts: [],
//   loading: false,
//   error: null,
// };

// export const senderAccountSlice = createSlice({
//   name: "senderAccount",
//   initialState,
//   reducers: {},
// });

// export default senderAccountSlice.reducer;