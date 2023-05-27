const express = require('express');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT,() =>{
    console.log(`Listening to port ${PORT}`);
})

app.use('/',express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

//Socket io


io.on('connection',(socket) => {
    console.log('connected to socket...');
    socket.on('message',(msgObj) =>{
        socket.broadcast.emit('message', msgObj);
    })
});

