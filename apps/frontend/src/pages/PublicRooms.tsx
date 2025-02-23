import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Background } from "@repo/ui/Background";
import { useNavigate } from "react-router-dom";
import { RoomCard } from "../components/RoomCard";
import { Room } from "../interfaces";
import { useWebSocket } from "../hooks/useWebSocket";
import { wsConnectedState } from "../store/atoms/websocketAtom";
import { useRecoilValue } from "recoil";
import { debounce } from 'lodash';

const PublicRooms: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { sendMessage, addMessageHandler, removeMessageHandler } = useWebSocket();
  const isConnected = useRecoilValue(wsConnectedState);

  useEffect(() => {
    const handleMessage = (message: any) => {
      switch (message.type) {
        case "room-list":
          setRooms(message.payload.rooms);
          break;
        case "error":
          console.error("WebSocket error:", message.payload.message);
          break;
      }
    };

    addMessageHandler(handleMessage);

    if (isConnected) {
      sendMessage({ type: "list-rooms", payload: {} });
    }

    return () => {
      removeMessageHandler(handleMessage);
    };
  }, [isConnected]);

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  const handleBack = () => {
    navigate("/onboarding");
  };

  return (
    <Background>
      <div
        className={`bg-[#1f2937]/90 backdrop-blur-sm rounded-3xl w-full max-w-8xl mx-24 p-8 relative z-10 
        shadow-[0_0_50px_rgba(79,209,197,0.2)] border-2 border-[#4fd1c5] mt-8`}
      >
        <div className="min-h-screen">
          <div className="px-16 mx-auto mb-8 flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 font-['Comic_Sans_MS']"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="w-full text-center mr-16">
              <h1 className="text-4xl font-bold text-white mb-4 font-['Comic_Sans_MS']">
                Public Rooms ✨
              </h1>
              <p className="text-[#4fd1c5] font-['Comic_Sans_MS']">
                Join an existing room and start chatting!
              </p>
            </div>
          </div>
          <div className="px-16  mx-auto mb-8">
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full px-6 py-4 bg-[#1f2937] rounded-2xl border-2 border-[#374151] 
                focus:border-[#4fd1c5] focus:outline-none text-white placeholder-gray-400 
                font-['Comic_Sans_MS'] transition-all duration-300"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="px-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.roomId} room={room} />
            ))}
          </div>
        </div>
      </div>
    </Background>
  );
};

export default PublicRooms;
