import LoginPage from './pages/Login';
import { BrowserRouter, Routes, Navigate,Route } from 'react-router-dom';
import PublicRooms from './pages/PublicRooms';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/room-selection" element={<RoomSelection />} /> */}
        <Route path="/public-rooms" element={<PublicRooms onBack={() => { /* handle back action */ }} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
