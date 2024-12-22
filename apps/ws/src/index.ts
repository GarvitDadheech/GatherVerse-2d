import { WebSocketServer } from 'ws';
import { User } from './User';

const wss = new WebSocketServer({ port: 8080 });

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