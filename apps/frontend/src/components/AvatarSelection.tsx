import React, { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";
import { AvatarSelectionModalProps } from "../interfaces";

const AVATARS = [
  { id: 1, name: "Space Explorer", url: "/api/placeholder/80/80" },
  { id: 2, name: "Star Wanderer", url: "/api/placeholder/80/80" },
  { id: 3, name: "Cosmic Knight", url: "/api/placeholder/80/80" },
  { id: 4, name: "Galaxy Guard", url: "/api/placeholder/80/80" },
  { id: 5, name: "Nova Knight", url: "/api/placeholder/80/80" },
  { id: 6, name: "Astro Wizard", url: "/api/placeholder/80/80" },
  { id: 7, name: "Moon Walker", url: "/api/placeholder/80/80" },
  { id: 8, name: "Star Chaser", url: "/api/placeholder/80/80" },
  { id: 9, name: "Space Pirate", url: "/api/placeholder/80/80" },
];

export const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({
  onClose,
  onSelect,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<{
    id: number;
    name: string;
    url: string;
  } | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="bg-[#1f2937]/90 backdrop-blur-md rounded-3xl w-full max-w-2xl p-8 relative z-10 
        shadow-[0_0_50px_rgba(79,209,197,0.3)] border-2 border-[#4fd1c5]/50 animate-fadeIn"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white font-['Comic_Sans_MS'] flex items-center gap-2">
            Choose Your Avatar{" "}
            <Sparkles className="text-yellow-200" size={24} />
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar)}
              className={`relative group p-4 rounded-2xl transition-all duration-300 
                ${
                  selectedAvatar?.id === avatar.id
                    ? "bg-[#4fd1c5]/20 border-2 border-[#4fd1c5]"
                    : "bg-[#2a3441]/50 border-2 border-transparent hover:border-[#4fd1c5]/50"
                }`}
            >
              <div className="relative">
                <img
                  src={avatar.url}
                  alt={avatar.name}
                  className="w-20 h-20 rounded-2xl mx-auto mb-2 object-cover"
                />
                {selectedAvatar?.id === avatar.id && (
                  <div className="absolute top-2 right-2 bg-[#4fd1c5] rounded-full p-1">
                    <Check size={16} className="text-[#1a2942]" />
                  </div>
                )}
              </div>
              <p className="text-center text-white font-['Comic_Sans_MS'] text-sm truncate">
                {avatar.name}
              </p>
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
            onClick={() => selectedAvatar && onSelect(selectedAvatar)}
            disabled={!selectedAvatar}
            className={`flex-1 py-3 px-6 rounded-2xl font-['Comic_Sans_MS'] font-bold 
              transition-all duration-300 ${
                selectedAvatar
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
