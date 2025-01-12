import { FC } from "react";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { InputBox } from "@repo/ui/InpuBox";
import { Button } from "@repo/ui/Button";
import { EmojiAvatar } from "../../interfaces";
import { GenderButton } from "./GenderButton";
import { Gender } from "../../types";
import { AvatarPreview } from "../avatar/AvatarPreview";
import { RoomButtons } from "./RoomButtons";

interface ProfileFormProps {
  username: string;
  setUsername: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  gender: Gender;
  setGender: (value: Gender) => void;
  selectedAvatar: EmojiAvatar | null;
  onAvatarSelect: () => void;
  onCreateRoom: () => void;
  onShowPublicRooms: () => void;
}

export const ProfileForm: FC<ProfileFormProps> = ({
  username,
  setUsername,
  age,
  setAge,
  gender,
  setGender,
  selectedAvatar,
  onAvatarSelect,
  onCreateRoom,
  onShowPublicRooms,
}) => (
  <div className="space-y-4">
    <InputBox
      type="text"
      placeholder="Your Name"
      className="font-['Comic_Sans_MS']"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <InputBox
      type="number"
      placeholder="Age"
      className="font-['Comic_Sans_MS'] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />

    <div className="flex gap-4">
      <GenderButton
        value="Male"
        icon={faMars}
        label="Male"
        selectedGender={gender}
        onSelect={setGender}
      />
      <GenderButton
        value="Female"
        icon={faVenus}
        label="Female"
        selectedGender={gender}
        onSelect={setGender}
      />
    </div>

    <div className="flex items-center gap-4">
      {selectedAvatar ? (
        <AvatarPreview
          avatar={selectedAvatar}
          onChangeAvatar={onAvatarSelect}
        />
      ) : (
        <Button
          onClick={onAvatarSelect}
          variant="secondary"
          className="flex-1 font-['Comic_Sans_MS']"
        >
          Select Avatar ✨
        </Button>
      )}
    </div>

    <RoomButtons onCreateRoom={onCreateRoom} onShowPublicRooms={onShowPublicRooms} />
  </div>
);
