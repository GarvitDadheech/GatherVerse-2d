import { FC } from "react";
import { AvatarPreviewProps } from "../interfaces";

export const AvatarPreview: FC<AvatarPreviewProps> = ({
  avatar,
  onChangeAvatar,
}) => (
  <div className="flex items-center gap-3 p-3 bg-[#2a3441] rounded-2xl border-2 border-[#4fd1c5] flex-1">
    <img src={avatar.url} alt={avatar.name} className="w-12 h-12 rounded-xl" />
    <div>
      <p className="text-white font-['Comic_Sans_MS']">{avatar.name}</p>
      <button
        type="button"
        onClick={onChangeAvatar}
        className="text-sm text-[#4fd1c5] hover:text-[#45b8ae] font-['Comic_Sans_MS']"
      >
        Change Avatar
      </button>
    </div>
  </div>
);
