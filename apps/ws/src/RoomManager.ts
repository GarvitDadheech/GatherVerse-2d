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
        this.rooms.set(roomId, this.rooms.get(roomId)?.filter(u => u.userId !== user.userId) || []);
    }
}