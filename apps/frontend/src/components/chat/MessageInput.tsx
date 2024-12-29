import { Button } from "@repo/ui/Button";
import { Send, Image as ImageIcon, Video } from "lucide-react";
import React, { useRef } from "react";
import { MessageInputProps } from "../../interfaces";

export const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  onMessageChange,
  onSendMessage,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 border-t-2 border-[#374151] gap-2 flex flex-col">
      <div className="flex gap-3 mb-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          accept="image/*,video/*"
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="secondary"
          className="!w-auto !p-2"
        >
          <ImageIcon size={20} />
        </Button>
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="secondary"
          className="!w-auto !p-2"
        >
          <Video size={20} />
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={newMessage}
          onChange={onMessageChange}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 bg-[#374151] rounded-xl border-2 border-[#4b5563] focus:border-[#4fd1c5] focus:outline-none text-white placeholder-gray-400 font-['Comic_Sans_MS']"
        />
        <Button
          onClick={onSendMessage}
          variant="primary"
          className="!w-auto !p-3"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};
