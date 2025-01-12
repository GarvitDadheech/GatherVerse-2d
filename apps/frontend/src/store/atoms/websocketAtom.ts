import { atom } from "recoil";
import { WsMessage } from "../../interfaces";

export const wsConnectedState = atom<boolean>({
    key: "wsConnectedState",
    default: false,
})

export const wsInstanceState = atom<WebSocket | null>({
    key: "wsInstanceState",
    default: null,
})

export const wsMessageHandlerState = atom<((message: WsMessage) => void)[]>({
    key: "wsMessageHandlerState",
    default: [],
})