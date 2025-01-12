import { Button } from "@repo/ui/Button";
import { Users } from "lucide-react";
import { Room } from "../interfaces";

export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {

  return (
    <div className="bg-[#1f2937] rounded-2xl border-2 border-[#374151] hover:border-[#4fd1c5] transition-all duration-300 overflow-hidden group h-full">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={room.thumbnailUrl}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2 font-['Comic_Sans_MS'] line-clamp-1">
            {room.name}
          </h3>
        </div>

        <p className="text-gray-300 mb-6 font-['Comic_Sans_MS'] line-clamp-2">
          {room.description}
        </p>

        <Button
          className="w-full font-['Comic_Sans_MS'] group relative overflow-hidden"
          onClick={() => {
            /* Add your join room logic */
          }}
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
