export type Gender = "Male" | "Female" | "";

export interface Position {
    x: number;
    y: number;
  }
  
  export interface StaticElement {
    id: string;
    type: string;
    position: Position;
    rotation?: number;
    imageUrl: string;
    width: number;
    height: number;
    walkable: boolean;
    interactable?: boolean;
  }
  
  export interface RoomMap {
    id: string;
    name: string;
    description: string;
    gridSize: {
      width: number;
      height: number;
    };
    backgroundImage?: string;
    backgroundColor: string;
    staticElements: StaticElement[];
    spawnPoint: Position;
    thumbnail: string;
  }
  
  export interface Player {
    id: string;
    name: string;
    position: Position;
    avatarUrl: string;
  }