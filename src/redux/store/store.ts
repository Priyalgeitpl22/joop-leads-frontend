import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import organizationReducer from "../slice/organizationSlice";
import agentsReducer from '../slice/agentsSlice';
import threadReducer from "../slice/threadSlice";
import chatsReducer from "../slice/chatSlice";
import authReducer from "../slice/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, 
    organization: organizationReducer,
    agents: agentsReducer,
    thread: threadReducer,
    chats: chatsReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
