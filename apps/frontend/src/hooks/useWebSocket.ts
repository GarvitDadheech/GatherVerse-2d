import { useRecoilState, useSetRecoilState } from 'recoil';
import { wsConnectedState, wsInstanceState, wsMessageHandlerState } from '../store/atoms/websocketAtom';
import { WsMessage } from '../interfaces';
import { useCallback, useEffect, useRef } from 'react';

const WEBSOCKET_URL = `ws://localhost:3001`;

export const useWebSocket = () => {
    const [ws, setWs] = useRecoilState(wsInstanceState);
    const setConnected = useSetRecoilState(wsConnectedState);
    const [messageHandlers, setMessageHandlers] = useRecoilState(wsMessageHandlerState);
    const handlersRef = useRef(messageHandlers);

    // Update ref when handlers change
    useEffect(() => {
        handlersRef.current = messageHandlers;
    }, [messageHandlers]);

    const connect = useCallback(() => {
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
            try {
                const message = JSON.parse(event.data);
                console.log("Received message:", message);
                console.log("Current handlers:", handlersRef.current);
                
                // Use the ref instead of the state directly
                handlersRef.current.forEach(handler => {
                    try {
                        handler(message);
                    } catch (error) {
                        console.error("Error in message handler:", error);
                    }
                });
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        }

        newWs.onclose = () => {
            console.log('WebSocket disconnected');
            setConnected(false);
            setWs(null);
            setTimeout(connect, 5000);
        }

        setWs(newWs);
    }, [ws, setConnected, setWs]);

    const disconnect = useCallback(() => {
        if(ws?.readyState === WebSocket.CLOSED) {
            console.log('WebSocket already disconnected');
            return;
        }
        ws?.close();
        setWs(null);
        setConnected(false);
    }, [ws, setWs, setConnected]);

    const sendMessage = useCallback((message: WsMessage) => {
        if (ws?.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    }, [ws]);

    const addMessageHandler = useCallback((handler: (message: WsMessage) => void) => {
        console.log("Adding handler:", handler);
        setMessageHandlers(prev => {
            const newHandlers = [...prev, handler];
            console.log("Updated handlers:", newHandlers);
            return newHandlers;
        });
    }, [setMessageHandlers]);

    const removeMessageHandler = useCallback((handler: (message: WsMessage) => void) => {
        setMessageHandlers(prev => prev.filter(h => h !== handler));
    }, [setMessageHandlers]);

    return {
        connect,
        disconnect,
        sendMessage,
        addMessageHandler,
        removeMessageHandler,
    };
}