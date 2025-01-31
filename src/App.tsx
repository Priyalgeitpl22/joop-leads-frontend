import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardContainer, MainContainer } from "./styles/layout.styled";
import Sidebar from "./components/SideBar";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <DashboardContainer>
              <Sidebar />
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <Header />
              <MainContainer>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/settings" element={<Settings />} />
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
