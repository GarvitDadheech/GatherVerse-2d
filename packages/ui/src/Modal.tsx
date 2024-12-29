import { ModalProps } from "../interface/index.js";

export const Modal = ({ title, children }: ModalProps) => {
  return (
    <div className="bg-[#1f2937] rounded-3xl max-w-lg p-8 relative z-10 shadow-[0_0_50px_rgba(79,209,197,0.2)] border-2 border-[#4fd1c5]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      </div>
      {children}
    </div>
  );
};
