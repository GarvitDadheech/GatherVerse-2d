import { Button } from "@repo/ui/Button";
import { Heart, Users } from "lucide-react";
import { Room } from "../interfaces";
export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
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
