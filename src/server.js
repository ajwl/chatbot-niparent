var express = require('express')  
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path')
const port = 3000

app.use(express.static(__dirname))

server.listen(port,() => console.log(`App loading on localhost:${port}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/index.html'))
})

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
    socket.on('disconnect', () => {
      console.log("user disconnected")
    })
});



