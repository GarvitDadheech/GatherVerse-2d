import { User } from "./User";
import { generateCustomId } from "./utils/customId";

export interface RoomDetails {
    roomId: string;
    name: string;
    description: string;
    mapId: string;
    thumbnailUrl: string;
    users: User[];
}

export class RoomManager {
    private rooms: Map<string, RoomDetails> = new Map();
    static instance: RoomManager;

    private constructor() {}

    static getInstance(): RoomManager {
        if (!this.instance) {
            this.instance = new RoomManager();
        }
        return this.instance;
    }

    public createRoom(name: string = "Default Room", description: string = "", mapId: string = "default", thumbnailUrl: string = ""): RoomDetails {
        const roomId = generateCustomId();
        const room: RoomDetails = {
            roomId,
            name,
            description,
            mapId,
            thumbnailUrl,
            users: []
        };
        this.rooms.set(roomId, room);
        return room;
    }

    public addUser(roomId: string, user: User): void {
        const room = this.rooms.get(roomId);
        if (!room) {
            throw new Error(`Room with ID ${roomId} does not exist.`);
        }
        room.users.push(user);
    }

    public broadcast(message: any, sender: User, roomId: string): void {
        const room = this.rooms.get(roomId);
        if (!room) {
            console.log(`No room found with ID ${roomId}`);
            return;
        }
        room.users.forEach(user => {
            if (user.userId !== sender.userId) {
                user.send(message);
            }
        });
    }

    public removeUser(roomId: string, user: User): void {
        const room = this.rooms.get(roomId);
        if (!room) return;

        room.users = room.users.filter(u => u.userId !== user.userId);
        if (room.users.length === 0) {
            // Schedule room cleanup after 30 minutes
            setTimeout(() => {
                const targetRoom = this.rooms.get(roomId);
                if (targetRoom && targetRoom.users.length === 0) {
                    this.rooms.delete(roomId);
                }
            }, 30 * 60 * 1000); // 30 minutes
        }
    }

    public listRooms() {
        return Array.from(this.rooms.values()).map(({ roomId, name, description, mapId, thumbnailUrl}) => ({
            roomId,
            name,
            description,
            mapId,
            thumbnailUrl,
        }));
    }

    public getRoomDetails(roomId: string) {
        const room = this.rooms.get(roomId);
        if (!room) return null;
        return {
            roomId: room.roomId,
            name: room.name,
            description: room.description,
            mapId: room.mapId,
            thumbnailUrl: room.thumbnailUrl,
            users: room.users.map(user => ({
                userId: user.userId,
                x: user.getX(),
                y: user.getY()
            }))
        };
    }
}
