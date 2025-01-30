import { BrowserRouter } from 'react-router-dom';
import { DashboardContainer, MainContainer } from './styles/layout.styled';
import Sidebar from './components/SideBar';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings/Settings';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DashboardContainer>
        <Sidebar />
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Header />
        <MainContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainContainer>
        </div>
      </DashboardContainer>
    </BrowserRouter>
  );
};

export default App;
