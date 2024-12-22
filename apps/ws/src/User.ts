import { WebSocket } from "ws";
import { generateCustomId } from "./utils/customId";
import { OutgoingMessage } from "./types";
import { RoomManager } from "./RoomManager";
import { getSpawnPosition } from "./utils/spawnPosition";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/config";
export class User {
    public id: string;
    public userId?: string;
    private spaceId: string | undefined;
    private x: number = 0;
    private y: number = 0;

    constructor(private ws: WebSocket) {
        this.id = generateCustomId();
    }

    initHandlers() {
        this.ws.on("message", async (data) => {
            const parsedData = JSON.parse(data.toString());
            switch (parsedData.type) {
                case "join":
                    try {
                        const spaceId = parsedData.payload.spaceId;
                        const token = parsedData.payload.token;
                        if(!token) {
                            this.send({
                                type: "error",
                                payload: {
                                    message : "Token not provided"
                                }
                            })
                            return;
                        }
                        const userId = (jwt.verify(token, JWT_SECRET) as JwtPayload).userId;
                        if(!userId) {
                            this.send({
                                type: "error",
                                payload: {
                                    message : "Invalid token"
                                }
                            })
                            return;
                        }
                        this.userId = userId;
                        const spawnPosition = await getSpawnPosition(spaceId);
                        this.x = spawnPosition.x;
                        this.y = spawnPosition.y;
                        this.spaceId = spaceId;
                        RoomManager.getInstance().addUser(spaceId, this);
                        this.send({
                            type: "space-joined",
                            payload: {
                                users : RoomManager.getInstance().rooms.get(spaceId)?.map((u) => ({userId : u.id})) || [],
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
                        },this,this.spaceId!)
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
                                userId : this.id,
                                x : this.x,
                                y : this.y
                            }
                        },this,this.spaceId!);
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
        if(this.spaceId) {
            RoomManager.getInstance().broadcast({
                type: "user-left",
                payload: {
                    userId : this.userId
                }
            },this,this.spaceId);
            RoomManager.getInstance().removeUser(this.spaceId,this);
        }
    }

    send(payload : OutgoingMessage) {
        this.ws.send(JSON.stringify(payload));
    }
}