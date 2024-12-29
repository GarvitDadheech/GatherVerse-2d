import { Message } from "../interfaces";

export const formatTimestamp = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const createNewMessage = (
  content: string,
  type: "text" | "image" | "video",
  user: string,
  avatar: string,
  messages: Message[]
): Message => {
  return {
    id: messages.length + 1,
    user,
    content,
    timestamp: formatTimestamp(),
    avatar,
    type,
  };
};

export const handleFileRead = (
  file: File,
  callback: (message: Message) => void,
  messages: Message[]
) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const newMsg = createNewMessage(
      e.target?.result as string,
      file.type.startsWith("image/") ? "image" : "video",
      "You",
      "/api/placeholder/32/32",
      messages
    );
    callback(newMsg);
  };
  reader.readAsDataURL(file);
};
