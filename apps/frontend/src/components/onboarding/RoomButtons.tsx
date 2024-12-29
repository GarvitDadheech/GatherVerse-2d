import { Button } from "@repo/ui/Button";
import { Heart } from "lucide-react";
import { FC } from "react";

interface RoomButtonsProps {
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

export const RoomButtons: FC<RoomButtonsProps> = ({
  onCreateRoom,
  onJoinRoom,
}) => (
  <div className="pt-4 space-y-4">
    <Button
      className="font-['Comic_Sans_MS'] group w-full"
      onClick={onCreateRoom}
    >
      <span className="relative z-10">Create Your Own Room</span>
      <Heart
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        size={20}
      />
    </Button>

    <Button
      variant="secondary"
      className="font-['Comic_Sans_MS'] w-full"
      onClick={onJoinRoom}
    >
      Join a Room
    </Button>
  </div>
);
