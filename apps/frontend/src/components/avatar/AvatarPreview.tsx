import { FC } from "react";
import { EmojiAvatar } from "../../interfaces";

interface AvatarPreviewProps {
  avatar: EmojiAvatar;
  onChangeAvatar: () => void;
}

export const AvatarPreview: FC<AvatarPreviewProps> = ({
  avatar,
  onChangeAvatar,
}) => (
  <div className="flex items-center gap-3 p-3 bg-[#2a3441] rounded-2xl border-2 border-[#4fd1c5] flex-1">
    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#1f2937]/50 flex justify-center items-center text-4xl">
      {avatar.emoji}
    </div>
    <div>
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
