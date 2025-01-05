import { ReactNode, MouseEventHandler } from "react";
import { Gender } from "../types";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

export interface ModalProps {
  title: ReactNode;
  children: ReactNode;
}

export interface InputBoxProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary";
  className?: string;
}

export interface AvatarSelectionModalProps {
  onClose: () => void;
  onSelect: (avatar: { id: number; name: string; url: string }) => void;
}

export interface Avatar {
  url: string;
  name: string;
}

export interface GenderButtonProps {
  value: Gender;
  icon: typeof faMars | typeof faVenus;
  label: string;
  selectedGender: Gender;
  onSelect: (gender: Gender) => void;
}

export interface AvatarPreviewProps {
  avatar: Avatar;
  onChangeAvatar: () => void;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  currentUsers: number;
  maxCapacity: number;
  thumbnailUrl: string;
}

export interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
  type: "text" | "image" | "video";
  reactions?: { emoji: string; count: number; users: string[] }[];
}

export interface UserTyping {
  user: string;
  avatar: string;
}

export interface Bubble {
  id: string;
  size: number;
  left: number;
  duration: number;
}

export interface MessageInputProps {
  newMessage: string;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MessageProps {
  message: Message;
  onReactionClick: (messageId: number) => void;
  showReactions: number | null;
  onAddReaction: (messageId: number, emoji: string) => void;
}

export interface TypingIndicatorProps {
  typingUsers: UserTyping[];
}

export interface Map {
  id: string;
  name: string;
  thumbnailUrl: string;
  description: string;
}

export interface CreateRoomModalProps {
  onCreateRoom: (roomData: RoomData) => void;
  onBack: () => void;
}

export interface RoomData {
  name: string;
  description: string;
  selectedMap: Map | null;
  thumbnailUrl: string;
}

export interface User {
  username: string;
  age: string;
  gender: string;
  avatar: Avatar | null;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}
