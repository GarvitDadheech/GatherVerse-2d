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
}
