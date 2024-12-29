import React from "react";
import { ArrowLeft } from "lucide-react";
import { Background } from "@repo/ui/Background";
import { useNavigate } from "react-router-dom";
import { RoomCard } from "../components/RoomCard";
import { Room } from "../interfaces";

const PublicRooms: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/onboarding");
  };

  const rooms: Room[] = [
    {
      id: "1",
      name: "Gamers Lounge",
      description:
        "A chill place to discuss your favorite games and make new friends!",
      currentUsers: 12,
      maxCapacity: 20,
      thumbnailUrl:
        "https://media.istockphoto.com/id/1917493450/photo/whats-everyone-thoughts.webp?a=1&b=1&s=612x612&w=0&k=20&c=TyGfEqGCUR7b3PnjjFwF3TQ1rMO9k133JoG6CKBltso=",
    },
    {
      id: "2",
      name: "Movie Buffs",
      description: "Share your thoughts about latest movies and series.",
      currentUsers: 8,
      maxCapacity: 15,
      thumbnailUrl:
        "https://images.unsplash.com/file-1715652217532-464736461acbimage?w=416&dpr=2&auto=format&fit=crop&q=60",
    },
    {
      id: "3",
      name: "Tech Talk",
      description: "Discuss the latest tech trends and gadgets.",
      currentUsers: 5,
      maxCapacity: 10,
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXJsfGVufDB8fDB8fHww",
    },
    {
      id: "4",
      name: "Book Club",
      description: "Join us to discuss your favorite books and authors.",
      currentUsers: 10,
      maxCapacity: 20,
      thumbnailUrl:
        "https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXJsfGVufDB8fDB8fHww",
    },
    {
      id: "5",
      name: "Music Lovers",
      description: "Share your favorite songs and artists with the community.",
      currentUsers: 15,
      maxCapacity: 25,
      thumbnailUrl:
        "https://media.istockphoto.com/id/2130908205/photo/when-daughter-asks-mom-cheerfully-helps-her-navigate-internet.webp?a=1&b=1&s=612x612&w=0&k=20&c=hYdcIq2lDehDhU5g4DKx04A7kDv3l_mrziFiknrxWKk=",
    },
    {
      id: "6",
      name: "Fitness Freaks",
      description: "Join us to discuss your fitness journey and goals.",
      currentUsers: 7,
      maxCapacity: 10,
      thumbnailUrl:
        "https://plus.unsplash.com/premium_photo-1690303193898-f9c721d0770b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJsfGVufDB8fDB8fHww",
    },
  ];

  return (
    <Background>
      <div
        className={`bg-[#1f2937]/90 backdrop-blur-sm rounded-3xl w-full max-w-8xl mx-24 p-8 relative z-10 
        shadow-[0_0_50px_rgba(79,209,197,0.2)] border-2 border-[#4fd1c5] mt-8`}
      >
        <div className="min-h-screen">
          {/* Header */}
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
          <div className="px-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </div>
    </Background>
  );
};

export default PublicRooms;
