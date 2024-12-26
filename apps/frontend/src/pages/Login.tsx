import { useState } from "react";
import { Heart } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Modal } from "../components/Modal";
import { AvatarSelectionModal } from "../components/AvatarSelection";
import { useNavigate } from "react-router-dom";


interface Avatar {
  url: string;
  name: string;
}

type Gender = "male" | "female" | "";

interface GenderButtonProps {
  value: Gender;
  icon: typeof faMars | typeof faVenus;
  label: string;
  selectedGender: Gender;
  onSelect: (gender: Gender) => void;
}

const UserOnboarding = () => {
  // User Profile States
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const navigate = useNavigate();
  // Room Creation States
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const GenderButton: React.FC<GenderButtonProps> = ({ 
    value, 
    icon, 
    label, 
    selectedGender, 
    onSelect 
  }) => (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2
        ${selectedGender === value 
          ? 'border-[#4fd1c5] bg-[#2a3441] transform -translate-y-1' 
          : 'border-[#374151] bg-[#1f2937] hover:border-[#4fd1c5]'}`}
    >
      <FontAwesomeIcon 
        icon={icon}
        className={`text-xl ${selectedGender === value ? 'text-[#4fd1c5]' : 'text-gray-400'}`}
      />
      <span className={`font-['Comic_Sans_MS'] ${selectedGender === value ? 'text-[#4fd1c5]' : 'text-gray-400'}`}>
        {label}
      </span>
    </button>
  );

  const renderUserProfileForm = () => (
    <div className="space-y-4">
      <InputBox
        type="text"
        placeholder="Your Name"
        className="font-['Comic_Sans_MS']"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <InputBox
        type="number"
        placeholder="Age"
        className="font-['Comic_Sans_MS'] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      
      {/* Gender Selection Buttons */}
      <div className="flex gap-4">
        <GenderButton 
          value="male" 
          icon={faMars}
          label="Male" 
          selectedGender={gender}
          onSelect={setGender}
        />
        <GenderButton 
          value="female" 
          icon={faVenus}
          label="Female" 
          selectedGender={gender}
          onSelect={setGender}
        />
      </div>

      {/* Avatar Selection */}
      <div className="flex items-center gap-4">
        {selectedAvatar ? (
          <div className="flex items-center gap-3 p-3 bg-[#2a3441] rounded-2xl border-2 border-[#4fd1c5] flex-1">
            <img 
              src={selectedAvatar.url} 
              alt={selectedAvatar.name}
              className="w-12 h-12 rounded-xl"
            />
            <div>
              <p className="text-white font-['Comic_Sans_MS']">{selectedAvatar.name}</p>
              <button 
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="text-sm text-[#4fd1c5] hover:text-[#45b8ae] font-['Comic_Sans_MS']"
              >
                Change Avatar
              </button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setShowAvatarModal(true)}
            variant="secondary"
            className="flex-1 font-['Comic_Sans_MS']"
          >
            Select Avatar ✨
          </Button>
        )}
      </div>

      {/* Room Buttons */}
      <div className="pt-4 space-y-4">
        <Button
          className="font-['Comic_Sans_MS'] group w-full"
          onClick={() => setShowCreateRoom(true)}
        >
          <span className="relative z-10">Create Your Own Room</span>
          <Heart
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            size={20}
          />
        </Button>
        
        <Button
          variant="secondary"
          className="font-['Comic_Sans_MS'] w-full"
          onClick={() => {
            navigate("/public-rooms");
          }}
        >
          Join a Room
        </Button>
      </div>
    </div>
  );

  const renderCreateRoomForm = () => (
    <div className="space-y-4">
      <div 
        onClick={() => setShowCreateRoom(false)} 
        className="flex items-center text-gray-400 hover:text-white cursor-pointer mb-4 font-['Comic_Sans_MS']"
      >
        ← Back
      </div>
      
      <InputBox
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="font-['Comic_Sans_MS']"
      />
      
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-6 py-4 bg-[#2a3441] rounded-2xl border-2 border-[#374151] 
          focus:border-[#4fd1c5] focus:outline-none text-white placeholder-gray-400 min-h-[100px] font-['Comic_Sans_MS']"
      />
      
      <InputBox
        type="password"
        placeholder="Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="font-['Comic_Sans_MS']"
      />
      
      <Button 
        className="w-full font-['Comic_Sans_MS']"
        onClick={() => {/* Add your room creation logic */}}
      >
        CREATE ROOM
      </Button>
    </div>
  );

  return (
    <Background>
      <Modal
        title={
          <>
            <h1 className="text-3xl font-bold text-white mb-2 font-['Comic_Sans_MS']">
              {showCreateRoom ? "Create Your Room ✨" : "Welcome to the Game! 🎮"}
            </h1>
            <p className="text-[#4fd1c5] font-['Comic_Sans_MS']">
              {showCreateRoom ? "Design your perfect space!" : "Set up your profile to begin!"}
            </p>
          </>
        }
      >
        {showCreateRoom ? renderCreateRoomForm() : renderUserProfileForm()}
        
        {showAvatarModal && (
          <AvatarSelectionModal
            onClose={() => setShowAvatarModal(false)}
            onSelect={(avatar) => {
              setSelectedAvatar(avatar);
              setShowAvatarModal(false);
            }}
          />
        )}
      </Modal>
    </Background>
  );
};

export default UserOnboarding;
