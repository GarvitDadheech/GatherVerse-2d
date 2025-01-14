import { WebSocket } from "ws";
import { generateCustomId } from "./utils/customId";
import { OutgoingMessage } from "./types";
import { RoomManager } from "./RoomManager";
import { getSpawnPosition } from "./utils/spawnPosition";

export class User {
    public userId: string;
    private roomId?: string;
    private x: number = 0;
    private y: number = 0;
    private ws: WebSocket;
    private avatarId: string = "polar-bear";
    private username: string = "Anonymous";

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.userId = generateCustomId();
        this.initHandlers();
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    initHandlers() {
        this.ws.on("message", async (data) => {
            const parsedData = JSON.parse(data.toString());
            switch (parsedData.type) {
                case "create-room":
                    try {
                        const { name, description, mapId, thumbnailUrl } = parsedData.payload;
                        const roomId = RoomManager.getInstance().createRoom(name, description, mapId, thumbnailUrl);
                        this.send({
                            type: "room-created",
                            payload: { roomId }
                        });
                    } catch (e) {
                        this.send({
                            type: "error",
                            payload: { message: `Error creating room: ${e}` }
                        });
                    }
                    break;
                case "list-rooms":
                    try {
                        const rooms = RoomManager.getInstance().listRooms();
                        this.send({
                            type: "room-list",
                            payload: { rooms }
                        });
                    } catch (e) {
                        this.send({
                            type: "error",
                            payload: { message: `Error listing rooms: ${e}` }
                        });
                    }
                    break;

                case "join":
                    try {
                        const roomId = parsedData.payload.roomId;
                        const room = RoomManager.getInstance().getRoomDetails(roomId);
                        this.avatarId = parsedData.payload.avatarId;
                        this.username = parsedData.payload.username;
                        const spawnPosition = await getSpawnPosition();
                        this.x = spawnPosition.x;
                        this.y = spawnPosition.y;
                        this.roomId = roomId;
                        RoomManager.getInstance().addUser(roomId, this);
                        const otherUsers = room?.users.filter(user => user.userId !== this.userId);
                        this.send({
                            type: "room-joined",
                            payload: {
                                users: otherUsers,
                                spawn: {
                                    x: this.x,
                                    y: this.y
                                },
                                username : this.username,
                                avatarId : this.avatarId
                            }
                        })
                        RoomManager.getInstance().broadcast({
                            type: "user-joined",
                            payload: {
                                userId : this.userId,
                                x : this.x,
                                y : this.y,
                                avatarId : this.avatarId,
                                username: this.username
                            }
                        },this,this.roomId!);
                    }
                    catch(e) {
                        this.send({
                            type: "error",
                            payload: {
                                message : `Error joining space: ${e}`
                            }
                        })
                    }
                    finally{
                        break
                    }
                case "move":
                    const newX = parsedData.payload.x;
                    const newY = parsedData.payload.y;
                    this.x = newX;
                    this.y = newY;
                    RoomManager.getInstance().broadcast({
                        type: "move",
                        payload: {
                            userId : this.userId,
                            x : this.x,
                            y : this.y
                        }
                    },this,this.roomId!);
                    return;
                    break;
                default:
                    console.log(`Received unknown message: ${parsedData}`);
            }
        })
    }

    destroy() {
        if(this.roomId) {
            RoomManager.getInstance().broadcast({
                type: "user-left",
                payload: {
                    userId : this.userId
                }
            },this,this.roomId);
            RoomManager.getInstance().removeUser(this.roomId,this);
        }
    }

    send(payload : OutgoingMessage) {
        this.ws.send(JSON.stringify(payload));
    }
}