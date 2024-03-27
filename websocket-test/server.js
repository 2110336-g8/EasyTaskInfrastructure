const express = require('express');
const {createServer} = require('http');
const WebSocket = require('ws');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = createServer(app);

const wss = new WebSocket.Server({noServer: true});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(`Server received from client: ${message}`);
    });
});

server.on('upgrade', function upgrade(request, socket, head) {
    if (request.url === '/ws') {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
