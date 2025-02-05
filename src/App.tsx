import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
                  <Route path='/chats' element={<Chats />} />
                  <Route path="/settings/configuration" element={<Configuration />} />
                  <Route path="/settings/agents" element={<Agents />} />
                </Routes>
              </MainContainer>
              </div>
            </DashboardContainer>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
