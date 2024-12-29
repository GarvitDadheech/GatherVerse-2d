import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import OnboardingPage from "./pages/Onboarding";
import PublicRooms from "./pages/PublicRooms";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/public-rooms" element={<PublicRooms />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
