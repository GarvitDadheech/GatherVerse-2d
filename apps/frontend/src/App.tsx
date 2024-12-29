import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import OnboardingPage from "./pages/Onboarding";
import PublicRooms from "./pages/PublicRooms";
import Room from "./pages/Room";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/public-rooms" element={<PublicRooms />} />
        <Route path="/room" element={<Room/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
