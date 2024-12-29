import React from "react";
import { TypingIndicatorProps } from "../../interfaces";

export const TypingIndicator: React.FC<TypingIndicatorProps> = React.memo(
  ({ typingUsers }) => {
    if (!typingUsers || typingUsers.length === 0) return null;

    return (
      <div className="flex items-center gap-2 text-gray-400">
        <div className="flex -space-x-2">
          {typingUsers.map((user, idx) => (
            <img
              key={`${user.user}-${idx}`}
              src={user.avatar}
              alt={user.user}
              className="w-6 h-6 rounded-full border-2 border-[#1f2937]"
            />
          ))}
        </div>
        <p className="text-sm font-['Comic_Sans_MS']">
          {typingUsers.map((u) => u.user).join(", ")}{" "}
          {typingUsers.length === 1 ? "is" : "are"} typing...
        </p>
      </div>
    );
  }
);

TypingIndicator.displayName = "TypingIndicator";
