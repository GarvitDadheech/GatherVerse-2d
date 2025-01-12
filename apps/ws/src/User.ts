import { WebSocket } from "ws";
import { generateCustomId } from "./utils/customId";
import { OutgoingMessage } from "./types";
import { RoomManager } from "./RoomManager";
import { getSpawnPosition } from "./utils/spawnPosition";

// User can send events like - join, move

export class User {
    public userId: string;
    private roomId?: string;
    private x: number = 0;
    private y: number = 0;
    private ws: WebSocket;

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

                case "get-room-details":
                    try {
                        const roomId = parsedData.payload.roomId;
                        const roomDetails = RoomManager.getInstance().getRoomDetails(roomId);
                        if (roomDetails) {
                            this.send({
                                type: "room-details",
                                payload: { roomId, users: roomDetails }
                            });
                        } else {
                            this.send({
                                type: "error",
                                payload: { message: `Room ${roomId} does not exist.` }
                            });
                        }
                    } catch (e) {
                        this.send({
                            type: "error",
                            payload: { message: `Error getting room details: ${e}` }
                        });
                    }
                    break;
                case "join":
                    try {
                        const roomId = parsedData.payload.roomId;

                        const spawnPosition = await getSpawnPosition();
                        this.x = spawnPosition.x;
                        this.y = spawnPosition.y;
                        this.roomId = roomId;
                        RoomManager.getInstance().addUser(roomId, this);
                        this.send({
                            type: "space-joined",
                            payload: {
                                users : RoomManager.getInstance().rooms.get(roomId)?.map((u) => ({userId : u.userId})) || [],
                                spawn : {
                                    x : this.x,
                                    y : this.y
                                }
                            }
                        })
                        RoomManager.getInstance().broadcast({
                            type: "user-joined",
                            payload: {
                                userId : this.userId,
                                x : this.x,
                                y : this.y
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
                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;

                    const xDisplacement = Math.abs(moveX-this.x);
                    const yDisplacement = Math.abs(moveY-this.y);

                    if((xDisplacement===1 && yDisplacement===0) || (xDisplacement===0 && yDisplacement===1)) {
                        this.x = moveX;
                        this.y = moveY;
                        RoomManager.getInstance().broadcast({
                            type: "move",
                            payload: {
                                userId : this.userId,
                                x : this.x,
                                y : this.y
                            }
                        },this,this.roomId!);
                        return;
                    }
                    this.send({
                        type: "movement-rejected",
                        payload: {
                            x : this.x,
                            y : this.y
                        }
                    })
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