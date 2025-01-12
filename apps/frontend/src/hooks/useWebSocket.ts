import {WS_URL} from '@repo/config';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { wsConnectedState, wsInstanceState, wsMessageHandlerState } from '../store/atoms/websocketAtom';
import { WsMessage } from '../interfaces';

const WEBSOCKET_URL = `ws://${WS_URL}`;

export const useWebSocket = () => {
    const [ws,setWs] = useRecoilState(wsInstanceState);
    const setConnected = useSetRecoilState(wsConnectedState);
    const [messageHandlerState, setMessageHandlerState] = useRecoilState(wsMessageHandlerState);

    const connect = () => {
        if(ws?.readyState === WebSocket.OPEN) {
            console.log('WebSocket already connected');
            return;
        }

        const newWs = new WebSocket(WEBSOCKET_URL);

        newWs.onopen = () => {
            console.log('WebSocket connected');
            setConnected(true);
        }

        newWs.onmessage = (event) => {
            const message = JSON.parse(event.data);
            messageHandlerState.forEach((handler) => handler(message));
        }

        newWs.onclose = () => {
            console.log('WebSocket disconnected');
            setConnected(false);
            setWs(null);
            setTimeout(connect, 5000);
        }

        setWs(newWs);
    }

    const disconnect = () => {
        if(ws?.readyState === WebSocket.CLOSED) {
            console.log('WebSocket already disconnected');
            return;
        }
        ws?.close();
        setWs(null);
        setConnected(false);
    }

    const sendMessage = (message: WsMessage) => {
        if (ws?.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(message));
        } else {
          console.error('WebSocket is not connected');
        }
    };

    const addMessageHandler = (handler: (message: WsMessage) => void) => {
        setMessageHandlerState(prev => [...prev, handler]);
    };

    const removeMessageHandler = (handler: (message: WsMessage) => void) => {
        setMessageHandlerState(prev => prev.filter(h => h !== handler));
    };

    return {
        connect,
        disconnect,
        sendMessage,
        addMessageHandler,
        removeMessageHandler,
    };
}