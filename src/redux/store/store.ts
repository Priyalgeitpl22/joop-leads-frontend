import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import organizationReducer from "../slice/organizationSlice";
import agentsReducer from '../slice/agentsSlice';
import threadReducer from "../slice/threadSlice";
import chatsReducer from "../slice/chatSlice";
import authReducer from "../slice/authSlice";
import contactReducer from "../slice/contactSlice";
import emailInboxReducer from "../slice/emailInboxSlice";
import emailAccountReducer from "../slice/emailAccountSlice";
import dashboardReducer from "../slice/dashboardSlice";
import folderReducer from "../slice/emailCampaignFolderSlice"
import threadMessageThreadReducer from "../slice/emailInboxThreadMessage"
import planReducer from "../slice/planSlice";
import orgPlanReducer from "../slice/orgPlanSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    organization: organizationReducer,
    agents: agentsReducer,
    thread: threadReducer,
    chats: chatsReducer,
    auth: authReducer,
    contact:contactReducer,
    emailInbox: emailInboxReducer,
    emailAccount: emailAccountReducer,
    dashboard: dashboardReducer,
    folder: folderReducer,
    threadMessage:threadMessageThreadReducer,
    plan: planReducer,
    orgPlan: orgPlanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
