import {ButtonProps} from "../interface/index.js";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "py-4 rounded-2xl font-bold transition-all duration-300 w-full";
  const variants = {
    primary:
      "bg-[#4fd1c5] hover:bg-[#45b8ae] text-[#1a2942] transform hover:-translate-y-1",
    secondary: "bg-[#2a3441] text-gray-400 hover:bg-[#374151]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
