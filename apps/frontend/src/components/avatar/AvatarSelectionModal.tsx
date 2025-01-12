import React, { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";
import { EMOJI_AVATARS } from "../../constants/avatars";
import { EmojiAvatar } from "../../interfaces";

interface EmojiSelectionModalProps {
  onClose: () => void;
  onSelect: (avatar: EmojiAvatar) => void;
}

export const AvatarSelectionModal: React.FC<EmojiSelectionModalProps> = ({
  onClose,
  onSelect,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiAvatar | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="bg-[#1f2937]/90 backdrop-blur-md rounded-3xl w-full max-w-4xl p-8 relative z-10 
        shadow-[0_0_50px_rgba(79,209,197,0.3)] border-2 border-[#4fd1c5]/50 animate-fadeIn"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white font-['Comic_Sans_MS'] flex items-center gap-2">
            Choose Your Emoji <Sparkles className="text-yellow-200" size={24} />
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div
          className="grid grid-cols-6 sm:grid-cols-8 gap-4 mb-8 max-h-[400px] overflow-y-auto p-2
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-[#2a3441]
          [&::-webkit-scrollbar-thumb]:bg-[#4fd1c5]/50
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:border-2
          [&::-webkit-scrollbar-thumb]:border-[#2a3441]
          [&::-webkit-scrollbar-thumb]:hover:bg-[#4fd1c5]
          hover:[&::-webkit-scrollbar-thumb]:bg-[#4fd1c5]/70
          "
        >
          {EMOJI_AVATARS.map((emojiAvatar) => (
            <button
              key={emojiAvatar.id}
              onClick={() => setSelectedEmoji(emojiAvatar)}
              className={`relative group p-4 rounded-xl transition-all duration-300 hover:scale-110
                ${
                  selectedEmoji?.id === emojiAvatar.id
                    ? "bg-[#4fd1c5]/20 border-2 border-[#4fd1c5]"
                    : "bg-[#2a3441]/50 border-2 border-transparent hover:border-[#4fd1c5]/50"
                }`}
            >
              <div className="relative">
                <span
                  className="text-4xl block text-center"
                  role="img"
                  aria-label={emojiAvatar.id}
                >
                  {emojiAvatar.emoji}
                </span>
                {selectedEmoji?.id === emojiAvatar.id && (
                  <div className="absolute -top-2 -right-2 bg-[#4fd1c5] rounded-full p-1">
                    <Check size={12} className="text-[#1a2942]" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-2xl font-['Comic_Sans_MS'] font-bold 
              bg-[#2a3441] text-gray-400 hover:bg-[#374151] transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedEmoji && onSelect(selectedEmoji)}
            disabled={!selectedEmoji}
            className={`flex-1 py-3 px-6 rounded-2xl font-['Comic_Sans_MS'] font-bold 
              transition-all duration-300 ${
                selectedEmoji
                  ? "bg-[#4fd1c5] hover:bg-[#45b8ae] text-[#1a2942] transform hover:-translate-y-1"
                  : "bg-[#4fd1c5]/50 text-[#1a2942] cursor-not-allowed"
              }`}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};
