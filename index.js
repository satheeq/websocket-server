console.log('creating websocket server');

const { WebSocketServer } = require('ws');
const socketServer = new WebSocketServer({ port: 12345 });

let count = 0;
socketServer.on('connection', clientSocket => {
    count++;

    console.log('New client connected!');

    // clientSocket.send({id: count, message: 'connection established'});
    clientSocket.on('close', () => console.log('Client has disconnected!'));

    clientSocket.on('message', event => {
        let msgDec = JSON.parse(event);

        console.log(`received message: ${msgDec.message}`);

        if (msgDec.action === 'fetchData') {
            console.log('client requesting data');
        } else {
            console.log('distributing message');

            socketServer.clients.forEach(client => {
                client.send(`${msgDec}`);
            });   
        }
    });

    clientSocket.onerror = function () {
        console.log('websocket error');
    };
})
