import React, { useState } from 'react';
import { EMOJI_AVATARS } from '../constants/avatars';

interface PlayerAvatarProps {
  position: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  username: string;
  age: string;
  gender: string;
  avatarId: string;
  cellSize: number;
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  position,
  direction,
  username,
  age,
  gender,
  avatarId,
  cellSize
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const avatar = EMOJI_AVATARS.find(a => a.id === avatarId);

  if (!avatar) return null;

  return (
    <div
      className="absolute transition-all duration-150 ease-in-out transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: (position.x + 0.5) * cellSize,
        top: (position.y + 0.5) * cellSize,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    > 
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#2d3748] border-2 border-[#4fd1c5] rounded-lg p-3 shadow-lg z-50 min-w-[150px]">
          <div className="text-center">
            <h3 className="font-bold text-[#4fd1c5] mb-1">{username}</h3>
            <p className="text-sm text-gray-300">Age: {age}</p>
            <p className="text-sm text-gray-300">Gender: {gender}</p>
            <p className="text-xs text-[#4fd1c5] mt-1 italic">{avatar.emoji}</p>
          </div>
          <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#2d3748] border-r-2 border-b-2 border-[#4fd1c5] rotate-45"></div>
        </div>
      )}
    </div>
  );
};