import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@repo/ui/Button";
import { InputBox } from "@repo/ui/InpuBox";
import { Modal } from "@repo/ui/Modal";

interface Map {
  id: string;
  name: string;
  thumbnailUrl: string;
  description: string;
}

interface CreateRoomModalProps {
  onClose: () => void;
  onCreateRoom: (roomData: RoomData) => void;
}

interface RoomData {
  name: string;
  description: string;
  selectedMap: Map | null;
  thumbnailUrl: string;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ onClose, onCreateRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);
  const [showMapSelection, setShowMapSelection] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Mock maps data - replace with your actual maps
  const maps: Map[] = [
    {
      id: "1",
      name: "Forest Haven",
      thumbnailUrl: "/maps/forest.jpg",
      description: "A peaceful forest setting with ambient sounds"
    },
    {
      id: "2",
      name: "Cyber City",
      thumbnailUrl: "/maps/cyber.jpg",
      description: "Futuristic cityscape with neon lights"
    },
    // Add more maps
  ];

  const handleCreateRoom = () => {
    onCreateRoom({
      name: roomName,
      description,
      selectedMap,
      thumbnailUrl
    });
  };

  const MapSelectionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f2937] rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-['Comic_Sans_MS']">
            Choose a Map ✨
          </h2>
          <button
            onClick={() => setShowMapSelection(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {maps.map((map) => (
            <button
              key={map.id}
              onClick={() => {
                setSelectedMap(map);
                setShowMapSelection(false);
              }}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${selectedMap?.id === map.id 
                  ? 'border-[#4fd1c5] bg-[#2a3441]' 
                  : 'border-[#374151] hover:border-[#4fd1c5]'}`}
            >
              <img
                src={map.thumbnailUrl}
                alt={map.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-white font-['Comic_Sans_MS'] text-lg mb-1">
                {map.name}
              </h3>
              <p className="text-gray-400 font-['Comic_Sans_MS'] text-sm">
                {map.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title={
        <h1 className="text-3xl font-bold text-white mb-2 font-['Comic_Sans_MS']">
          Create Your Room ✨
        </h1>
      }
    >
      <div className="space-y-6">
        <InputBox
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="font-['Comic_Sans_MS']"
        />

        <textarea
          placeholder="Room Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-6 py-4 bg-[#2a3441] rounded-2xl border-2 border-[#374151] 
            focus:border-[#4fd1c5] focus:outline-none text-white placeholder-gray-400 
            min-h-[100px] font-['Comic_Sans_MS']"
        />

        {/* Map Selection */}
        <div className="space-y-4">
          {selectedMap ? (
            <div className="p-4 bg-[#2a3441] rounded-xl border-2 border-[#4fd1c5]">
              <div className="flex items-start gap-4">
                <img
                  src={selectedMap.thumbnailUrl}
                  alt={selectedMap.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-white font-['Comic_Sans_MS'] mb-1">
                    {selectedMap.name}
                  </h3>
                  <p className="text-gray-400 font-['Comic_Sans_MS'] text-sm mb-2">
                    {selectedMap.description}
                  </p>
                  <button
                    onClick={() => setShowMapSelection(true)}
                    className="text-[#4fd1c5] hover:text-[#45b8ae] font-['Comic_Sans_MS'] text-sm"
                  >
                    Change Map
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setShowMapSelection(true)}
              className="w-full font-['Comic_Sans_MS']"
            >
              Choose a Map
            </Button>
          )}
        </div>

        {/* Room Thumbnail */}
        <div className="space-y-2">
          <label className="text-gray-400 font-['Comic_Sans_MS'] text-sm">
            Room Thumbnail (Optional)
          </label>
          <div className="flex gap-4">
            <InputBox
              placeholder="Image URL"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="font-['Comic_Sans_MS'] flex-1"
            />
            <Button
              variant="secondary"
              onClick={() => {/* Add image upload logic */}}
              className="font-['Comic_Sans_MS'] px-4"
            >
              <Upload size={20} />
            </Button>
          </div>
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Room thumbnail"
              className="w-full h-40 object-cover rounded-xl mt-2"
            />
          )}
        </div>

        <Button
          onClick={handleCreateRoom}
          className="w-full font-['Comic_Sans_MS']"
        >
          Create Room
        </Button>
      </div>

      {showMapSelection && <MapSelectionModal />}
    </Modal>
  );
};

export default CreateRoomModal;