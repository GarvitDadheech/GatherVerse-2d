import type { User } from "./User";
import {OutgoingMessage} from "./types/index";

export class RoomManager {
    rooms : Map<string, User[]> = new Map();
    static instance: RoomManager;
    private constructor() {
        this.rooms = new Map();
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new RoomManager();
        }
        return this.instance;
    }

    public addUser(roomId: string, user: User) {
        if(!this.rooms.has(roomId)) {
            this.rooms.set(roomId, [user]);
            return;
        }
        this.rooms.get(roomId)?.push(user);
    }

    public broadcast(message : OutgoingMessage, user : User,roomId: string) {
        if(!this.rooms.has(roomId)) {
            console.log(`No users in room ${roomId}`);
            return;
        }
        this.rooms.get(roomId)?.forEach(u => {
            if(u.userId !== user.userId) {
                u.send(message);
            }
        })
    }

    public removeUser(roomId: string, user: User) {
        if(!this.rooms.has(roomId)) {
            return;
        }
        const users = this.rooms.get(roomId)?.filter(u => u.userId !== user.userId) || [];
        if (users.length === 0) {
            // No users left, schedule room cleanup
            setTimeout(() => {
                if (this.rooms.get(roomId)?.length === 0) {
                    this.rooms.delete(roomId);
                }
            }, 30 * 60 * 1000); // 30 minutes
        } else {
            this.rooms.set(roomId, users);
        }
    }

    listRooms() {
        return Array.from(this.rooms.keys());
    }

    getRoomDetails(roomId: string) {
        if (!this.rooms.has(roomId)) return null;
        return this.rooms.get(roomId)?.map(user => ({
            userId: user.userId,
            x: user.getX(),
            y: user.getY()
        }));
    }
}