const express = require('express');
const app = express();
const port = 8080; // Use one port for both servers

// Create an HTTP server and pass the Express app as middleware
const server = require('http').createServer(app);

// Initialize WebSocket server and attach it to the HTTP server
const WebSocketServer = require('ws').WebSocketServer
const wss = new WebSocketServer({server});

app.get('/', (req, res) => {
    res.send("I'm alive! No need to panic.");
});

// WebSocket connection handling
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('Received from client: %s', message);
        ws.send('Server received from client: ' + message);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
