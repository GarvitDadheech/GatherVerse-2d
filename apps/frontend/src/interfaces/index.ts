import { ReactNode, MouseEventHandler } from "react";

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
