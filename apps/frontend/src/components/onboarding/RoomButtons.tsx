import { Button } from "@repo/ui/Button";
import { FC } from "react";

interface RoomButtonsProps {
  onCreateRoom: () => void;
  onShowPublicRooms: () => void;
}

export const RoomButtons: FC<RoomButtonsProps> = ({
  onCreateRoom,
  onShowPublicRooms,
}) => (
  <div className="pt-4 space-y-4">
    <Button
      className="font-['Comic_Sans_MS'] group w-full"
      onClick={onCreateRoom}
    >
      <span className="relative z-10">Create Your Own Room</span>
    </Button>

    <Button
      variant="secondary"
      className="font-['Comic_Sans_MS'] w-full"
      onClick={onShowPublicRooms}
    >
      Join a Room
    </Button>
  </div>
);
