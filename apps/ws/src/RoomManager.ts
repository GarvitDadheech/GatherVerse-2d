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

    public addUser(spaceId: string, user: User) {
        if(!this.rooms.has(spaceId)) {
            this.rooms.set(spaceId, [user]);
            return;
        }
        this.rooms.get(spaceId)?.push(user);
    }

    public broadcast(message : OutgoingMessage, user : User,spaceId: string) {
        if(!this.rooms.has(spaceId)) {
            console.log(`No users in room ${spaceId}`);
            return;
        }
        this.rooms.get(spaceId)?.forEach(u => {
            if(u.id !== user.id) {
                u.send(message);
            }
        })
    }

    public removeUser(spaceId: string, user: User) {
        if(!this.rooms.has(spaceId)) {
            return;
        }
        this.rooms.set(spaceId, this.rooms.get(spaceId)?.filter(u => u.id !== user.id) || []);
    }
}