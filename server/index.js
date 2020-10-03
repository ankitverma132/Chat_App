//Making our server
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');
const PORT = process.env.PORT || 5000;

//Using router to route through app
const router = require('./router');

const app = express();
const server = http.createServer(app);
//Now setup our socket.io
const io = socketio(server);
//Now integrating our socket.io

//io.on() is an built-in method which is going to run when
//we have an client connection with our io instance.
//For client joing and client leaving
io.on('connection', (socket) => {
    //This socket is going to be connected as client side socket
    //This socket is specific client connection instance
    //console.log(`We have a new connection...!!`);
    //Here we can receive emitted event
    socket.on('join', ({name,room}, callback) => {
        //We can pass an callback too
        //console.log(name, room);
        //We can trigger some response immediately after this socket.on 
        //event is being emitted by callback. Here you can do some error handling.
        // const error = true;
        // if(error){
        //     callback({error : 'error'});
        //     //We have access to this callback in emit function at client side
        //     //This callback is a good way to perform some action after event has emitted
        // }
        //addUser() function can return an error object or an user object.
        //id would be specific for each instance of socket.
        const {error, user} = addUser({ id:socket.id, name, room });
        //error message is dynamically coming from addUser
        if(error) return callback(error);

        //Admin generated message when a user joins room.
        //we will emit a new event.
        socket.emit('message', {user:'admin', 
                    text: `${user.name}, welcome to the room ${user.room}`});
        //Broadcaasting a message. The event data will only be broadcast 
        //to every sockets but the sender. Here we defined to() function 
        //so event data will be broadcast in that room only.
        socket.broadcast.to(user.room).emit('message', 
                            {user:'admin',text:`${user.name}, has joined!`});

        //join method joins a user in a room. you can define arbitrary
        //channels called “Rooms” that sockets can join and leave.
        socket.join(user.room);
        //Now user is finally inside the room
    })

    socket.on('disconnect', () => {
        console.log(`User has left`);
    })
})

app.use(router);

server.listen(PORT,() => console.log(`Server has started on port ${PORT}`));