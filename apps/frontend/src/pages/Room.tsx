import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Message as MessageType, UserTyping } from "../interfaces";
import { MOCK_MESSAGES } from "../constants/chat";
import { createNewMessage, handleFileRead } from "../utils/messageHandlers";
import { GameContainer } from "../components/game/GameContainer";
import { ChatHeader } from "../components/chat/ChatHeader";
import { Message } from "../components/chat/Message";
import { TypingIndicator } from "../components/chat/TypingIndicator";
import { MessageInput } from "../components/chat/MessageInput";

const Room: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState<UserTyping[]>([]);
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const debouncedTypingRef = useRef<NodeJS.Timeout>();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newMessage) {
      const typingTimeout = setTimeout(() => {
        setTypingUsers([{ user: "Alice", avatar: "/api/placeholder/32/32" }]);
      });

      return () => {
        clearTimeout(typingTimeout);
        setTypingUsers([]);
      };
    }
  }, [newMessage]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (debouncedTypingRef.current) {
        clearTimeout(debouncedTypingRef.current);
      }
    };
  }, []);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewMessage(newValue);

    if (debouncedTypingRef.current) {
      clearTimeout(debouncedTypingRef.current);
    }

    if (!isTyping) {
      setIsTyping(true);
      setTypingUsers([{ user: "You", avatar: "/api/placeholder/32/32" }]);
    }

    debouncedTypingRef.current = setTimeout(() => {
      setIsTyping(false);
      setTypingUsers([]);
    }, 1200);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = createNewMessage(
        newMessage,
        "text",
        "You",
        "/api/placeholder/32/32",
        messages
      );
      setMessages([...messages, newMsg]);
      setNewMessage("");

      setIsTyping(false);
      setTypingUsers([]);
      if (debouncedTypingRef.current) {
        clearTimeout(debouncedTypingRef.current);
      }

      scrollToBottom();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileRead(
        file,
        (newMsg) => {
          setMessages([...messages, newMsg]);
          scrollToBottom();
        },
        messages
      );
    }
  };

  const handleReactionClick = (messageId: number) => {
    setShowReactions(showReactions === messageId ? null : messageId);
  };

  const handleAddReaction = (messageId: number, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find((r) => r.emoji === emoji);

          if (existingReaction) {
            return {
              ...msg,
              reactions: reactions.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, users: [...r.users, "You"] }
                  : r
              ),
            };
          }

          return {
            ...msg,
            reactions: [...reactions, { emoji, count: 1, users: ["You"] }],
          };
        }
        return msg;
      })
    );
    setShowReactions(null);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex h-screen bg-[#1f2937] overflow-hidden">
      <GameContainer isChatOpen={isChatOpen} />

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-[#4fd1c5] p-2 rounded-l-lg hover:bg-[#3ac7bc] transition-all duration-300"
        style={{ right: isChatOpen ? "30%" : "5%" }}
      >
        {isChatOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>

      <div
        className={`fixed right-0 top-0 h-full bg-[#1f2937] border-l-2 border-[#374151] transition-all duration-300 ${
          isChatOpen ? "w-[30%]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col h-full">
          <ChatHeader />

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                onReactionClick={handleReactionClick}
                showReactions={showReactions}
                onAddReaction={handleAddReaction}
              />
            ))}

            <TypingIndicator typingUsers={typingUsers} />
          </div>

          <MessageInput
            newMessage={newMessage}
            onMessageChange={handleTyping}
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default Room;
