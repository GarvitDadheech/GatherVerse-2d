import { InputBoxProps } from "../interface/index.js";

export const InputBox: React.FC<InputBoxProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-6 py-4 bg-[#2a3441] rounded-2xl border-2 border-[#374151] 
          focus:border-[#4fd1c5] focus:outline-none text-white placeholder-gray-400 ${className}`}
    />
  );
};
