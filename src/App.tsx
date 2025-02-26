import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./redux/slice/userSlice";
import { AppDispatch } from "./redux/store/store";

import ActivateAccount from "./components/ActivateAccount/ActivateAccount";
import ChangePassword from "./components/Change-Password/ChangePassword";
import Header from "./components/Header/Header";
import Chats from "./components/Chats/Chats";
import Organization from "./components/Organization/Organization";
import Agents from "./components/Settings/Agents/Agents";
import Configuration from "./components/Settings/Configuration/Configuration";
import ForgotPassword from "./pages/Forgot-Password/ForgotPassword";
import PasswordResetConfirmation from "./pages/Forgot-Password/PasswordResetConfirmation";
import ResetPassword from "./pages/Forgot-Password/ResetPassword";
import Register from "./pages/Register/Register";
import VerifyOtp from "./pages/Verify-OTP/VerifyOtp";
import { DashboardContainer, ContentArea } from "./styles/layout.styled";
import Login from "./pages/Login/Login";
import Sidebar from "./components/SideBar";
import Home from "./pages/Home/Home";
import { SocketProvider } from "./context/SocketContext";
import { Toaster } from "react-hot-toast";
import EmailAccount from "./pages/Email-Account/EmailAccount";
import Leads from "./pages/Leads/Leads";
import EmailCampaign from "./pages/Email-Campaign/EmailCampaign";
import EmailInboxs from "./pages/Email-Inbox/EmailInbox";
import NewCampaign from "./pages/Email-Campaign/NewCampaign/NewCampaign";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get("access_token");
  return token ? children : <Navigate to="/login" replace />;
};

const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/confirmation",
  "/change-password",
  "/activate-account",
];

function AppRoutes() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!publicRoutes.includes(location.pathname)) {
      if (!token) {
        navigate("/login");
      } else {
        dispatch(getUserDetails(token))
          .unwrap()
          .catch((error) => {
            console.error("Failed to fetch user details:", error);
            navigate("/login");
          });
      }
    }
  }, [dispatch]);

  return (
    <SocketProvider>
      <Toaster position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/confirmation" element={<PasswordResetConfirmation />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path="/email-campaign/new-campaign" element={<NewCampaign />} />

        <Route
          path="/*"
          element={
            <AuthGuard>
              <DashboardContainer>
                <Header
                  toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <ContentArea>
                  {isSidebarOpen ? <Sidebar /> : null}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/email-campaign" element={<EmailCampaign />} />
                    <Route path="/email-account" element={<EmailAccount />} />
                    <Route path="/email-inbox" element={<EmailInboxs />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/chats" element={<Chats />} />
                    <Route path="/organization" element={<Organization />} />
                    <Route
                      path="/settings/configuration"
                      element={<Configuration />}
                    />
                    <Route path="/settings/agents" element={<Agents />} />
                    <Route
                      path="/settings/configuration"
                      element={<Configuration />}
                    />
                  </Routes>
                </ContentArea>
              </DashboardContainer>
            </AuthGuard>
          }
        />
      </Routes>
    </SocketProvider>
  );
}

export default AppRoutes;
