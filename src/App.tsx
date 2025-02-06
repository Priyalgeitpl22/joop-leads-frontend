import { Routes, Route, useNavigate } from "react-router-dom";
import { DashboardContainer, MainContainer } from "./styles/layout.styled";
import Sidebar from "./components/SideBar";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/Forgot-Password/Forgot_Password";
import VerifyOtp from "./pages/Verify-OTP/VerifyOtp";
import Configuration from "./pages/Settings/Configuration/Configuration";
import Agents from "./pages/Settings/Agents/Agents";
import ChangePassword from "./components/Change-Password/ChangePassword";
import Chats from "./components/Chats/Chats";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { AppDispatch } from "./redux/store/store";
import { getUserDetails } from "./redux/slice/userSlice";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Handle logout across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "logout") {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  // Fetch user details if token exists
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(getUserDetails()).catch((err) => {
        console.error("Failed to fetch user details:", err);
      });
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route
        path="/*"
        element={
          <DashboardContainer>
            <Sidebar />
            <div style={{ display: "flex", width: "100%", flexDirection: "column", height: "100%" }}>
              <Header />
              <MainContainer>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/settings/configuration" element={<Configuration />} />
                  <Route path="/settings/agents" element={<Agents />} />
                </Routes>
              </MainContainer>
            </div>
          </DashboardContainer>
        }
      />
    </Routes>
  );
};

export default App;
