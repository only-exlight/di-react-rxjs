import { server as Ws, connection } from 'websocket';
import { createServer } from 'http';

const server = createServer();
server.listen(3000, () => console.warn('Start server on port 3000...'));

const wsServer = new Ws({
    httpServer: server
});

const connections: connection[] = [];

wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    connections.push(connection);

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.warn(message);
            connections.forEach((c, i) => {
                console.warn(i);
                if (c !== connection) {
                    c.sendUTF(message.utf8Data)
                }
            });
        }
    });

    connection.on('close', (connection) => {
        console.warn(connection);
    });
});
