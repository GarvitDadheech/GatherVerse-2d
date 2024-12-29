import { WebSocketServer } from 'ws';
import { User } from './User';
import { WS_PORT } from '@repo/config';

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', function connection(ws) {
    console.log('User connected');
    let user : User;
    user = new User(ws);
    ws.on('error', console.error);

    ws.on('close', () => {
        user.destroy();
    })

    ws.send('something');
});