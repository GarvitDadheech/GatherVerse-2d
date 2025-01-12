import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import OnboardingPage from "./pages/Onboarding";
import PublicRooms from "./pages/PublicRooms";
import Room from "./pages/Room";
import { WebSocketProvider } from "./components/providers/WebsocketProvider";

const App: React.FC = () => {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/public-rooms" element={<PublicRooms />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
};

export default App;
