import { atom } from "recoil";
import { RoomData } from "../../interfaces";

export const selectedRoomState = atom<RoomData | null>({
    key: 'selectedRoomState',
    default: null,
});