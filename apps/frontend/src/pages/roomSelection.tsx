import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROOM_MAPS } from '../constants/roomMaps';

export default function RoomSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Choose Your Room
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(ROOM_MAPS).map((room) => (
            <div
              key={room.id}
              className="bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-slate-700 hover:border-blue-500"
              onClick={() => navigate(`/room/${room.id}`)}
            >
              <img
                src={room.thumbnail}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <p className="text-slate-400 text-sm">{room.description}</p>
                
                <div className="mt-4 flex items-center text-sm text-slate-500">
                  <span>{room.gridSize.width}x{room.gridSize.height} grid</span>
                  <span className="mx-2">•</span>
                  <span>{room.staticElements.length} elements</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}