import { Smile } from "lucide-react";
import { MessageProps } from "../../interfaces";
import { AVAILABLE_REACTIONS } from "../../constants/chat";

export const Message: React.FC<MessageProps> = ({
  message,
  onReactionClick,
  showReactions,
  onAddReaction,
}) => {
  return (
    <div className="group relative">
      <div className="flex items-start gap-3">
        <img
          src={message.avatar}
          alt={message.user}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-['Comic_Sans_MS']">
              {message.user}
            </span>
            <span className="text-xs text-gray-400">{message.timestamp}</span>
          </div>

          {message.type === "text" ? (
            <p className="text-gray-300 font-['Comic_Sans_MS']">
              {message.content}
            </p>
          ) : message.type === "image" ? (
            <img
              src={message.content}
              alt="Shared image"
              className="max-w-full rounded-lg mt-2"
            />
          ) : (
            <video
              src={message.content}
              controls
              className="max-w-full rounded-lg mt-2"
            />
          )}

          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {message.reactions.map((reaction, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-1 bg-[#374151] rounded-full px-2 py-1 text-sm hover:bg-[#4b5563]"
                  title={reaction.users.join(", ")}
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-gray-400">{reaction.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onReactionClick(message.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Smile size={16} className="text-gray-400 hover:text-[#4fd1c5]" />
        </button>
      </div>

      {showReactions === message.id && (
        <div className="absolute right-0 top-full mt-2 bg-[#374151] rounded-lg p-2 flex gap-1 z-10">
          {AVAILABLE_REACTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onAddReaction(message.id, emoji)}
              className="hover:bg-[#4b5563] p-1 rounded"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
