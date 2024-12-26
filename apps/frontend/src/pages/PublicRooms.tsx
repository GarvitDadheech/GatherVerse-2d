import React from "react";
import { Heart, Users, ArrowLeft } from "lucide-react";
import { Background } from "../components/Background";
import { Button } from "../components/Button";

interface Room {
  id: string;
  name: string;
  description: string;
  currentUsers: number;
  maxCapacity: number;
}

interface PublicRoomsProps {
  onBack: () => void;
}

const PublicRooms: React.FC<PublicRoomsProps> = ({ onBack }) => {
  // Mock data - replace with your actual data fetching logic
  const rooms: Room[] = [
    {
      id: "1",
      name: "Gamers Lounge",
      description: "A chill place to discuss your favorite games and make new friends!",
      currentUsers: 12,
      maxCapacity: 20,
    },
    {
      id: "2",
      name: "Movie Buffs",
      description: "Share your thoughts about latest movies and series.",
      currentUsers: 8,
      maxCapacity: 15,
    },
    // Add more rooms as needed
  ];

  const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
    const occupancyPercentage = (room.currentUsers / room.maxCapacity) * 100;
    
    return (
      <div className="bg-[#1f2937] rounded-2xl border-2 border-[#374151] hover:border-[#4fd1c5] transition-all duration-300 overflow-hidden group">
        <div className="p-6 flex flex-col h-full">
          {/* Room Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 font-['Comic_Sans_MS']">
                {room.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-400">
                <Users size={16} />
                <span className="font-['Comic_Sans_MS'] text-sm">
                  {room.currentUsers}/{room.maxCapacity} players
                </span>
              </div>
            </div>
            <Heart 
              className="text-gray-400 group-hover:text-[#4fd1c5] transition-colors"
              size={24} 
            />
          </div>

          {/* Room Description */}
          <p className="text-gray-300 mb-6 font-['Comic_Sans_MS'] flex-grow">
            {room.description}
          </p>

          {/* Occupancy Bar */}
          <div className="mb-4">
            <div className="h-2 bg-[#374151] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#4fd1c5] transition-all duration-300"
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
          </div>

          {/* Join Button */}
          <Button 
            className="w-full font-['Comic_Sans_MS'] group"
            onClick={() => {/* Add your join room logic */}}
          >
            <span className="relative z-10">Join Room</span>
            <Users
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              size={20}
            />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Background>
        <div className={`bg-[#1f2937]/90 backdrop-blur-sm rounded-3xl w-full max-w-8xl mx-24 p-8 relative z-10 
        shadow-[0_0_50px_rgba(79,209,197,0.2)] border-2 border-[#4fd1c5] mt-8`}
      >
      <div className="min-h-screen">
        {/* Header */}
        <div className="px-16 mx-auto mb-8 flex items-center">  
          <button
            onClick={onBack}
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

        {/* Search Bar */}
        <div className="px-16  mx-auto mb-8">
          <input
            type="text"
            placeholder="Search rooms..."
            className="w-full px-6 py-4 bg-[#1f2937] rounded-2xl border-2 border-[#374151] 
              focus:border-[#4fd1c5] focus:outline-none text-white placeholder-gray-400 
              font-['Comic_Sans_MS'] transition-all duration-300"
          />
        </div>

        {/* Room Grid */}
        <div className="px-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      </div>
    </Background>
  );
};

export default PublicRooms;