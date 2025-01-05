import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "@repo/ui/Background";
import { Modal } from "@repo/ui/Modal";
import { ProfileForm } from "../components/onboarding/ProfileForm";
import { AvatarSelectionModal } from "../components/AvatarSelection";
import CreateRoomModal from "./CreateRoomModal";
import { Gender } from "../types";
import { Avatar } from "../interfaces";
import { useUserContext } from "../contexts/UserContext";

const UserOnboarding = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  return (
    <Background>
      {!showCreateRoom && (
        <Modal
          title={
            <>
              <h1 className="text-3xl font-bold text-white mb-2 font-['Comic_Sans_MS']">
                Welcome to the Game! 🎮
              </h1>
              <p className="text-[#4fd1c5] font-['Comic_Sans_MS']">
                Set up your profile to begin!
              </p>
            </>
          }
        >
          <ProfileForm
            username={username}
            setUsername={setUsername}
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            selectedAvatar={selectedAvatar}
            onAvatarSelect={() => setShowAvatarModal(true)}
            onCreateRoom={() => setShowCreateRoom(true)}
            onJoinRoom={() => {
              setUser({
                username,
                age,
                gender,
                avatar: selectedAvatar,
              });
              navigate("/public-rooms");
            }}
          />

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
      )}

      {showCreateRoom && (
        <CreateRoomModal
          onBack={() => setShowCreateRoom(false)}
          onCreateRoom={(roomDetails) => {
            setUser({
              username,
              age,
              gender,
              avatar: selectedAvatar,
            });
            console.log(roomDetails);
            setShowCreateRoom(false);
          }}
        />
      )}
    </Background>
  );
};

export default UserOnboarding;
