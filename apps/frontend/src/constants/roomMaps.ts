// constants/roomMaps.ts
import { RoomMap } from '../types';

// Asset URLs (replace with your actual image URLs)
const ASSETS = {
  desk: '/api/placeholder/64/64',
  chair: '/api/placeholder/48/48',
  plant: '/api/placeholder/32/64',
  bed: '/api/placeholder/96/128',
  bookshelf: '/api/placeholder/128/64',
  computer: '/api/placeholder/48/48',
};

export const ROOM_MAPS: Record<string, RoomMap> = {
  'cozy-study': {
    id: 'cozy-study',
    name: 'Cozy Study Room',
    description: 'A warm study space with desks and bookshelves',
    gridSize: { width: 20, height: 15 },
    backgroundColor: '#1a1a2e',
    staticElements: [
      // Study area
      {
        id: 'desk-1',
        type: 'desk',
        position: { x: 3, y: 3 },
        imageUrl: ASSETS.desk,
        width: 2,
        height: 1,
        walkable: false,
      },
      {
        id: 'chair-1',
        type: 'chair',
        position: { x: 3, y: 4 },
        imageUrl: ASSETS.chair,
        width: 1,
        height: 1,
        walkable: false,
      },
      // Reading corner
      {
        id: 'bookshelf-1',
        type: 'bookshelf',
        position: { x: 0, y: 0 },
        imageUrl: ASSETS.bookshelf,
        width: 4,
        height: 1,
        walkable: false,
      },
      // Decoration
      {
        id: 'plant-1',
        type: 'plant',
        position: { x: 18, y: 1 },
        imageUrl: ASSETS.plant,
        width: 1,
        height: 2,
        walkable: false,
      },
    ],
    spawnPoint: { x: 10, y: 7 },
    thumbnail: '/api/placeholder/300/200',
  },
  
  'gaming-lounge': {
    id: 'gaming-lounge',
    name: 'Gaming Lounge',
    description: 'A fun space for gamers to hang out',
    gridSize: { width: 25, height: 20 },
    backgroundColor: '#16213e',
    staticElements: [
      // Gaming stations
      {
        id: 'gaming-desk-1',
        type: 'desk',
        position: { x: 2, y: 2 },
        imageUrl: ASSETS.desk,
        width: 2,
        height: 1,
        walkable: false,
      },
      {
        id: 'gaming-computer-1',
        type: 'computer',
        position: { x: 2, y: 1 },
        imageUrl: ASSETS.computer,
        width: 1,
        height: 1,
        walkable: false,
      },
      // Relaxation area
      {
        id: 'couch-1',
        type: 'bed',
        position: { x: 20, y: 15 },
        imageUrl: ASSETS.bed,
        width: 3,
        height: 2,
        walkable: false,
      },
      // Decorations
      {
        id: 'plant-1',
        type: 'plant',
        position: { x: 0, y: 0 },
        imageUrl: ASSETS.plant,
        width: 1,
        height: 2,
        walkable: false,
      },
    ],
    spawnPoint: { x: 12, y: 10 },
    thumbnail: '/api/placeholder/300/200',
  },
};

export const getRoomMap = (roomId: string): RoomMap | undefined => {
  return ROOM_MAPS[roomId];
};