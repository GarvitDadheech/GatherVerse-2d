import React, { useState } from 'react';
import { Background } from '../components/Background';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { InputBox } from '../components/InputBox';
import  {AvatarSelectionModal}  from '../components/AvatarSelection';
interface CreateRoomModalProps {
  onBack: () => void;
}
interface Avatar {
  url: string;
  name: string;
}
export const RoomSelection = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  if (showCreateRoom) {
    return <CreateRoomModal onBack={() => setShowCreateRoom(false)} />;
  }

  return (
    <Background>
      <Modal title="Welcome to the Room">
        <div className="space-y-4">
          {/* Avatar Selection Modal */}
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
          <Button onClick={() => setShowCreateRoom(true)}>
            Create Your Own Room
          </Button>
          <Button variant="secondary" onClick={() => { /* Add your onClick handler logic here */ }}>
            Join a Room
          </Button>
        </div>
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

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ onBack }) => {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');


  return (
    <Background>
      <Modal title="Create Custom Room">
        <div className="space-y-4">
          <div onClick={onBack} className="flex items-center text-gray-400 hover:text-white cursor-pointer mb-4">
            ← Back
          </div>
          
          <InputBox
            placeholder="Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-6 py-4 bg-[#2a3441] rounded-2xl border-2 border-[#374151] 
              focus:border-[#4fd1c5] focus:outline-none text-white placeholder-gray-400 min-h-[100px]"
          />
          
          <InputBox
            type="password"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button onClick={() => { /* Add your onClick handler logic here */ }}>
            CREATE
          </Button>
        </div>

      </Modal>
    </Background>
  );
};

export default RoomSelection;