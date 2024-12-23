import LoginPage from './pages/Login';
import RoomSelection from './pages/CreateRoomModal';
import { BrowserRouter, Routes, Navigate,Route } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/room-selection" element={<RoomSelection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
