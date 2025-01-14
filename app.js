const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require('path');


const server = http.createServer(app);
const io = socketio(server);


io.on("connection", (socket) => {
    socket.on("send-location", (data)=>{
        io.emit("receive-location",{id: socket.id, ...data});
    }) 
    socket.on("disconnect", () =>{
        io.emit('user-disconnect', {id: socket.id});
    })
})



app.get('/', (req, res) => {
    res.render('index');
})

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
console.log('Server is running on port 3000');
})
