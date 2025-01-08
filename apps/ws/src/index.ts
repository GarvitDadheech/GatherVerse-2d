import { WebSocketServer, WebSocket } from 'ws';
import { User } from './User';
import { WS_PORT } from '@repo/config';

const wss = new WebSocketServer({ port: WS_PORT });
console.log(`WebSocket server is running on port ${WS_PORT}`);

wss.on('connection', (ws: WebSocket) => {
    try {
        console.log('New client connected');
        const user = new User(ws);

        ws.on('error', (error) => {
            console.error('Client error:', error);
            user.destroy();
        });

        ws.on('close', () => {
            console.log('Client disconnected');
            user.destroy();
        });

    } catch (error) {
        console.error('Error handling new connection:', error);
        ws.close();
    }
});

wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});