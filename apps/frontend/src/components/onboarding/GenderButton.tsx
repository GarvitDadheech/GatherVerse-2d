import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GenderButtonProps } from "../../interfaces";

export const GenderButton: React.FC<GenderButtonProps> = ({
  value,
  icon,
  label,
  selectedGender,
  onSelect,
}) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2
        ${
          selectedGender === value
            ? "border-[#4fd1c5] bg-[#2a3441] transform -translate-y-1"
            : "border-[#374151] bg-[#1f2937] hover:border-[#4fd1c5]"
        }`}
  >
    <FontAwesomeIcon
      icon={icon}
      className={`text-xl ${selectedGender === value ? "text-[#4fd1c5]" : "text-gray-400"}`}
    />
    <span
      className={`font-['Comic_Sans_MS'] ${selectedGender === value ? "text-[#4fd1c5]" : "text-gray-400"}`}
    >
      {label}
    </span>
  </button>
);
