import { ReactNode } from "react";
interface WideModalProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}
export const WideModal = ({
  title,
  children,
  className = "",
}: WideModalProps) => {
  return (
    <div
      className={`bg-[#1f2937]/90 backdrop-blur-md rounded-3xl w-full max-w-6xl p-8 relative z-10 
        shadow-[0_0_50px_rgba(79,209,197,0.2)] border-2 border-[#4fd1c5] ${className} he`}
    >
      <div className="text-center mb-8">{title}</div>
      {children}
    </div>
  );
};
