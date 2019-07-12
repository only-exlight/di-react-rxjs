const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer((request, response) => {

});

server.listen(3000, () => {});

wsServer = new WebSocketServer({
    httpServer: server
});

const connections = [];

wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    console.warn(connection);
    connections.push(connection);

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            connection.sendUTF(JSON.stringify({
                body: 'Welcome',
                sender: 'Chat Bot',
                date: new Date()
            }));
        }
    });

    connection.on('close', (connection) => {
        console.warn(connection);
    });
});
