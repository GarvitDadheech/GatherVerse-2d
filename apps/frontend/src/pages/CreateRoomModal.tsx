import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@repo/ui/Button";
import { InputBox } from "@repo/ui/InpuBox";
import { ImageUpload } from "../components/onboarding/ImageUpload";
import BubbleAnimation from "../animations/BubbleAnimation";
import { CreateRoomModalProps, Map } from "../interfaces";

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  onCreateRoom,
  onBack,
}) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);
  const [showMapSelection, setShowMapSelection] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const maps: Map[] = [
    {
      id: "1",
      name: "Forest Haven",
      thumbnailUrl: "/maps/forest.jpg",
      description: "A peaceful forest setting with ambient sounds",
    },
    {
      id: "2",
      name: "Cyber City",
      thumbnailUrl: "/maps/cyber.jpg",
      description: "Futuristic cityscape with neon lights",
    },
  ];

  const handleCreateRoom = () => {
    onCreateRoom({
      name: roomName,
      description,
      selectedMap,
      thumbnailUrl,
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
                ${
                  selectedMap?.id === map.id
                    ? "border-[#4fd1c5] bg-[#2a3441]"
                    : "border-[#374151] hover:border-[#4fd1c5]"
                }`}
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f2937] rounded-2xl max-w-5xl w-full mx-4 h-[90vh] flex overflow-hidden">
        {/* Left Panel - Form */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="relative mb-6">
            <button
              onClick={onBack}
              className="absolute -left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-white font-['Comic_Sans_MS'] pl-8">
              Create Your Room ✨
            </h1>
          </div>

          <div className="space-y-4">
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
                h-24 font-['Comic_Sans_MS'] resize-none"
            />

            {/* Map Selection */}
            <div>
              {selectedMap ? (
                <div className="p-4 bg-[#2a3441] rounded-xl border-2 border-[#4fd1c5]">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedMap.thumbnailUrl}
                      alt={selectedMap.name}
                      className="w-20 h-20 rounded-lg object-cover"
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

            {/* Room Thumbnail Upload */}
            <div className="space-y-2">
              <label className="text-gray-400 font-['Comic_Sans_MS'] text-sm">
                Room Thumbnail (Optional)
              </label>
              <ImageUpload
                value={thumbnailUrl}
                onImageSelect={setThumbnailUrl}
              />
            </div>

            <Button
              onClick={handleCreateRoom}
              className="w-full font-['Comic_Sans_MS']"
            >
              Create Room
            </Button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="hidden lg:block w-96 bg-[#1a2331] p-6 border-l border-[#374151] relative">
          <h2 className="text-xl font-['Comic_Sans_MS'] text-white mb-4">
            Preview
          </h2>

          {thumbnailUrl ? (
            <div className="relative group rounded-xl overflow-hidden">
              <img
                src={thumbnailUrl}
                alt="Room thumbnail"
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setThumbnailUrl("")}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full 
          opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          ) : (
            <div className="w-full h-48 bg-[#2a3441] rounded-xl flex items-center justify-center">
              <p className="text-gray-400 font-['Comic_Sans_MS']">
                No thumbnail selected
              </p>
            </div>
          )}

          <div className="mt-4 p-4 bg-[#2a3441] rounded-xl">
            <h3 className="font-['Comic_Sans_MS'] text-white mb-2">
              {roomName || "Room Name"}
            </h3>
            <p className="text-gray-400 font-['Comic_Sans_MS'] text-sm">
              {description || "Room description will appear here"}
            </p>
          </div>

          {/* Bubble Animation */}
          <div className="absolute inset-0 bottom-0 overflow-hidden">
            <BubbleAnimation />
          </div>
        </div>
      </div>

      {showMapSelection && <MapSelectionModal />}
    </div>
  );
};

export default CreateRoomModal;
