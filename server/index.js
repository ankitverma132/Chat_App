//Making our server
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;

//Using router to route through app
const router = require('./router');

const app = express();
const server = http.createServer(app);
//Now setup our socket.io
const io = socketio(server);
//Now integrating our socket.io

//io.on() is an built-in method which is going to run when
//we have an client connection with our io instance
//For client joing and client leaving
io.on('connection', (socket) => {
    //This socket is going to be connected as client side socket
    console.log(`We have a new connection...!!`);
    socket.on('disconnect', () => {
        console.log(`User has left`);
    })
})


app.use(router);

server.listen(PORT,() => console.log(`Server has started on port ${PORT}`));